require("dotenv").config();
const express = require ('express');
const joi = require("joi")
const app = express();
const route = require ("./src/router/route")



app.use(express.json());
app.use(route);


app.listen(process.env.PORT, () =>{
    console.log(`Servidor rodando na porta ${process.env.PORT}`)
})

