const mongoose = require('mongoose');
const bcrypt = require('bcrypt-nodejs');

const Schema = mongoose.Schema({
  email: {
    type: String,
    index: { unique: true, dropDups: true }
  },
  creationDate: {
    type:Date,
    default: Date.now,
  },
  password: String,
  name: String,
  active: { type: Boolean, default: true },
});

Schema.pre('save', function(next) {
  const user = this;

  if (!user.isModified('password')) return next();

  bcrypt.genSalt(10, function(err, salt) {
    if (err) return next(err);

    bcrypt.hash(user.password, salt, null, function(err, hash) {
      if (err) return next(err);
      user.password = hash;
      next();
    });
  });
});

module.exports = mongoose.model('User', Schema);
