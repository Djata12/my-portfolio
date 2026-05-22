import { BrowserRouter, Routes, Route } from "react-router-dom";


import Home from "./pages/Home";

import InventoryFlow from "./projects/InventoryFlow";
import MoMoBridge from "./projects/MoMoBridge";
import GhanaTechHub from "./projects/GhanaTechHub";

import KwameAsante from "./developers/KwameAsante";
import NaaDedeiLamptey from "./developers/NaaDedeiLamptey";
import RichardOwusu from "./developers/RichardOwusu";
import EnyonamAgbeko from "./developers/EnyonamAgbeko";
import DanielNortey from "./developers/DanielNortey";
import EsiHammond from "./developers/EsiHammond";

export default function App() {
  return (
    <BrowserRouter>

      <Routes>

        

        <Route
          path="/"
          element={<Home />}
        />

        

        <Route
          path="/projects/inventoryflow"
          element={<InventoryFlow />}
        />

        <Route
          path="/projects/momobridge"
          element={<MoMoBridge />}
        />

        <Route
          path="/projects/ghanatechhub"
          element={<GhanaTechHub />}
        />
        
        <Route
          path="/developers/kwame-asante"
          element={<KwameAsante />}
        />
        
        <Route
          path="/developers/naa-dedei-lamptey"
          element={<NaaDedeiLamptey />}
        />
        
        <Route
          path="/developers/richard-owusu"
          element={<RichardOwusu />}
        />
        
        <Route
          path="/developers/enyonam-agbeko"
          element={<EnyonamAgbeko />}
        />
        
        <Route
          path="/developers/daniel-nortey"
          element={<DanielNortey />}
        />
        
        <Route
          path="/developers/esi-hammond"
          element={<EsiHammond />}
        />

      </Routes>

    </BrowserRouter>
  );
}