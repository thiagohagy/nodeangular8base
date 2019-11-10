const express = require('express');
const rotas = express.Router();
const controller = require('./controller');

rotas.post('/login', controller.login);
rotas.get('/me', controller.me);

module.exports = rotas;
