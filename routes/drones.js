const express = require('express');
const router = express.Router();
const Drone = require ("../models/Drone.model")

// require the Drone model here

router.route('/drones')
.get( async (req, res, next) => {
  // Iteration #2: List the drones
  // ... your code here
  try {
    let findDrones = await Drone.find()
    res.render("drones/list", {findDrones})
  }
  catch (err) {
  console.log(err)
  }
});

router.get('/drones/create', (req, res, next) => {
  // Iteration #3: Add a new drone
  // ... your code here
  res.render("drones/create-form")
});

router.post('/drones/create', async (req, res, next) => {
  // Iteration #3: Add a new drone
  // ... your code here
  try {
  const {name, propellers, maxSpeed} = req.body
  let createDrones = await Drone.create({name, propellers, maxSpeed})
  let allDrones = await Drone.find();

  res.render("drones/list", allDrones)
  }
  catch {
    res.render("drones/create", allDrones)
  }
});

router.get('/drones/:id/edit', async (req, res, next) => {
  // Iteration #4: Update the drone
  // ... your code here
  try {
    const idDrone = req.params.id;    
    let drone = await Drone.findById(idDrone);
    res.render("drones/update-form", drone);
    }

    catch {
      res.render("drones/update-form", drone);
    }
  
});

router.post('/drones/:id/edit', async (req, res, next) => {
  // Iteration #4: Update the drone
  // ... your code here
  try {
    const {name, propellers, maxSpeed} = req.body;
    let updateDrone = await Drone.findByIdAndUpdate(req.params.id, {name, propellers, maxSpeed}, function (err, drone){
      if (err) {
        console.log(err)
      } else {
        console.log(drone)
      }
    })
    res.redirect("/drones")
  }

  catch (err) {
    let drone = await Drone.findById(idDrone);
    console.log(err)
    res.render("drones/update-form", drone)
  }
  });

  router.get('/drones/:id/delete', async (req, res, next) => {
    // Iteration #5: Delete the drone
    // ... your code here
    try {
      const idDrone = req.params.id;    
      let drone = await Drone.findById(idDrone);
      res.render("drones/list", drone);
      }
      catch {
        res.render("drones/list", drone);
      }
  });

router.post('/drones/:id/delete', async (req, res, next) => {
  // Iteration #5: Delete the drone
  // ... your code here
  try {
    let deleteDrone = await Drone.findByIdAndDelete(req.params.id, function (err, drone){
      if (err) {
        console.log(err)
      } else {
        console.log(drone)
      }
    })
    res.redirect("/drones")
  }
  catch (err) {
    let drone = await Drone.findById(idDrone);
    console.log(err)
    res.render("drones/list", drone)
  }
  });

module.exports = router;
