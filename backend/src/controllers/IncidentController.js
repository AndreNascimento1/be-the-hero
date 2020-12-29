const { insert } = require('../database/conexion');
const connection = require('../database/conexion');
const { create, index } = require('./OngController');

module.exports = {
    async index(request, response){
        //a pagina começa com o numero 1
        const { page = 1 } = request.query;
        //Dentro de colchetes para retornar o primeiro indice do array

        const [ count ] = await connection('incidents')
        .count();

        //Criando a paginação
        const incidents = await connection('incidents')
        .join('ongs', 'ongs.id', '=', 'incidents.ong_id')
        .limit(5)
        .offset( (page - 1 ) * 5 )
        .select([
            'incidents.*',
            'ongs.name',
            'ongs.email',
            'ongs.whatsapp',
            'ongs.city',
            'ongs.uf'
        ]);
        //Passando o parametro para o front-end
        response.header('X-Total-Count', count['count(*)']);

        return response.json(incidents);

    },
    async create(request, response){
        const { title, description, value } = request.body;

        const ong_id = request.headers.authorization; //aguarda informações sobre autenticação do usuario, localização, idiona, ...

        const [id] = await connection('incidents').insert({
            title,
            description,
            value,
            ong_id,
        });

        return response.json({ id });
    },
    async delete(request, response){
        const { id } = request.params;
        const ong_id = request.headers.authorization;

        const incident = await connection('incidents')
        .where('id', id)
        .select('ong_id')
        .first();

        if ( incident.ong_id != ong_id ){
            return response.status(401).json({ error: 'Operation not permitted.'}); //erro de autorização
        }

        await connection('incidents').where('id', id).delete();

        return response.status(204).send(); //sucesso mas sem conteudo
    }
};