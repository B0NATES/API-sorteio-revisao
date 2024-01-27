require('dotenv').config();
const express = require('express');
const routes = express();

const controller = require("../controller/controller")



routes.get('/', controller.dizerOla)

routes.post('/categorias', controller.cadastraCategoria);
routes.post('/tema', controller.cadastraTema)



routes.get('/categorias', controller.listarCategoria)


module.exports = routes

