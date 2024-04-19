import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
// import Register from "./Register";
//import ResponsiveAppBar from './Components/Headerbar';
// import { useAuth0 } from "@auth0/auth0-react";

const MyItems = () => {
  const [userData, setUserData] = useState();


  useEffect(() => {
  //GRAB COOKIES AND SPLIT THEM INTO AN ARRAY
  const cookies = document.cookie.split(';');
  for (let i = 0; i < cookies.length; i++) {
    const cookie = cookies[i].trim();
    //FIND USERID
    if (cookie.startsWith('userid=')) {
      //REMOVE USERID
      const userId = cookie.substring('userid='.length);
      //console.log('USERNAME', userId);
      //GET NUMERICAL VALUE

      async function getNumericalId(){
      const response = await fetch("http://localhost:8081/auth/userid", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({"username" :`${userId}`}),
      });
      const data = await response.json();
      //console.log(await data[0].id);
      //setUserData(data[0].id);
      console.log("USING USERNAME: ", data[0].id);
      loadItems(data[0].id);
    }
    getNumericalId();
  } else {alert("YOU MUST LOGIN TO USE THIS PAGE");
  window.location.href = "http://localhost:3000/allitems";}
}
}, []);



  async function loadItems(userNum) {
    console.log("LOADING ITEMS USING", {"id" :userNum});
    console.log(typeof(userNum));


    //GET ITEMS BY USER ID
    const response = await fetch("http://localhost:8081/data/items/byuser", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({"id" :`${userNum}`}),
      });
      if (response.status === 201) {
        const itemsArray = await response.json();
        setUserData(itemsArray);

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

      } else {
        alert("ERROR, CANNOT ADD");
        throw new Error("AddFailure");
      }

    //PRINT THEM OUT
    //var itemsArray = await response.json();
    //await console.log(itemsArray);

  }

  return (
    <>
      <h1>My Items</h1>
      <div className="scrollBox" id="boxLoader"></div>
    </>
);
};
export default MyItems;
