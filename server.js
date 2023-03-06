require('dotenv').config();
const express = require('express');
const { requiresAuth } = require('express-openid-connect'); // Use "requiresAuth" to protect page if no logged in
const { auth } = require('express-openid-connect');
const states = require('./app/common/states.js');
const utils = require('./app/common/dbApi.js');

// const authConfig = require("./app/config/auth.config.js");

const config = {
  authRequired: process.env.AUTHREQUIRED,
  auth0Logout: process.env.AUTH0LOGOUT,
  secret: process.env.SECRET,
  baseURL: process.env.BASEURL,
  clientID: process.env.CLIENT_ID,
  issuerBaseURL: process.env.ISSUER_BASE_URL
};

const authConfig = config;

const app = express();

// parse requests of content-type - application/json
app.use(express.json());

// parse requests of content-type - application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }));

// must be after "app.use(express.json())" and "app.use(express.urlencoded())"
require('./app/routes/sensors.routes.js')(app);
require('./app/routes/settings.routes')(app);

// Connect DB
const db = require("./app/models");
db.mongoose
  .connect(db.url, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
  .then(() => {
    console.log("Connected to the database!");
  })
  .catch(err => {
    console.log("Cannot connect to the database!", err);
    process.exit();
  });

  // TODO: should the connection be closed?
  // mongoose.connection.close(function () {
  //   console.log('Mongoose disconnected on app termination');
  //   process.exit(0);
  // });

app.use(auth(authConfig));


// const collection = db.settings('params');
// const changeStream = collection.watch();
// changeStream.on('change', next => {
//   // process next document
//   console.log("======= CHANGED ======", next)
// });
// let change_streams = db.settings('params').watch()
// change_streams.on('change', function(change){
//   console.log(JSON.stringify(change));
// });


// Load index or app.html depends on login status
app.get("/", (req, res) => {
  req.oidc.isAuthenticated()
  ? res.redirect('/app')
  : res.sendFile(__dirname + '/landing.html')
});

app.get('/app', requiresAuth(), (req, res) => {
  // 1. Create/update user
  states.setUser(req.oidc.user.email); // save user to use them globaly in other files

  // const listenParams = async (req, res) => {
  //   console.log("--LISTEN-!!!!!!-");
  //   const response = await http.get({ url: "https://data.mongodb-api.com/app/triggers_realmapp-ctneu/endpoint/sensors" })

  //   // The response body is a BSON.Binary object. Parse it and return.
  //   console.log("++++++++++++++++++++++++++++++", EJSON.parse(response.body.text()));
  // }


  // Create collections on first login
  utils.initSensors(db.sensors, req, res, () => console.log("Sensors Created - !"))
  utils.initSettings(db.settings, req, res, () => res.redirect('http://localhost:3000'))
  // listenParams()
});


// app.get("https://data.mongodb-api.com/app/triggers_realmapp-ctneu/endpoint/sensors", (req, res) => {
//   console.log("----SETT---", res)
// });

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});
