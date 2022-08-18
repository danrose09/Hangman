import { Routes, Route } from "react-router-dom";
import HomeScreen from "./screens/HomeScreen";
import PlayRandomScreen from "./screens/PlayRandomScreen";
import PlayRandomSettingsScreen from "./screens/PlayRandomSettingsScreen";
import GeniusSettingsScreen from "./screens/GeniusSettingsScreen";
import CommonSettingsScreen from "./screens/CommonSettingsScreen";
import PlayGeniusScreen from "./screens/PlayGeniusScreen";
import PlayCommonScreen from "./screens/PlayCommonScreen";
import CategoriesScreen from "./screens/CategoriesScreen";
import CategoryScreen from "./screens/CategoryScreen";
import AddCategoryScreen from "./screens/AddCategoryScreen";
import MyDictionaryScreen from "./screens/MyDictionaryScreen";
import Navbar from "./components/global components/Navbar";
import UpdateDefinitionScreen from "./screens/UpdateDefinitionScreen";
import LoginScreen from "./screens/LoginScreen";
import SignupScreen from "./screens/SignupScreen";
import AccountScreen from "./screens/AccountScreen";
import ErrorScreen from "./screens/ErrorScreen";
import EditUserAccountScreen from "./screens/EditUserAccountScreen";
import MyDictionaryWordScreen from "./screens/MyDictionaryWordScreen";

function App() {
  return (
    <div className="App">
      <Navbar />
      <main>
        <Routes>
          <Route path="/" element={<HomeScreen />}></Route>
          <Route
            path="/settings/playrandom"
            element={<PlayRandomSettingsScreen />}
          ></Route>
          <Route
            path="/settings/genius"
            element={<GeniusSettingsScreen />}
          ></Route>
          <Route
            path="/settings/common"
            element={<CommonSettingsScreen />}
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
          <Route path="/categories/:name" element={<CategoryScreen />}></Route>
          <Route path="/add-category" element={<AddCategoryScreen />}></Route>
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
