import { BrowserRouter, Route, Routes } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import { FilmList } from "../../features/Films/FilmList";
import { FilmDetails } from "../../features/Films/FilmDetails";
import { Counter } from "../../features/Counter/Counter";
import { Nav } from "../Nav/Nav";
import { Register } from "../../features/Auth/Register";
import { Login } from "../../features/Auth/Login";

import 'react-toastify/dist/ReactToastify.css';
import './App.css';
import { AuthContextProvider } from "../../features/Auth/AuthContext";

export function App() {
  return (
  <BrowserRouter>
    <AuthContextProvider>
      <Nav />
      <div className="siteWrapper">
        <Routes>
          <Route path="/" element={<h1>Homepage</h1>} />
          <Route path="counter" element={<Counter />} />
          <Route path="register" element={<Register />} />
          <Route path="login" element={<Login />} />
          <Route path="films" element={<FilmList />} />
          <Route path="films/:id" element={<FilmDetails />} />
          <Route path="*" element={<h1>404 Not Found</h1>} />
        </Routes>
      </div>
    </AuthContextProvider>
    <ToastContainer />
  </BrowserRouter>
  );
}

