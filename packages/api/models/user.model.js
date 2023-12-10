const mongoose = require("mongoose");

const schema = new mongoose.Schema({
  feeds: {
    type: Array,
    required: true,
  },
});

module.exports = mongoose.model("User", schema, "users");
