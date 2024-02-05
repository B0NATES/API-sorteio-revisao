const joi = require ('joi');


const schemaBodyCategoria = joi.object ({
    nome: joi.string().required().messages({
        "any.required" : "O campo nome é obrigatório.",
        "string.empty" : "O campo nome não pode ser vazio."
    })
})

const schemavalidaBodyTema = joi.object({
    nome: joi.string().required().messages({
        "any.required" : "O campo nome é obrigatório.",
        "string.empty" : "O campo nome não pode ser vazio."
    }),

    descricao: joi.string().required().messages({
        "any.required" : "O campo descricao é obrigatório.",
        "string.empty" : "O campo descricao não pode ser vazio."
    }),

    categoria_id: joi.number().integer().min(1).required().messages({
        "any.required" : "O campo categoria_id é obrigatório.",
        "number.base" : "O campo categoria_id deve ser um número inteiro.",
        "number.min": "O campo categoria_id deve ser no mínimo 1"
    })
})

function gerarNumAleatorio (numLimite) {
    
    let limite = parseInt(Math.random() * numLimite + 1);

    return limite

}



module.exports  =
{
    gerarNumAleatorio,
    schemaBodyCategoria,
    schemavalidaBodyTema,
}