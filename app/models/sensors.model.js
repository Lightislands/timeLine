const mongoose = require('mongoose');

module.exports = mongoose => {
  const schema = mongoose.Schema(
    {
      userName: String,
      tempOutside: Number,
      tempInside: Number,
      humidity: Number,
      moisture: Number
    },
    { timestamps: true }
  );

  schema.method("toJSON", function() {
    const { __v, _id, ...object } = this.toObject();
    object.id = _id;
    return object;
  });

  const Sensors = mongoose.model("sensors", schema);
  return Sensors;
};