import { useState } from "react";
//import { workout_routine_backend } from 'declarations/workout_routine_backend';
import { BrowserRouter, Route, Routes } from "react-router-dom";
import WelcomePage from "./pages/welcome";
import MainPage from "./pages/mainpage";
import { AuthProvider } from "./auth/authetictae";
function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <Routes>
          <Route path="/" element={<WelcomePage />} />
          <Route path="/main" element={<MainPage />} />
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;
