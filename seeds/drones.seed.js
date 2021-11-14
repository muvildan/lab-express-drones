// Iteration #1
const mongoose = require("mongoose");
const MONGO_URI = process.env.MONGODB_URI || "mongodb://localhost/lab-express-drones";
const Drone = require ("../models/Drone.model")

const addDrone = async () => {
    mongoose.connect(MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useFindAndModify: false,
      useCreateIndex: true
    })
    .then((db) => console.log("Connected to Mongo!"))
    .catch((err) => console.error("Error connecting to Mongo"));
    try {
        const newDrones = [
            { name: "Creeper XL 500", propellers: 3, maxSpeed: 12 },
            { name: "Racer 57", propellers: 4, maxSpeed: 20 },
            { name: "Courier 3000i", propellers: 6, maxSpeed: 18 }
          ];
          const createNewDrones = await Drone.create(newDrones);
          console.log(createNewDrones)
    }
    catch (err) {
        console.log(err);
    }

    mongoose.disconnect()
    console.log("Disconnecting from Mongo...")
}

addDrone();