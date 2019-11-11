const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt-nodejs');
const config = require('../../config');
const User = require('../users/model');

/*Usuario Routes*/
exports.login = async (req, res) => {
  const user = await User.findOne({ email: req.body.email , active: true });

  if (!user) {
    res.json({
      success: false,
      message: 'User not found',
      email: req.body.email
    });
  } else {
    bcrypt.compare(req.body.password, user.password, function(err, ok) {
      if (ok) {
        console.log('User login: ' + user.name + ' : ' + user.email);

        var beAToken = {};
        beAToken.email = user.email;
        beAToken._id = user._id;
        beAToken.name = user.name;

        console.log(beAToken);

        var token = jwt.sign(beAToken, config.secret, {
          expiresIn: '1d' // expires in 24 hours
        });

        // return the information including token as JSON
        res.json({
          success: true,
          message: 'Logged-in!',
          token: token
        });
      } else {
        res.json({ success: false, message: 'User not found' });
      }
    });
  }
};

exports.me = async (req, res) => {
  const token = req.body.token || req.query.token || req.headers['authorization']; // get token wherever it is

  if (token) {
    jwt.verify(token, config.secret, function (err, decoded) {
      if (err) {
        return res.json({ success: false, message: 'Invalid token.', login: true });
      } else {
        req.decoded = decoded;
        res.json(
          {
            success: true,
            data: req.decoded,
          }
        );
      }
    });

  } else {
    return res.status(403).send({
      success: false,
      message: 'Invalid token.',
    });
  }
};
