const mongoose = require('mongoose');
const bcrypt = require('bcrypt-nodejs');

const Schema = mongoose.Schema({
  user: {
    type: mongoose.Schema.ObjectId,
    ref: 'Usuario',
  },
  value: String,
  type: String,
});

module.exports = mongoose.model('Contacts', Schema);
