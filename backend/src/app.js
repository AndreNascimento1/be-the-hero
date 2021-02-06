const express = require('express'); //importando o modulo express para dentro da variavel express
const routes = require('./routes'); //é um arquivo e não um pacote por isso é preciso colocar o ./
const cors = require('cors');

const { erros, errors } = require('celebrate');

const app = express(); //instanciando a aplicação

app.use( cors() ); //ferramenta de segurança para determinar quem pode acessar ou não

app.use(express.json());

app.use(routes);

app.use(errors()); //para deixar a mensagem de erro melhor, descrever o tipo de erro

module.exports = app;