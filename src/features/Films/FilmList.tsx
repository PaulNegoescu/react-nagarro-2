import { Card } from './Card';
import type { Film } from './FilmTypes';
import { useEffect, useState } from 'react';

import styles from './Film.module.css';

export function FilmList() {
  const [films, setFilms] = useState<Film[] | null>(null);

  useEffect(() => {
    fetch('http://localhost:3210/films')
      .then((res) => res.json())
      .then(setFilms);
  }, []);

  return (
    <section className={styles.filmList}>
      <h1>Films</h1>
      {!films && <strong>Loading ...</strong>}
      {films && films.map((data) => <Card key={data.id} film={data} />)}
    </section>
  );
}
