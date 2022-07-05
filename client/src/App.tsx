import React from "react";
import { Routes, Route } from "react-router-dom";
import HomeScreen from "./screens/HomeScreen";
import PlayRandomScreen from "./screens/PlayRandomScreen";
import CategoriesScreen from "./screens/CategoriesScreen";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<HomeScreen />}></Route>
        <Route path="/playrandom" element={<PlayRandomScreen />}></Route>
        <Route path="/categories" element={<CategoriesScreen />}></Route>
      </Routes>
    </div>
  );
}

export default App;
