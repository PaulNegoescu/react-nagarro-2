import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Film } from './FilmTypes';
import { Input } from '@/components/form/Input';
import { useForm } from 'react-hook-form';
import { Textarea } from '@/components/form/Textarea';
import { number, object, string } from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';

const validationSchema = object({
  title: string().required(),
  episode_id: number(),
  opening_crawl:  string(),
  director: string(),
  poster: string().required().url(),
  producer: string(),
  release_date: string(),
});

export function EditFilm() {
  const [film, setFilm] = useState<Film | null>(null);
  const { id } = useParams();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(validationSchema),
  });

  useEffect(() => {
    async function getFilm() {
      const data = await fetch(`http://localhost:3210/films/${id}`).then(
        (res) => res.json()
      );
      reset(data);
      setFilm(data);
    }

    getFilm();
  }, [id, reset]);

  if (!film) {
    return <strong>Loading ...</strong>;
  }

  // "characters"
  // "planets"
  // "starships"
  // "vehicles"
  // "species"

  return (
    <form onSubmit={handleSubmit(() => {})} className="brandForm">
      <h1>Editing "{film.title}"</h1>
      <Input
        id="title"
        type="text"
        labelText="Title"
        errorMessage={errors.title?.message}
        {...register('title')}
      />

      <Input
        id="episode_id"
        type="number"
        min="0"
        step=".5"
        labelText="Episode No."
        errorMessage={errors.episode_id?.message}
        {...register('episode_id')}
      />

      <Textarea
        id="opening_crawl"
        labelText="Opening Crawl"
        errorMessage={errors.opening_crawl?.message}
        {...register('opening_crawl')}
      />
      <Input
        id="director"
        type="text"
        labelText="Director"
        errorMessage={errors.director?.message}
        {...register('director')}
      />

      <Input
        id="producer"
        type="text"
        labelText="Producer"
        errorMessage={errors.producer?.message}
        {...register('producer')}
      />

      <Input
        id="poster"
        type="url"
        labelText="Poster"
        errorMessage={errors.poster?.message}
        {...register('poster')}
      />

      <Input
        id="release_date"
        type="date"
        labelText="Release Date"
        errorMessage={errors.release_date?.message}
        {...register('release_date')}
      />

      <button type="submit" className="actionButton">
        Edit Film
      </button>
    </form>
  );
}
