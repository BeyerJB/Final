import React, { useState } from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
// import Register from "./Register";
//import ResponsiveAppBar from './Components/Headerbar';
// import { useAuth0 } from "@auth0/auth0-react";

const ItemPanel = () => {
  async function loadItems() {
    //console.log("LOADING ITEMS");
    let response = await fetch("http://localhost:8081/data/items");
    var itemsArray = await response.json();
    //await console.log(itemsArray);
    for (var i = 0; i < itemsArray.length; i++) {
      //GET NAMES OF POSTERS
      //console.log("FINDING USER: ", itemsArray[i].user_id)
      let usernameData = await fetch("http://localhost:8081/data/single_user", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          id: itemsArray[i].user_id,
        }),
      });

      var firstLast = await usernameData.json();
      //console.log(firstLast);
      var nameString = `${firstLast[0].first_name} ${firstLast[0].last_name}`;
      //console.log(nameString);

      //console.log(itemsArray[i].item_name);

      if (itemsArray[i].description.length > 100) {
        itemsArray[i].description =
          itemsArray[i].description.substring(0, 100) + "...";
      }

      let itembox = document.createElement("div");
      itembox.className = "itemBox";
      itembox.innerHTML = `
      <h3 class="cardHeader">${itemsArray[i].item_name}</h3>
      <p class="info">Item No: ${itemsArray[i].id}</p>
      <p class="info">Description: ${itemsArray[i].description}</p>
      <p class="info">Quantity: ${itemsArray[i].qty}</p>
      <p class="info">Added by: ${nameString}</p>
      `;
      document.getElementById("boxLoader").appendChild(itembox);
    }
  }
  loadItems();

  return (
    <>
      <h1>All Items</h1>
      <div className="scrollBox" id="boxLoader"></div>
    </>
  );
};
export default ItemPanel;
