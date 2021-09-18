interface MovieInterface {
  movieTitle: string;
  movieYear: string;
  movieImdbID: string;
  movietType: string;
  moviePosterUrl: string;
}

export interface RawMovie {
  Title: string;
  Year: string;
  imdbID: string;
  Type: string;
  Poster: string;
  Response: "True" | "False";
}

export class Movie implements MovieInterface {
  constructor(
    public movieTitle: string,
    public movieYear: string,
    public movieImdbID: string,
    public movietType: string,
    public moviePosterUrl: string
  ) {}

  static fromDb(movie: Movie) {
    return new this(
      movie.movieTitle,
      movie.movieYear,
      movie.movieImdbID,
      movie.movietType,
      movie.moviePosterUrl
    );
  }

  static fromImdb(rawMovie: RawMovie) {
    return new this(
      rawMovie.Title,
      rawMovie.Year,
      rawMovie.imdbID,
      rawMovie.Type,
      rawMovie.Poster
    );
  }
}
