CREATE TABLE categorias (
    id SERIAL PRIMARY KEY,
    nome VARCHAR(255) NOT NULL
);

CREATE TABLE temas (
    id SERIAL PRIMARY KEY,
    nome VARCHAR(255) NOT NULL,
    descricao TEXT,
    categoria_id INTEGER REFERENCES categorias(id)
);


CREATE TABLE estudos (
    id SERIAL PRIMARY KEY,
    tema_id INTEGER REFERENCES temas(id),
    data_estudo DATE,
    categoria_id INTEGER REFERENCES categorias(id)
);