const express = require("express");
const app = express();
const morgan = require("morgan");
const mongo = require("mongodb");
const dotenv = require("dotenv");
dotenv.config();
let bodyParser = require("body-parser");
let cors = require("cors");
let MongoClient = mongo.MongoClient;
let mongoUrl = process.env.mongoLiveUrl;
let db;
let port = process.env.PORT || 3000;

// Middleware
app.use(morgan("common"));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cors());

// Home Page
app.get("/", (req, res) => {
  let key = req.header("x-auth-key");
  if (process.env.API_KEY == key) {
    res.send("Hello from Express");
  } else {
    res.send("Unauthorized Request");
  }
});

// Get all the locations
app.get("/location", (req, res) => {
  db.collection("location")
    .find({}, { _id: 0 })
    .toArray((err, result) => {
      if (err) throw err;
      res.send(result);
    });
});

// Get Location based on state
app.get("/location/:stateId", (req, res) => {
  let stateId = req.params.stateId;
  db.collection("location")
    .find({ state_id: Number(stateId) }, { _id: 0 })
    .toArray((err, result) => {
      if (err) throw err;
      res.send(result);
    });
});

// Get all the profiles based on city, state or both
app.get("/profiles", (req, res) => {
  let query = {};
  let stateId = Number(req.query.stateId);
  let cityId = Number(req.query.cityId);
  if (stateId && cityId) {
    query = { state_id: stateId, city_id: cityId };
  } else if (stateId) {
    query = { state_id: stateId };
  } else if (cityId) {
    query = { city_id: cityId };
  } else {
    query = {};
  }
  db.collection("profile")
    .find(query)
    .toArray((err, result) => {
      if (err) throw err;
      res.send(result);
    });
});

// Get specific profile
app.get("/profile/:id", (req, res) => {
  let id = req.params.id;
  db.collection("profile")
    .find({ profile_id: Number(id) }, { _id: 0 })
    .toArray((err, result) => {
      if (err) throw err;
      res.send(result);
    });
});

// Get profiles based on city
app.get("/profiles/:cityId", (req, res) => {
  let cityId = req.params.cityId;
  db.collection("profile")
    .find({ city_id: Number(cityId) }, { _id: 0 })
    .toArray((err, result) => {
      if (err) throw err;
      res.send(result);
    });
});

// Filters based on city

app.get("/filter/:cityId", (req, res) => {
  let cityId = Number(req.params.cityId);
  let sort = { review_star: -1 };
  let sortCost = Number(req.query.sortCost);
  let sortRating = Number(req.query.sortRating);
  let languageId = Number(req.query.languageId);
  let interestId = Number(req.query.interestId);
  let lcost = Number(req.query.lcost);
  let hcost = Number(req.query.hcost);
  let query = {};
  if (sortCost) {
    sort = { price: sortCost };
  } else if (sortRating) {
    sort = { review_star: sortRating };
  } else {
    let sort = { review_star: -1 };
  }
  if (cityId && languageId && interestId && lcost && hcost) {
    query = {
      city_id: cityId,
      "languages.language_id": languageId,
      "interest.interest_id": interestId,
      $and: [{ price: { $gt: lcost, $lt: hcost } }],
    };
  } else if (cityId && interestId && lcost && hcost) {
    query = {
      city_id: cityId,
      "interest.interest_id": interestId,
      $and: [{ price: { $gt: lcost, $lt: hcost } }],
    };
  } else if (cityId && languageId && lcost && hcost) {
    query = {
      city_id: cityId,
      "languages.language_id": languageId,
      $and: [{ price: { $gt: lcost, $lt: hcost } }],
    };
  } else if (cityId && languageId && interestId && lcost) {
    query = {
      city_id: cityId,
      "languages.language_id": languageId,
      "interest.interest_id": interestId,
      $and: [{ price: { $gt: lcost } }],
    };
  } else if (cityId && languageId && interestId && hcost) {
    query = {
      city_id: cityId,
      "languages.language_id": languageId,
      "interest.interest_id": interestId,
      $and: [{ price: { $lt: hcost } }],
    };
  } else if (cityId && lcost && hcost) {
    query = {
      city_id: cityId,
      $and: [{ price: { $gt: lcost, $lt: hcost } }],
    };
  } else if (cityId && languageId && interestId) {
    query = {
      city_id: cityId,
      "languages.language_id": languageId,
      "interest.interest_id": interestId,
    };
  } else if (cityId && hcost) {
    query = {
      city_id: cityId,
      $and: [{ price: { $lt: hcost } }],
    };
  } else if (cityId && lcost) {
    query = {
      city_id: cityId,
      $and: [{ price: { $gt: lcost } }],
    };
  } else if (cityId && languageId) {
    query = {
      city_id: cityId,
      "languages.language_id": languageId,
    };
  } else if (cityId && interestId) {
    query = {
      city_id: cityId,
      "interest.interest_id": interestId,
    };
  } else {
    query = { city_id: cityId };
  }
  db.collection("profile")
    .find(query)
    .sort(sort)
    .toArray((err, result) => {
      if (err) throw err;
      res.send(result);
    });
});
// $in query extracts multiple things in one go
// Create Bookings

app.post("/booklocal", (req, res) => {
  let key = req.header("x-auth-key");
  if (process.env.API_KEY == key) {
    db.collection("booking").insert(req.body, (err, result) => {
      if (err) throw err;
      res.send("Booking Confirmed");
    });
  } else {
    res.send("Unauthorized Request");
  }
});

// get all bookings
app.get("/bookings", (req, res) => {
  db.collection("booking")
    .find()
    .toArray((err, result) => {
      if (err) throw err;
      res.send(result);
    });
});

// Get bookings based on traveller profile id

app.get("/bookings/:id", (req, res) => {
  let id = Number(req.params.id);
  db.collection("booking")
    .find({ "traveller_info.traveler_id": id })
    .toArray((err, result) => {
      if (err) throw err;
      res.send(result);
    });
});

// Update order based on order id

app.put("/updateBooking/:id", (req, res) => {
  let key = req.header("x-auth-key");
  let id = Number(req.params.id);
  if (process.env.API_KEY == key) {
    db.collection("booking").updateOne(
      { booking_id: id },
      {
        $set: {
          bank_name: req.body.bank_name,
          payment_status: req.body.payment_status,
        },
      },
      (err, result) => {
        if (err) throw err;
        res.send("Booking Updated");
      }
    );
  } else {
    res.send("Unauthorized Request");
  }
});

// Delete order based on order id - UNCHECKED

app.delete("/deleteBooking/:id", (req, res) => {
  let key = req.header("x-auth-key");
  let id = Number(req.params.id);
  if (process.env.API_KEY == key) {
    db.collection("booking").remove({ booking_id: id }, (err, result) => {
      if (err) throw err;
      res.send("Booking Deleted");
    });
  } else {
    res.send("Unauthorized Request");
  }
});

// Server Config
MongoClient.connect(mongoUrl, (err, client) => {
  if (err) console.log(`Error while connecting: ${err}`);
  db = client.db("secondProject");
  app.listen(port, () => {
    console.log(`Go to >>>> http://localhost:${port}`);
  });
});
