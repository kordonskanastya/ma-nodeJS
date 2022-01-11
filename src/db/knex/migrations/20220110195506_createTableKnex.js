exports.up = async (knex) => {
  await knex.raw('create extension if not exists "uuid-ossp"');
  await knex.schema.createTable('products', (table) => {
    table.uuid('id').defaultTo(knex.raw('uuid_generate_v4()')).primary();
    table.string('item').notNullable();
    table.string('type').notNullable();
    table.string('measure').notNullable();
    table.integer('measurevalue').notNullable();
    table.string('pricetype').notNullable();
    table.string('pricevalue').notNullable();
    table.timestamp('deleted_at');
    table.timestamps();
  });

};

exports.down = async (knex) => {
  await knex.schema.dropTable('products');
  await knex.raw('drop extension if exist "uuid-ossp"');
};
