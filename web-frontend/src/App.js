import './App.css';
import React, { useState, useEffect } from 'react';
import Headerbar from './Headerbar.js';


function App() {

  let [itemArray, setItemArray] = useState([]);

  // useEffect(() => {
  //   //console.log("ATTEMPTING TO BUBBLE IN: ", aiReply)
  //   let itembox = document.createElement("div");
  //   itembox.className = "itemBox";
  //   //textBubble.innerHTML = `${aiReply}`;
  //   itembox.innerHTML = `CARD`;
  //   document.getElementById("boxLoader").appendChild(itembox);
  // }, [itemArray])

  useEffect(() => {
    loadItems();
  }, []);

  async function loadItems(){
    //console.log("LOADING ITEMS");
    let response = await fetch('http://localhost:8081/data/items');
    var itemsArray = await response.json()
    //await console.log(itemsArray);
    for(var i = 0; i < itemsArray.length; i++){

      //GET NAMES OF POSTERS
      //console.log("FINDING USER: ", itemsArray[i].user_id)
      let usernameData = await fetch('http://localhost:8081/data/single_user', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          id: itemsArray[i].user_id
        })
      });

      var firstLast = await usernameData.json()
      //console.log(firstLast);
      var nameString = `${firstLast[0].first_name} ${firstLast[0].last_name}`
      //console.log(nameString);

      //console.log(itemsArray[i].item_name);
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


  return (
    <div className="App">
      <Headerbar/>
      <div className="scrollBox" id="boxLoader"></div>
    </div>
  );
}

export default App;
