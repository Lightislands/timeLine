const db = require("../models");
const Sensors = db.sensors;
const states = require('../common/states.js');

module.exports = app => {
  let router = require("express").Router();

  // Get data from sensors
  router.get('/params', async (req, res) => {
    const user = states.getUser();

console.log("--- Get data from sensors ----")

    try {
        const data = await Sensors.findOne({userName: user});
        return res.status(200).send(data);
    } catch(error) {
        res.status(404).json({ message: error.message});
    }
  });

  app.use("/api/sensors", router);
};