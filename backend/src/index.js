const express = require('express'); //importando o modulo express para dentro da variavel express
const routes = require('./routes'); //é um arquivo e não um pacote por isso é preciso colocar o ./
const cors = require('cors');

const app = express(); //instanciando a aplicação

app.use( conrs() ); //ferramenta de segurança para determinar quem pode acessar ou não

app.use(express.json());

app.use(routes);

app.listen(3333);