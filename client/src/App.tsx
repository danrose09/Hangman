import React from "react";
import { Routes, Route } from "react-router-dom";
import HomeScreen from "./screens/HomeScreen";
import PlayRandomScreen from "./screens/PlayRandomScreen";
import CategoriesScreen from "./screens/CategoriesScreen";
import CategoryScreen from "./screens/CategoryScreen";
import MyDictionaryScreen from "./screens/MyDictionaryScreen";
import Navbar from "./components/global components/Navbar";
import UpdateDefinitionScreen from "./screens/UpdateDefinitionScreen";
import LoginScreen from "./screens/LoginScreen";
import SignupScreen from "./screens/SignupScreen";
import AccountScreen from "./screens/AccountScreen";

function App() {
  return (
    <div className="App">
      <Navbar />
      <main>
        <Routes>
          <Route path="/" element={<HomeScreen />}></Route>
          <Route path="/playrandom" element={<PlayRandomScreen />}></Route>
          <Route path="/categories" element={<CategoriesScreen />}></Route>
          <Route path="/categories/:name" element={<CategoryScreen />}></Route>
          <Route
            path="/mydictionary/:username"
            element={<MyDictionaryScreen />}
          ></Route>
          <Route
            path="/update/:word"
            element={<UpdateDefinitionScreen />}
          ></Route>
          <Route path="/signup" element={<SignupScreen />}></Route>
          <Route path="/login" element={<LoginScreen />}></Route>
          <Route path="/account" element={<AccountScreen />}></Route>
        </Routes>
      </main>
    </div>
  );
}

export default App;
