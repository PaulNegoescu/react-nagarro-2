import { BrowserRouter, Route, Routes } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import { FilmList, FilmDetails, EditFilm } from "@/features/Films";
import { Counter } from "@/features/Counter/Counter";
import { Register, Login, AuthContextProvider } from "@/features/Auth";
import { Nav } from "@/components/Nav/Nav";

import 'react-toastify/dist/ReactToastify.css';
import './App.css';

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
          <Route path="films/:id/edit" element={<EditFilm />} />
          <Route path="*" element={<h1>404 Not Found</h1>} />
        </Routes>
      </div>
    </AuthContextProvider>
    <ToastContainer />
  </BrowserRouter>
  );
}

