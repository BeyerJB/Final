import "./App.css";
import React, { useState, useEffect } from "react";
import { Router, Routes, Route } from "react-router-dom";
import Headerbar from "./Headerbar.js";
import Login from "./Login";
import ItemPanel from "./ItemPanel";
import Register from "./Register.js";
import AddItem from "./AddItem.js";

function App() {
  return (
    <>
      <div className="App">
        <Headerbar />
      </div>
      <div>
          <Routes>
            <Route path={"/"} element={<ItemPanel />} />
            <Route path={"/items"} element={<ItemPanel />} />
            <Route path={"/login"} element={<Login />} />
            <Route path={"/register"} element={<Register />} />
            <Route path={"/additem"} element={<AddItem />} />
          </Routes>
      </div>
    </>
  );
}

export default App;
