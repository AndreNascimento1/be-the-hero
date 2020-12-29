
exports.up = function(knex) {
    return knex.schema.createTable('incidents', function(table){
        table.increments();

        table.string('title').notNullable();
        table.string('description').notNullable();
        table.decimal('value').notNullable();

        table.string('ong_id').notNullable(); //para armazenar a chave estrangeira

        table.foreign('ong_id').references('id').inTable('ongs'); //referenciando e pegando o valor da chave estrangeira

    });
  
};

exports.down = function(knex) {
    return knex.schema.dropTable('incidents');
  
};
