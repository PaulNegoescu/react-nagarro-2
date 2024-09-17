export interface Film {
  title:         string;
  episode_id:    number;
  opening_crawl: string;
  director:      string;
  poster:        string;
  producer:      string;
  release_date:  Date;
  characters:    number[] | Record<string, string>[];
  planets:       number[] | Record<string, string>[];
  starships:     number[] | Record<string, string>[];
  vehicles:      number[];
  species:       number[];
  id:            number;
}
