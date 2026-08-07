const mongoose = require("mongoose");
const initData = require("./data.js");   // this is the array
const Listing = require("../models/listing.js");

const MONGO_URL = "mongodb://127.0.0.1:27017/wanderlust";

main()
  .then(() => {
    console.log("connected to DB");
  })
  .catch((err) => {
    console.log(err);
  });

async function main() {
  await mongoose.connect(MONGO_URL);
}

const initDB = async () => {
  await Listing.deleteMany({});
  const listingsWithOwner = initData.map((obj) => ({
    ...obj,
    owner: "6a6f0d7ce355d99c9b39f2a7"
  }));
  await Listing.insertMany(listingsWithOwner);
  console.log("data was initialized");
};

initDB();
