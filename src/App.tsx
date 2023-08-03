import React from "react";
import "./App.css";
import { Route, Routes } from "react-router-dom";
import Main from "./components/Main/Main";
import Incoming from "./pages/Incoming/Incoming";
import Home from "./pages/Home";
import Sent from "./pages/Sent/Sent";
import Drafts from "./pages/Drafts/Drafts";
import Deleted from "./pages/Deleted/Deleted";
import Spam from "./pages/Spam/Spam";
import OneLetter from "./pages/OneLetter/OneLetter";
import CustomFolder from "./pages/CustomFolder/CustomFolder";

const App: React.FC = () => {
  return (
    <div className="App">
      <Main />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/incoming" element={<Incoming />} />
        <Route path="/sent" element={<Sent />} />
        <Route path="/drafts" element={<Drafts />} />
        <Route path="/deleted" element={<Deleted />} />
        <Route path="/spam" element={<Spam />} />
        <Route path="/oneLetter/:id" element={<OneLetter />} />
        <Route path="/customFolder/:id" element={<CustomFolder />} />
      </Routes>
    </div>
  );
};

export default App;
