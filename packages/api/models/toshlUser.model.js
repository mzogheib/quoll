const mongoose = require('mongoose');

const schema = new mongoose.Schema({
  accessToken: {
    type: String,
    required: true,
  },
  tags: {
    type: Object,
  },
});

module.exports = mongoose.model('ToshlUser', schema, 'toshlUsers');
