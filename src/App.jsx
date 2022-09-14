import CreateHolidayForm from "./pages/CreateHolidayForm";
import { BrowserRouter, Link, Route, Routes } from "react-router-dom";

import Login from "./pages/Login";
import { useState } from "react";
import HolidayTable from "./pages/HolidayTable";
import Navbar from "./components/Navbar";

function App() {
  //if token blank means not logged in...use context for token
  const [token, setToken] = useState("");
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/" element={<HolidayTable token={token} />} />
        <Route path="/login" element={<Login setToken={setToken} />} />
        <Route path="/secret" element={<CreateHolidayForm token={token} />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
