const mongoose = require('mongoose');

module.exports = mongoose => {
  const schema = mongoose.Schema(
    {
      userName: {type: String},
      userData: {
        name: String,
        avatar: String,
        nlocaleame: String,
        email: String
      },
      params: {
        watering: {
          ch1: [
            {
              duration: Number,
              start: String
            },
            {
              duration: Number,
              start: String
            }
          ],
          ch2: [
            {
              duration: Number,
              start: String
            },
            {
              duration: Number,
              start: String
            }
          ]
        },
        humidity: {
          type: Number
        },
        temp: {
          type: Number,
          // required: true,
          // unique: true,
          // default: new Date(),
        },
        isFanOn: {
            type: Boolean
        },
        isWateringOn: {
            type: Boolean
        },
        isWindowOpen: {
            type: Boolean
        }
      }
    },
    { timestamps: true }
  );

  schema.method("toJSON", function() {
    const { __v, _id, ...object } = this.toObject();
    object.id = _id;
    return object;
  });

  const Settings = mongoose.model("settings", schema);
  return Settings;
};