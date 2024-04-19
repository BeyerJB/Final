import "./App.css";
import React, { useState, useEffect } from "react";
import { Router, Routes, Route } from "react-router-dom";
import Headerbar from "./Headerbar.js";
import Login from "./Login";
import ItemPanel from "./ItemPanel";
import Register from "./Register.js";
import AddItem from "./AddItem.js";
import MyItems from "./MyItems.js";

function App() {
  return (
    <>
      <div className="App">
        <Headerbar />
      </div>
      <div>
          <Routes>
            <Route path={"/"} element={<ItemPanel />} />
            <Route path={"/allitems"} element={<ItemPanel />} />
            <Route path={"/login"} element={<Login />} />
            <Route path={"/register"} element={<Register />} />
            <Route path={"/additem"} element={<AddItem />} />
            <Route path={"/my_items"} element={<MyItems />} />
          </Routes>
      </div>
    </>
  );
}

export default App;
