import { Routes, Route } from "react-router-dom";
import HomeScreen from "./screens/HomeScreen";
import PlayRandomScreen from "./screens/PlayRandomScreen";
import PlayRandomGameModeScreen from "./screens/PlayRandomGameModeScreen";
import PlayGeniusScreen from "./screens/PlayGeniusScreen";
import PlayCommonScreen from "./screens/PlayCommonScreen";
import CategoriesScreen from "./screens/CategoriesScreen";
import CategoryScreen from "./screens/CategoryScreen";
import AddCategoryScreen from "./screens/AddCategoryScreen";
import AllWordsCategoryScreen from "./screens/AllWordsCategoryScreen";
import UpdateCategoryScreen from "./screens/UpdateCategoryScreen";
import MyDictionaryScreen from "./screens/MyDictionaryScreen";
import Navbar from "./components/global components/Navbar";
import UpdateDefinitionScreen from "./screens/UpdateDefinitionScreen";
import LoginScreen from "./screens/LoginScreen";
import SignupScreen from "./screens/SignupScreen";
import AccountScreen from "./screens/AccountScreen";
import ErrorScreen from "./screens/ErrorScreen";
import EditUserAccountScreen from "./screens/EditUserAccountScreen";
import MyDictionaryWordScreen from "./screens/MyDictionaryWordScreen";
import PlayCategoryScreen from "./screens/PlayCategoryScreen";

function App() {
  return (
    <div className="App">
      <Navbar />
      <main>
        <Routes>
          <Route path="/" element={<HomeScreen />}></Route>
          <Route
            path="/playrandom/game-mode"
            element={<PlayRandomGameModeScreen />}
          ></Route>
          <Route
            path="/playrandom/genius"
            element={<PlayGeniusScreen />}
          ></Route>
          <Route
            path="/playrandom/common"
            element={<PlayCommonScreen />}
          ></Route>
          <Route path="/playrandom" element={<PlayRandomScreen />}></Route>
          <Route path="/categories" element={<CategoriesScreen />}></Route>
          <Route
            path="/play-category/:name"
            element={<PlayCategoryScreen />}
          ></Route>
          <Route path="/categories/:name" element={<CategoryScreen />}></Route>
          <Route path="/add-category" element={<AddCategoryScreen />}></Route>
          <Route
            path="/all-words/:categoryname"
            element={<AllWordsCategoryScreen />}
          ></Route>
          <Route
            path="/update-category/:categoryname"
            element={<UpdateCategoryScreen />}
          ></Route>
          <Route
            path="/mydictionary/:username"
            element={<MyDictionaryScreen />}
          ></Route>
          <Route
            path="/mydictionary/term/:word"
            element={<MyDictionaryWordScreen />}
          ></Route>
          <Route
            path="/update/:username/:word"
            element={<UpdateDefinitionScreen />}
          ></Route>
          <Route path="/signup" element={<SignupScreen />}></Route>
          <Route path="/login" element={<LoginScreen />}></Route>
          <Route path="/account" element={<AccountScreen />}></Route>
          <Route
            path="/edit-account"
            element={<EditUserAccountScreen />}
          ></Route>
          <Route path="*" element={<ErrorScreen />}></Route>
        </Routes>
      </main>
    </div>
  );
}

export default App;
