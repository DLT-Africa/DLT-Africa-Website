import { Route, Routes } from "react-router-dom";
import "./index.css";
import Home from "./components/Home";
import SuccessPage from "./components/SuccessPage";

const App = () => {
  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/success" element={<SuccessPage />} />
      </Routes>
    </>
  );
};

export default App;
