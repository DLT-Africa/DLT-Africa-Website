// src/App.js

import { Route, Routes } from "react-router-dom";
import "./index.css";
import Home from "./components/Home";

const App = () => {
  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
      </Routes>
    </>
  );
};

export default App;
