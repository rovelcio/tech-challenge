import { Movie } from "./Movie";

interface BookmarkInterface {
  createdAt: Date;
}

export class Bookmark extends Movie implements BookmarkInterface {
  private _createdAt: Date;

  constructor(movie: Movie, createdAt?: Date) {
    super(movie.movieTitle, movie.movieYear, movie.movieImdbID, movie.movietType, movie.moviePosterUrl);
    if (createdAt) {
      this._createdAt = createdAt;
    }
  }

  get createdAt() {
    return this._createdAt;
  }
}
