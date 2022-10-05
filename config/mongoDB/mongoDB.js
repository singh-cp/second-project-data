import mongo from "mongodb";
import { MongoClient } from "mongodb";
import { MONGO_URL } from "../index.js";

const MongoDB = {
  connectToServer: async () => {
    await MongoClient.connect(MONGO_URL, async function (error, client) {
      if (error) {
        console.log(error);
      }
      global.db = client.db("showMeAround");
      console.log("mongodb connection complete");
    });
  },
};

export default MongoDB;
