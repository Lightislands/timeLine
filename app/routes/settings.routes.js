const db = require("../models");
const Settings = db.settings;
const states = require('../common/states.js');

module.exports = app => {
  // const settings = require("../controllers/settings.controller.js"); 

  var router = require("express").Router();

 

  // router.get('/listen-params', async (req, res) => {
  //   const response = await context.http.get({ url: "https://data.mongodb-api.com/app/triggers_realmapp-ctneu/endpoint/sensors" })
  //   console.log("--LISTEN-!!!!!!-");
  //   // The response body is a BSON.Binary object. Parse it and return.
  //   return EJSON.parse(response.body.text());
  // })


  // Get data from sensors
  router.get('/params', async (req, res) => {
    console.log("--AAAAAAAAA--", states.getUser());

    const user = states.getUser(); //"cyprusnetmail"//req.params.user;
    // if (!user) {
    //   res.redirect('http://localhost:8080')
    // }

    try {
        const data = await Settings.findOne({userName: user});
        return res.status(200).send(data);
    } catch(error) {
        res.status(404).json({ message: error.message});
    }
  });


  router.patch('/update', async (req, res) => {
    console.log("----req.body---", req.body);

    const user = states.getUser(); //"cyprusnetmail"//req.params.user;

    var query = {
      userName: user,
    };
    // var data = {
    //   $set: { // only the specified fields are updated  
    //     humidity: req.body.humidity,
    //     temp: req.body.temp,
    //     isFanOn: req.body.isFanOn,
    //     isWateringOn: req.body.isWateringOn,
    //     isWindowOpen: req.body.isWindowOpen,
    //     watering: req.body.watering
    //   }
    // };

    var data = {
      $set: {// only the specified fields are updated  
        'params.humidity': req.body.humidity,
        'params.temp': req.body.temp,
        'params.isFanOn': req.body.isFanOn,
        'params.isWateringOn': req.body.isWateringOn,
        'params.isWindowOpen': req.body.isWindowOpen,
        'params.watering': req.body.watering
      }
    }
    // const roll= req.params.roll;
    try{
        await Settings.updateOne(query, data)
        res.status(202).json({user: user});

    } catch (error) {
        res.status(401).json({message: error.message});
    }
  });

  // // Get all users data (unused)
  // router.get('/', async (req, res) => {
  //   try {
  //       const settings = await Settings.find();
        
  //       // res.status(200).json(settings);
  //       return res.status(200).send(settings);
  //   } catch(error) {
  //       res.status(404).json({message: error.message});
  //   }
  // });
    
  // router.post('/', async (req, res) => { // Unused
  //   console.log("----req---", req.body);
  //   const newSettings = new Settings({
  //     humidity: req.body.humidity,
  //     temp: req.body.temp,
  //     isFanOn: req.body.isFanOn,
  //     isWateringOn: req.body.isWateringOn,
  //     isWindowOpen: req.body.isWindowOpen,
  //     watering: req.body.watering
  //   })
  //   try {
  //       await newSettings.save();

  //       res.status(201).json(newSettings);

  //   } catch(error) {
  //       res.status(400).json({ message : error.message});
  //   }
  // });

  // router.delete('/:roll', async (req, res) => {
  //   const roll= req.params.roll;

  //   try {
  //       await Settings.findOneAndRemove({roll: roll});
  //       res.status(203).json({roll:roll});

  //   }catch(error) {
  //       res.status(402).json({message: error.message});
  //   }
  // });


  app.use("/api/settings", router);
};