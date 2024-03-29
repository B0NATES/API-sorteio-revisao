require('dotenv').config();
const express = require('express');
const routes = express();


const md = require ("../middlewares/validaBody")
const controller = require("../controller/controller");




routes.get('/', controller.dizerOla);

routes.post('/categorias', 
md.validaCadastroCategoriaBody,
controller.cadastraCategoria);


routes.post('/temas', 
md.validarBodyTema,
controller.cadastraTema);


routes.put('/temas/:idOuNome', 
md.validaBodyPutTema,
controller.atualizarTema)





routes.get('/categorias', controller.listarCategoria);

routes.get('/estudos', controller.listarEstudo);

routes.get('/sortear', 
md.validaBodySorteio, 
controller.sortearEstudo);

routes.get('/temas', controller.listarTemas)


module.exports = routes;

