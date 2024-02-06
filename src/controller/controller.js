const knex = require("../database/conexao")
const funcoes = require("../utils/functions")

function dizerOla(req, res) {
    return res.status(200).json({ mensagem: 'Tudo ok' })
}


async function cadastraTema(req, res) {
    const { nome, descricao, categoria_id } = req.body;

    try {
        const numberCategoriaId = parseInt(categoria_id);
        console.log('NUMERO DA CATEGORIA', numberCategoriaId);

        const buscaCategoria = await knex('categorias').where('id', numberCategoriaId);
        const booleanBuscaCategoria = buscaCategoria.length > 0;

        console.log('CATEGORIA EXISTE', booleanBuscaCategoria);

        if (!booleanBuscaCategoria) {
            return res.status(404).json({ mensagem: `Categoria com ID ${categoria_id} não encontrada` });
        }

        const buscaTema = await knex('temas').where('nome', nome);
        const booleanBuscaTema = buscaTema.length > 0;

        console.log('TEMA EXISTE: ', booleanBuscaTema);

        if (booleanBuscaTema) {
            return res.status(400).json({ mensagem: `${nome} já existe` });
        }


        const inserirTema = await knex('temas').insert(
            {
                nome,
                descricao,
                categoria_id
            }).returning('*');


        console.log('INSERÇÃO DO TEMA', inserirTema)



        const objInserirTema = inserirTema[0]



        const inserirEstudo = await knex('estudos').insert(
            {
                tema_id: objInserirTema.id,
                data_estudo: new Date(),
                categoria_id: objInserirTema.categoria_id
            }
        ).returning('*');


        return res.status(201).json({ mensagem: `Tema ${nome} cadastrado com sucesso!` })


    } catch (error) {

        console.log(error.message)

        return res.status(500).json({ mensagem: 'Erro interno no servidor' })
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


        const inserir = await knex('categorias').insert({ nome }).returning('*');

        return res.status(201).json({ mensagem: `Categoria ${nome} adicionada` });
    } catch (error) {
        console.log(error.message);
        return res.status(500).json({ mensagem: 'Erro interno do servidor' });
    }
}




async function listarCategoria(req, res) {

    const lista = await knex('categorias');


    return res.status(200).json({ lista });
}

async function listarEstudo(req, res) {
    try {

        const lista = await knex('estudos');
        return res.status(200).json(lista);


    } catch (error) {
        return res.status(500).json({ mensagem: 'Erro interno no servidor' })
    }

}



async function sortearEstudo(req, res) {
    const { categoria_id } = req.body;

    try {
        let verificarEstudo;

        if (categoria_id) {
            const verificarCategoria = await knex('categorias').where('id', categoria_id);
            const catExiste = verificarCategoria.length > 0;

            if (!catExiste) {
                return res.status(404).json({ mensagem: "Categoria não existe" });
            }

            verificarEstudo = await knex('estudos').where('categoria_id', categoria_id);
        } else {
            verificarEstudo = await knex('estudos');
        }

        const estudoExiste = verificarEstudo.length > 0;

        if (!estudoExiste) {
            return res.status(404).json({ mensagem: "Ainda não existem estudos para essa categoria ou categoria inexistente" });
        }

        const sorteio = funcoes.gerarNumAleatorio(verificarEstudo.length);

        if (verificarEstudo.length <= 1) {
            const obterTema = await knex('temas').where('id', verificarEstudo[0].tema_id).first();
            return res.status(200).json(obterTema);
        }

        const temaSorteado = await knex('temas').where('id', verificarEstudo[sorteio - 1].tema_id);
        return res.status(200).json(temaSorteado);

    } catch (error) {
        console.log(error.message);
        return res.status(500).json({ mensagem: 'Erro interno no servidor' });
    }
}

async function listarTemas(req, res) {
    try {

        const obterTemas = await knex('temas').returning("*")

        return res.status(200).json(obterTemas)

    } catch (error) {

        console.log(error.message);
        return res.status(500).json({ mensagem: 'Erro interno no servidor' })
    }
}


async function atualizarTema(req, res) {
    const { idOuNome } = req.params;
    const { nome, descricao, categoria_id } = req.body;

    try {
        let tema;

        if (!isNaN(idOuNome)) {
            tema = await knex('temas')
                .where('id', idOuNome)
                .update({ nome, descricao, categoria_id })
                .returning(['id', 'nome', 'descricao', 'categoria_id']);
        } else {
            tema = await knex('temas')
                .where('nome', idOuNome)
                .update({ nome, descricao, categoria_id })
                .returning(['id', 'nome', 'descricao', 'categoria_id']);
        }

        return res.status(200).json(tema);
    } catch (error) {
        console.error('Erro ao atualizar o tema:', error);
        return res.status(500).json({ error: 'Erro interno do servidor' });
    }
}





module.exports = {
    dizerOla,
    cadastraCategoria,
    listarCategoria,
    cadastraTema,
    listarEstudo,
    sortearEstudo,
    listarTemas,
    atualizarTema,
}