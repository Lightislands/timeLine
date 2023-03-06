exports.initSensors = async function(db, req, res, callback) {
  const collection = db;
  const query = { userName: req.oidc.user.email }; // Select by userName
  const update = {
    $setOnInsert: { // Update only if not exist
      tempOutside: 1000,
      tempInside: 22,
      humidity: 82,
      moisture: 67   
    }
  };
  const options = { upsert: true }; // Create if not exist

  try {
    await collection.updateOne(query, update, options)
    .then(
      callback()
     )
  } catch (error) {
    res.status(401).json({message: error.message});
  }
};

exports.initSettings = async function(db, req, res, callback) {
  const collection = db;
  const query = { userName: req.oidc.user.email }; // Select by userName
  const update = {
    $setOnInsert: {
      userData: {
        name: req.oidc.user.name,
        avatar: req.oidc.user.picture,
        locale: req.oidc.user.locale,
        email: req.oidc.user.email
      },
      params: {
        isWateringOn: false,
        watering: {
          ch1: [
            {
              duration: 0,
              start: '8:00'
            },
            {
              duration: 0,
              start: '20:00'
            }
          ],
          ch2: [
            {
              duration: 0,
              start: '8:00'
            }
          ]
        },
        humidity: 80,
        temp: 24,
        isFanOn: false,
        isWindowOpen: false
      } 
    }
  };
  const options = { upsert: true }; // Create if not exist

  try {
    await collection.updateOne(query, update, options)
    .then(
      callback()
     )
     .then(
      console.log("initSettings - !")
     )
  } catch (error) {
    res.status(401).json({message: error.message});
  }
};