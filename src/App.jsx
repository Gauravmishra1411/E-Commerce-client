import React from "react";
import Navbar from "./Page/Navbar";
import Product from "./Page/Product";
import Router from "./Router/Router";
import Footer from "./Page/Footer"

const App = () => {
  return (
    <div>
      <Navbar />
      {Router()}
      <Footer/>
    </div>
  );
};

export default App;
