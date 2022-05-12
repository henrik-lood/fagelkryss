import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";

import { HomePage } from "./pages/HomePage";
import { LoginPage } from "./pages/LoginPage";
import { SignupPage } from "./pages/SignupPage";
import { NavBar } from "./components/NavBar";
import { ResetPasswordPage } from "./pages/ResetPasswordPage";
import { AddBird } from "./components/AddBird";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <NavBar />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/signup" element={<SignupPage />} />
          <Route path="/resetPassword" element={<ResetPasswordPage />} />
          <Route path="/addBird" element={<AddBird />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
