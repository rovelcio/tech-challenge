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
    private _title,
    private _year,
    private _imdbID,
    private _type,
    private _posterUrl
  ) {}

  get title() {
    return this._title;
  }
  get year() {
    return this._year;
  }
  get imdbID() {
    return this._imdbID;
  }
  get type() {
    return this._type;
  }
  get posterUrl() {
    return this._posterUrl;
  }
}
