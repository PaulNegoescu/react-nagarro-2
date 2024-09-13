import { Card } from './Card';
import type { Film } from './FilmTypes';
import { useEffect, useState } from 'react';

import styles from './Film.module.css';

export function FilmList() {
  const [films, setFilms] = useState<Film[] | null>(null);

  useEffect(() => {
    (async function () {
      const filmRepository = new FilmRepository();

      const films = await filmRepository.getAllShallow();
      setFilms(films);
    })();
  }, []);

  return (
    <section className={styles.filmList}>
      <h1>Films</h1>
      {!films && <strong>Loading ...</strong>}
      {films && films.map((data) => <Card key={data.id} film={data} />)}
    </section>
  );
}
