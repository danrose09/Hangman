import React from "react";
import { Routes, Route } from "react-router-dom";
import HomeScreen from "./screens/HomeScreen";
import PlayRandomScreen from "./screens/PlayRandomScreen";
import CategoriesScreen from "./screens/CategoriesScreen";
import CategoryScreen from "./screens/CategoryScreen";
import Header from "./components/global components/Header";

function App() {
  return (
    <div className="App">
      <Header />
      <Routes>
        <Route path="/" element={<HomeScreen />}></Route>
        <Route path="/playrandom" element={<PlayRandomScreen />}></Route>
        <Route path="/categories" element={<CategoriesScreen />}></Route>
        <Route path="/categories/:name" element={<CategoryScreen />}></Route>
      </Routes>
    </div>
  );
}

export default App;
