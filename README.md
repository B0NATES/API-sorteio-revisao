# Sorteador de Tópicos de Estudo Aleatórios

Este aplicativo ajuda você a escolher aleatoriamente um tópico de estudo para revisar. Você pode adicionar categorias e tópicos para estudar e, em seguida, usar o aplicativo para selecionar aleatoriamente um tópico da sua lista. Veja como você pode usá-lo:

## Configuração

1. Clone o Repositório:
```bash
git clone git@github.com:B0NATES/API-sorteio-revisao.git

```

2. Instale as Dependências:

```bash
npm install
```

3. Defina Variáveis de Ambiente:
Crie um arquivo .env no diretório raiz e adicione suas credenciais de banco de dados:

```javascript
DB_USER=seu_usuario_do_banco
DB_PASSWORD=sua_senha_do_banco
DB_DATABASE=seu_banco_de_dados
DB_HOST=seu_host_do_banco
PORT=3000

```

4. Configuração do Banco de Dados:
Execute a migração do banco de dados para criar as tabelas necessárias:

```bash
npx knex migrate:latest

```

5. Inicie o Servidor:

```bash
npm run dev
```

6. Acesse o Aplicativo:
Abra seu navegador de solicitações http e acesse http://localhost:3000/.

## Endpoints

- ``GET /``: Retorna uma mensagem de boas-vindas.
- ``POST /categorias``: Cria uma nova categoria para tópicos de estudo.

  - **Corpo da Requisição:**
```json
{
  "nome": "Nome da Categoria"
}

```

- ``GET /categorias`` : Retorna uma lista de todas as categorias.

- ``POST /temas`` : Cria um novo tópico de estudo.

  - Corpo da Requisição:
```json
{
  "nome": "Nome do Tópico",
  "descricao": "Descrição do Tópico",
  "categoria_id": "ID da Categoria"
}

```

- ``GET /temas`` : Retorna uma lista de todos os tópicos de estudo.

- ``GET /sortear`` : Seleciona aleatoriamente um tópico de estudo da categoria especificada.

  - Corpo da Requisição:
```json
{
  "categoria_id": "ID da Categoria (Opcional)"
}

```

## Notas Adicionais
- Middleware para Validar Corpo da Requisição:

``src/middlewares/validaBody.js`` contém funções de middleware para validar corpos de requisição.
- Esquema do Banco de Dados:

``src/database/scheme.sql`` contém o esquema do banco de dados para as tabelas categorias, temas e estudos.
- Variáveis de Ambiente:

Modifique o arquivo ``.env`` para corresponder à sua configuração de banco de dados e à porta desejada.
- Dependências do Pacote:

Verifique o ``package.json`` para ver a lista de dependências usadas neste projeto.


Sinta-se à vontade para personalizar e expandir este aplicativo para atender às suas necessidades de estudo!








