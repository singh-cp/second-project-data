import express from "express";
const app = express();
import morgan from "morgan";
import bodyParser from "body-parser";
import cors from "cors";
import router from "./routes/index.js";
import { PORT, DEBUG_MODE, MONGO_URL } from "./config/index.js";
import ErrorHandler from "./middlewares/ErrorHandler.js";
const port = PORT || 5000;

// MongoDB
import MongoDB from "./config/mongoDB/mongoDB.js";
MongoDB.connectToServer();

// MongoClient.connect(MONGO_URL, (err, client) => {
//   if (err) console.log(err);
//   db = client.db("demo");
//   console.log("MongoDB Connected");
// });

// Middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors());
app.use(morgan("common"));
app.use("/api", router);

// Error Handler
app.use((error, request, response, next) => {
  if (error instanceof ErrorHandler) {
    return response.status(error.status).json({
      error: {
        message: error.message,
        status: error.status,
      },
    });
  }
  return response.status(500).json({
    error: {
      message: DEBUG_MODE === "true" ? error.message : "Internal Server Error",
    },
  });
});

// next(new Error("Specified Error"))

app.listen(port, () => {
  console.log(`listing on port ${port}`);
});
