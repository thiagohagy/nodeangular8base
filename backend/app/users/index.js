const express = require('express');
const rotas = express.Router();

const controller = require('./controller');

rotas.get('/list', controller.index);
rotas.get('/filter', controller.filter);
rotas.get('/:user_id', controller.get);
rotas.patch('/:user_id', controller.edit);
rotas.delete('/:user_id', controller.delete);
rotas.post('/', controller.new);

module.exports = rotas;
