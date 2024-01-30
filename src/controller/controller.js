const knex = require ("../database/conexao")

function dizerOla(req, res) {
    return res.status(200).json({mensagem: 'Tudo ok'})
}


async function cadastraTema(req, res) {
    const { nome, descricao, categoria_id } = req.body;

    try {
        const numberCategoriaId = parseInt(categoria_id);
        console.log('NUMERO DA CATEGORIA',numberCategoriaId);
    
        const buscaCategoria = await knex('categorias').where('id', numberCategoriaId);
        const booleanBuscaCategoria = buscaCategoria.length > 0;
    
        console.log('CATEGORIA EXISTE', booleanBuscaCategoria);
    
        if (!booleanBuscaCategoria) {
            return res.status(404).json({ mensagem: `Categoria com ID ${categoria_id} não encontrada` });
        }
    
        const buscaTema = await knex('temas').where('nome', nome);
        const booleanBuscaTema = buscaTema.length > 0;
    
        console.log('RESULTADO DA BUSCA DO TEMA: ', booleanBuscaTema);
    
        if (booleanBuscaTema) {
            return res.status(400).json({ mensagem: `${nome} já existe` });
        }

        /*
        const inserirTema = await knex('temas').insert(
            {
                nome,
                descricao,
                categoria_id
            });

    

        

        const inserirEstudo = await knex ('estudos').insert(
            {

            }
        )

        */

    } catch (error) {

        console.log(error.message)

        return res.status(500).json({mensagem: 'Erro interno no servidor'})
    }
}



async function cadastraCategoria(req, res) {
    const { nome } = req.body;
    
    try {
        
        const verificarCategoria = await knex('categorias').select('nome').where({ nome });

        console.log('Resultado banco de dados:', verificarCategoria);
        
        
        if (verificarCategoria.length > 0) {
            return res.status(400).json({ mensagem: `A categoria ${nome} já existe` });
        }

        
        const inserir = await knex('categorias').insert({ nome });

        return res.status(201).json({ mensagem: `Categoria ${nome} adicionada` });
    } catch (error) {
        console.log(error.message);
        return res.status(500).json({ mensagem: 'Erro interno do servidor' });
    }
}




async function listarCategoria (req, res) {
    
    const lista = await knex('categorias')
    
    
    res.status(200).json({lista})
}



module.exports = {
    dizerOla,
    cadastraCategoria,
    listarCategoria,
    cadastraTema,

}