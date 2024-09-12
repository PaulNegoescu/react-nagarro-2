import { BrowserRouter, Route, Routes } from "react-router-dom";
import { FilmList } from "../../features/Films/FilmList";
import { FilmDetails } from "../../features/Films/FilmDetails";
import { Counter } from "../../features/Counter/Counter";
import { Nav } from "../Nav/Nav";

import './App.css';

export function App() {
  return (
  <BrowserRouter>
    <Nav />
    <div className="siteWrapper">
      <Routes>
        <Route path="/" element={<h1>Homepage</h1>} />
        <Route path="counter" element={<Counter />} />
        <Route path="films" element={<FilmList />} />
        <Route path="films/:id" element={<FilmDetails />} />
        <Route path="*" element={<h1>404 Not Found</h1>} />
      </Routes>
    </div>
  </BrowserRouter>
  );
}

