/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.seed = async function(knex) {
  // Deletes ALL existing entries
  await knex.raw('TRUNCATE TABLE items RESTART IDENTITY CASCADE')
  await knex.raw('TRUNCATE TABLE users RESTART IDENTITY CASCADE')
  //await knex('users').del()
  await knex('users').insert([
    {first_name: 'john', last_name: 'bob', username: 'jbob', password: 'password'},
    {first_name: 'johnson', last_name: 'bobbert', username: 'jbobbert', password: 'password123'},
    {first_name: 'johnny', last_name: 'rob', username: 'jrob', password: 'passwords'},
  ]);
};
