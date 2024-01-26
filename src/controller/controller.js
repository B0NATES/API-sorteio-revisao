const knex = require ("../database/conexao")

function dizerOla(req, res) {
    return res.status(200).json({mensagem: 'Tudo ok'})
}


async function cadastraEstudo (req, res) {
   // const {} = req.body;
}

async function cadastraTema (req, res) {
    
}

async function cadastraCategoria (req, res){
    const {nome} = req.body;

    try {
        const cadastraCategoria = await knex('categorias').insert({nome});

        return res.status(201).json({mensagem: `Categoria ${nome} adicionada`})

        
    } catch (error) {
        console.log(error.message)
        res.status(500).json({mensagem: "Erro interno do servidor"})
    }

}



module.exports = {
    dizerOla,
    cadastraCategoria,

}