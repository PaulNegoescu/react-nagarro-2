import { Link } from "react-router-dom";
import { Film } from "./FilmTypes";

interface Props {
  film: Film;
}

export function Card({ film }: Props) {
  return (
    <article>
      <Link to={String(film.id)}>
        <img src={film.poster} alt={`Poster for ${film.title}`} />
        <h2>{film.title}</h2>
      </Link>
    </article>
  );
}
