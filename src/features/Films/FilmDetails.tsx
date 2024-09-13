import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { Film } from './FilmTypes';
import { FilmRepository } from "../../DataAccess/FilmRepository";

export function FilmDetails() {
  const [film, setFilm] = useState<Film | null>(null);
  const { id } = useParams();

  useEffect(() => {
    async function getFilm() {
      const filmRepository = new FilmRepository();
      const film = await filmRepository.getByIdFull(id);

      if (!film) {
        return null;
      }

      setFilm(film);
    }

    getFilm();
  }, [id]);

  if (!film) {
    return <strong>Loading ...</strong>;
  }

  const crawlParts = film.opening_crawl.split('\r\n');
  const jsxCrawl = crawlParts.map((part, index) => <p key={'line' + index}>{part}</p>);

  console.log(film);

  return (
    <>
      <h1>{film.title}</h1>
      <div>{jsxCrawl}</div>
      <h2>Characters</h2>
      <ul>
        {film.characters.map((ch) => (
          <li key={ch.id}>{ch.name}</li>
        ))}
      </ul>

      <h2>
        Starships
      </h2>
      <ul>
        {film.starships.map((ship) => (
          <li key={ship.id}>{ship.name}</li>
        ))}
      </ul>
      <Link to={`/films/${Number(id!) + 1}`}>Next</Link>
    </>
  );
}
