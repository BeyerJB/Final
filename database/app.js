const express = require('express');
const app = express();
const port = 8081;

const knex = require('knex')(require('./knexfile.js')["development"])

app.use(express.json());

app.get('/', (request, response) => {
  response.send('SYSTEM ONLINE');
})

app.listen(port, () => {
  console.log("KNEX AND EXPRESS ARE WORKING");
})

app.get('/data/items', (request, response) => {
  knex('items')
    .select('*')
    .then((data) => response.status(200).json(data));

})

app.post("/data/items", (request, response) => {
  let itemData = request.body;
  //console.log("USING DATA FOR: ", itemData);
  const { user_id, item_name, description, qty} = request.body;
  knex("items")
    .insert({ user_id, item_name, description, qty})
    .then(response.status(201).json({ status: "Inserted" }));
});

app.put("/data/items", (request, response) => {
  let itemData = request.body;
  console.log("UPDATING WITH INFORMATION: ", itemData);
  knex("items")
    .where({ id: itemData.id })
    .update({
      item_name: itemData.item_name,
      description: itemData.description,
      qty: itemData.qty
    })
    .then(() => {
      response.status(201).json({ status: "Updated" });
    })
});

app.delete("/data/items", (request, response) => {
  let target = request.body.id;
  //console.log("DELETING ITEM BY ID: ", target);
  knex("items")
    .where({ id: target })
    .delete()
    .then(() => {
      response.status(201).json({ status: "Deleted" });
    })
})