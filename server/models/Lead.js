const mongoose = require("mongoose");

const leadSchema = new mongoose.Schema({
  name: String,
  email: String,
  source: String,
  status: {
    type: String,
    default: "new",
  },
  notes: String,
});

module.exports = mongoose.model("Lead", leadSchema);