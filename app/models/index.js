const dbConfig = require("../config/db.config.js");

const mongoose = require("mongoose");
mongoose.Promise = global.Promise;

const db = {};
db.mongoose = mongoose;
db.url = dbConfig.url;
db.sensors = require("./sensors.model.js")(mongoose);
db.settings = require("./settings.model.js")(mongoose);

module.exports = db;
