/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.seed = async function (knex) {
  // Deletes ALL existing entries
  //await knex('table_name').del()
  await knex("items").insert([
    {
      user_id: 1,
      item_name: "wrench",
      description: "trusty ol wrench",
      qty: 7,
    },
    { user_id: 2, item_name: "saw", description: "trusty ol saw", qty: 5 },
    {
      user_id: 3,
      item_name: "hammer",
      description: "trusty ol hammer",
      qty: 8,
    },
    {
      user_id: 3,
      item_name: "crowbar",
      description: "trusty ol crowbar",
      qty: 2,
    },
  ]);
};
