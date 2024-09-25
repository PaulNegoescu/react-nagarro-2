import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { Film } from './FilmTypes';
import { useAuthContext } from '../Auth/AuthContext';
interface FilmWithExternalEntities extends Film {
  characters: Record<string, string>[]
  starships: Record<string, string>[]
}

const externalResources = [
  'characters',
  'starships',
  'vehicles',
  'planets',
  'species',
] as const;

function getAllRelatedEntities(arrayOfIds: number[], resourceName: string): Promise<Record<string,string>>[] {
  const resourcePromises = [];
  for (const resId of arrayOfIds) {
    resourcePromises.push(
      fetch(`http://localhost:3210/${resourceName}/${resId}`).then((res) =>
        res.json()
      ) as Promise<Record<string,string>>
    );
  }

  return resourcePromises;
}

export function FilmDetails() {
  const [film, setFilm] = useState<FilmWithExternalEntities | null>(null);
  const { id } = useParams();
  const {user} = useAuthContext();

  useEffect(() => {
    async function getFilm() {
      const data = await fetch(`http://localhost:3210/films/${id}`).then(
        (res) => res.json()
      );

      if (!data) {
        return null;
      }
     
      const relatedEntities: Partial<Record<(typeof externalResources)[number], Record<string, string>[]>> = {};
      for (const resource of externalResources) {
        if (!data[resource]) continue;
        relatedEntities[resource] = await Promise.all(getAllRelatedEntities(data[resource], resource));
      }

      setFilm({...data, ...relatedEntities});
    }

    getFilm();
  }, [id]);

  if (!film) {
    return <strong>Loading ...</strong>;
  }

  const crawlParts = film.opening_crawl.split('\r\n');
  const jsxCrawl = crawlParts.map((part) => <p>{part}</p>);

  console.log(film);

  return (
    <article>
      <h1>{film.title}</h1>

      {user && (
        <>
          <Link to="edit">Edit</Link>{' '}
          <button type="button">Delete</button>
        </>
      )}

      {jsxCrawl}

      <section>
        <h2>Characters</h2>
        <ul>
          {film.characters.map((ch) => (
            <li key={ch.id}>{ch.name}</li>
          ))}
        </ul>
      </section>
      
      <section>
        <h2>
          Starships
        </h2>
        <ul>
          {film.starships.map((ship) => (
            <li key={ship.id}>{ship.name}</li>
          ))}
        </ul>
      </section>
      <Link to={`/films/${Number(id!) + 1}`}>Next</Link>
    </article>
  );
}
