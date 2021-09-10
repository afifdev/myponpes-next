const mongoose = require("mongoose");

const Admin = new mongoose.Schema({
  name: String,
  username: String,
  password: String,
  level: Number,
});

module.exports = mongoose.models.Admin || mongoose.model("Admin", Admin);
