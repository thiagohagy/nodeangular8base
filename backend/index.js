const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const server = require('http').Server(app);
const path = require('path');
const cors = require('cors');
const config = require('./config');
const mongoose = require('mongoose');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json({ limit: '2mb' }));
app.use(cors());

mongoose.Promise = global.Promise;
mongoose.connect(
  config.database,
  {
    keepAlive: true,
    reconnectTries: Number.MAX_VALUE,
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true
  }
);

app.get('/api/', function(req, res, next) {
  res.json('online');
});

/*users login*/
app.use('/api/', require('./auth/index'));

/*JWT validation*/
const jwt = require('./jwt');
app.use('/api/v1', jwt);

jwt.use('/users', require('./users/index'));


server.listen(config.port, '127.0.0.1');
console.log('Server start: ' + config.port);
