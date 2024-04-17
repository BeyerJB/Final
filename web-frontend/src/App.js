import "./App.css";
import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Headerbar from "./Headerbar.js";
import Login from "./Login";
import ItemPanel from "./ItemPanel";

function App() {
  return (
    <>
      <div className="App">
        <Headerbar />
      </div>
      <div>
        <Router>
          <Routes>
            <Route path={"/"} element={<ItemPanel />} />
            <Route path={"/login"} element={<Login />} />
          </Routes>
        </Router>
      </div>
    </>
  );
}

export default App;
