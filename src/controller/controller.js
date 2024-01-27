const knex = require ("../database/conexao")

function dizerOla(req, res) {
    return res.status(200).json({mensagem: 'Tudo ok'})
}


async function cadastraTema (req, res) {
    const {nome, descricao, categoria_id} = req.body;

    try {
        
        const buscaCategoria = await knex('categorias').where('id', categoria_id).first();

        console.log(buscaCategoria)

        if (!buscaCategoria) {

            console.log('caiu no if', buscaCategoria)


            return res.status(404).json({ mensagem: "Categoria não encontrada" });
        }

    } catch (error) {

        console.log(error.message)

        return res.status(500).json({mensagem: 'Erro interno no servidor'})
    }
}

async function cadastraCategoria (req, res){
    const {nome} = req.body;

    try {

        const verificarCategoria = await knex('categorias').select('nome').where({nome})

        console.log(verificarCategoria)

        if(verificarCategoria){
            return res.status(400).json({mensagem: 'A categoria já existe'})
        }

        const cadastraCategoria = await knex('categorias').insert({nome});

        return res.status(201).json({mensagem: `Categoria ${nome} adicionada`})

        
    } catch (error) {
        console.log(error.message)
        return res.status(500).json({mensagem: "Erro interno do servidor"})
    }

}

async function listarCategoria (req, res) {
    
    const lista = await knex('categorias').returning('*')
    
    
    res.status(200).json({lista})
}



module.exports = {
    dizerOla,
    cadastraCategoria,
    listarCategoria,
    cadastraTema,

}