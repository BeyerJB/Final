const express = require("express");
const app = express();
const port = 8081;
const cors = require("cors");
const knex = require("knex")(require("./knexfile.js")["development"]);

app.use(cors());
app.use(express.json());

app.listen(port, () => {
  console.log("KNEX AND EXPRESS LISTENING ON PORT 8081");
});

app.get("/", (request, response) => {
  response.send("SYSTEM ONLINE");
});

app.get("/data/items", (request, response) => {
  knex("items")
    .select("*")
    .orderBy("id", "asc")
    .then((data) => response.status(200).json(data));
});

app.post("/data/items", (request, response) => {
  let itemData = request.body;
  //console.log("USING DATA FOR: ", itemData);
  const { user_id, item_name, description, qty } = request.body;
  knex("items")
    .insert({ user_id, item_name, description, qty })
    .then(response.status(201).json({ status: "Inserted" }));
});

app.put("/data/items", (request, response) => {
  let itemData = request.body;
  console.log("UPDATING WITH INFORMATION: ", itemData);
  knex("items")
    .where({ id: itemData.id })
    .update({
      user_id: itemData.user_id,
      item_name: itemData.item_name,
      description: itemData.description,
      qty: itemData.qty,
    })
    .then(() => {
      response.status(201).json({ status: "Updated" });
    });
});

app.delete("/data/items", (request, response) => {
  let target = request.body.id;
  console.log("DELETING ITEM BY ID: ", target);
  knex("items")
    .where({ id: target })
    .delete()
    .then(() => {
      response.status(201).json({ status: "Deleted" });
    });
});

app.post("/data/users", (request, response) => {
  const { first_name, last_name, username, password } = request.body;
  knex("users")
    .insert({ first_name, last_name, username, password })
    .then(response.status(201).json({ status: "Inserted" }));
});

app.get("/data/users", (request, response) => {
  knex("users")
    .select("*")
    .orderBy("id", "asc")
    .then((data) => response.status(200).json(data));
});

app.put("/data/users", (request, response) => {
  let userData = request.body;
  //console.log("UPDATING WITH INFORMATION: ", userData);
  knex("users")
    .where({ id: userData.id })
    .update({
      first_name: userData.first_name,
      last_name: userData.last_name,
      username: userData.username,
      password: userData.password,
    })
    .then(() => {
      response.status(201).json({ status: "Updated" });
    });
});
// //WARNING, ALSO DELETES ALL ITEMS ASSOSIATED WITH USER
// app.delete("/data/users", (request, response) => {
//   let target = request.body.id;

//   knex("items")
//     .where({ user_id: target })
//     .delete()
//     .then(() => {
//       return knex("users")
//         .where({ id: target })
//         .delete();
//     })
//     .then(() => {
//       response.status(201).json({ status: "Deleted" });
//     })
//     .catch((error) => {
//       response.status(500).json({ error: "Error deleting user" });
//     });
// });

app.delete("/data/users", (request, response) => {
  let target = request.body.id;

  knex("users")
    .where({ id: target })
    .delete()
    .then(() => {
      response.status(201).json({ status: "Deleted" });
    })
    .catch((error) => {
      response
        .status(500)
        .json({
          error: "Error deleting user, items are still tied to their ID",
        });
    });
});

app.post("/data/single_user", (request, response) => {
  let target = request.body.id;
  knex("users")
    .select("first_name", "last_name")
    .where({ id: target })
    .then((data) => response.status(200).json(data));
});

app.post("/auth/login", (request, response) => {
  let userData = request.body;
  console.log("ATTEMPTING VERIFY WITH: ", userData.username);
  knex("users")
    .select("*")
    .where({ username: userData.username })
    .then((data) => {
      //console.log("RETREIVED DATA: ", data)
      //console.log("DATABASE PASSWORD: ", data[0].password)
      //console.log("SUBMITTED PASSWORD: ", userData.password)
      if (data[0].password === userData.password) {
        //console.log("USER VERIFIED");
        response.status(201).json({ status: "Authenticated" });
      }
    })
    .catch((err) => response.status(500).send(err));
});

app.post("/auth/userid", (request, response) => {
  let userData = request.body;
  //console.log("ATTEMPTING VERIFY WITH: ", userData.username);
  knex("users")
    .select("id")
    .where({ username: userData.username })
    .then((data) => response.status(200).json(data));
});

app.post("/data/items/byuser", (request, response) => {
  let userData = request.body;
  //console.log("ATTEMPTING VERIFY WITH: ", userData.username);
  knex("items")
    .select("*")
    .where({ user_id: userData.id })
    .then((data) => response.status(201).json(data));
});
