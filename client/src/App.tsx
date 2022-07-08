import React from "react";
import { Routes, Route } from "react-router-dom";
import HomeScreen from "./screens/HomeScreen";
import PlayRandomScreen from "./screens/PlayRandomScreen";
import CategoriesScreen from "./screens/CategoriesScreen";
import CategoryScreen from "./screens/CategoryScreen";
import MyDictionaryScreen from "./screens/MyDictionaryScreen";
import Navbar from "./components/global components/Navbar";

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
          <Route path="/mydictionary" element={<MyDictionaryScreen />}></Route>
        </Routes>
        <div>
          I'm baby woke cloud bread trust fund next level craft beer flannel
          jean shorts actually sriracha gentrify coloring book wayfarers
          knausgaard chia. Meditation dreamcatcher yr readymade vinyl. Synth DSA
          freegan, fanny pack leggings pickled franzen umami whatever irony.
          Salvia jianbing hoodie taxidermy, YOLO chartreuse occupy typewriter
          vice scenester 90's gentrify woke. Raw denim church-key plaid banjo
          ennui cold-pressed humblebrag photo booth. Chambray occupy mustache,
          cronut health goth flexitarian disrupt trust fund listicle +1 cliche
          deep v DIY whatever godard. Irony tote bag venmo, pitchfork man bun af
          swag lyft viral tbh health goth. Pug fixie copper mug shoreditch vice
          celiac, helvetica live-edge. Kitsch synth blog four loko, stumptown
          paleo air plant vape blue bottle hammock church-key lumbersexual
          meditation butcher normcore. Venmo woke retro, celiac everyday carry
          banh mi kale chips four loko ugh vegan meditation pork belly vinyl.
          Ugh dreamcatcher cold-pressed hot chicken pickled narwhal +1
          letterpress flexitarian blue bottle bespoke woke. Aesthetic meh
          celiac, tofu green juice lomo coloring book. Distillery microdosing
          trust fund drinking vinegar, meh lumbersexual fingerstache meditation
          synth cred 3 wolf moon. Hot chicken portland kinfolk, gastropub mlkshk
          woke put a bird on it prism green juice palo santo small batch.
          Chicharrones craft beer godard, pop-up chartreuse chambray migas
          try-hard. Ennui migas food truck flannel shaman edison bulb selvage
          listicle raclette mixtape beard gluten-free. Street art kogi cred,
          XOXO flexitarian live-edge bicycle rights poutine godard viral keytar
          af. Wolf vice raclette, waistcoat pug letterpress pour-over master
          cleanse sriracha. Waistcoat photo booth unicorn, tbh taiyaki
          succulents intelligentsia. Cloud bread pinterest cray gluten-free
          selfies. Master cleanse food truck distillery photo booth artisan four
          dollar toast williamsburg. Artisan swag yes plz thundercats bespoke.
          DSA mixtape pug la croix plaid kale chips sartorial tilde quinoa
          post-ironic salvia air plant. Coloring book gluten-free sriracha
          disrupt, vape readymade cornhole kale chips pug lumbersexual leggings.
          Mlkshk yuccie pop-up church-key, beard wayfarers jean shorts gochujang
          slow-carb stumptown chia. Slow-carb edison bulb celiac live-edge
          asymmetrical echo park. Farm-to-table organic pitchfork flannel cliche
          la croix. Enamel pin PBR&B seitan DIY schlitz chambray chicharrones
          mixtape banjo everyday carry thundercats chia stumptown tousled.
          Crucifix vegan craft beer subway tile. Skateboard chicharrones
          pinterest 3 wolf moon vice, listicle hella. Tonx master cleanse
          typewriter, affogato vegan tbh snackwave.
        </div>
      </main>
    </div>
  );
}

export default App;
