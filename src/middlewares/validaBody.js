const { func } = require("joi");
const functions = require ("../utils/functions");



async function validaCadastroCategoriaBody(req, res, next){

    try {

        
        await functions.schemaBodyCategoria.validateAsync(req.body)
        
        next()
    }  catch (error) {
        console.log(error.message)

        return res.status(400).json({error: error.message})
    }
}


async function validarBodyTema (req, res, next) {

    try {
        
        await functions.schemavalidaBodyTema.validateAsync(req.body)

        next()

    } catch (error) {

        console.log(error.message)

        return res.status(400).json({error: error.message})
        
    }
}

async function validaBodySorteio (req, res, next){

    try {
        
        await functions.schemaBodySorteio.validateAsync(req.body)

        next()

    } catch (error) {

        console.log(error.message)

        return res.status(400).json({error: error.message})
    }
}



module.exports = {
    validaCadastroCategoriaBody,
    validarBodyTema,
    validaBodySorteio,
}