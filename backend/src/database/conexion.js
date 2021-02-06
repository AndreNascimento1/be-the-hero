const knex = require('knex');
const configuration = require('../../knexfile');

const config = process.env.NODE_ENV == 'test' ? configuration.test : configuration.development; //variavel ambiente, com um if para verificar se esta usando o test ou o develpment

const connection = knex(config); //Para ambiente de produção

module.exports = connection;