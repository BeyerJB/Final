/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
  return knex.schema.createTable('items', table => {
    table.increments('id');
    table.integer('user_id').references('id').inTable('users').onDelete('cascade');
    table.string('item_name');
    table.string('description');
    table.integer('qty')
})
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
  return knex.schema.alterTable('items', table => {
    table.dropForeign('user_id');
  })
  .then(function() {
    return knex.schema.dropTableIfExists('items');

  });
};
