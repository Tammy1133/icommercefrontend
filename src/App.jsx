import "./App.css";
import "bootstrap-icons/font/bootstrap-icons.css";
import { Route, Routes } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "./css/main.css";
import React, { Suspense, useEffect, useState } from "react";
import "./css/main.css";
import Main from "./components/main";
import { Eachcategory } from "./components/eachcategory";
import { EachProductPage } from "./components/eachproductpage";
import { Cart } from "./components/cart";
import { Login } from "./components/login";
import { Register } from "./components/register";
import { Passwordrecovery } from "./components/password-recovery";
import { Search } from "./components/search";
import { Profile } from "./components/profile";
import { Admin } from "./components/admin";
import { Orders } from "./components/orders";

function App() {
  const [loading, setLoading] = useState("");

  return (
    <div>
      <Routes>
        <Route element={<Main> </Main>} path="/"></Route>
        <Route
          element={<Eachcategory></Eachcategory>}
          path="/category/:name"
        ></Route>
        <Route
          element={<EachProductPage></EachProductPage>}
          path="/product/:id"
        ></Route>
        <Route element={<Cart></Cart>} path="/cart"></Route>
        <Route element={<Login></Login>} path="/login"></Route>
        <Route element={<Register></Register>} path="/register"></Route>
        <Route
          element={<Passwordrecovery></Passwordrecovery>}
          path="/forgot"
        ></Route>
        <Route element={<Search></Search>} path="/search"></Route>
        <Route element={<Profile></Profile>} path="/profile"></Route>
        <Route element={<Orders></Orders>} path="/profile/orders"></Route>
        <Route element={<Admin></Admin>} path="/admin"></Route>
      </Routes>
    </div>
  );
}

export default App;
