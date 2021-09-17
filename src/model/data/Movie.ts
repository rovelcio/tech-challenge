interface MovieInterface {
  title: string;
  year: string;
  imdbID: string;
  type: "movie";
  posterUrl: string;
}

export interface RawMovie {
  Title: string;
  Year: string;
  imdbID: string;
  Type: string;
  Poster: string;
}

export class Movie implements MovieInterface {
  constructor(
    public title,
    public year,
    public imdbID,
    public type,
    public posterUrl,
  ) {}
}
