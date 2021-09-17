interface MovieInterface {
  title: string;
  year: number;
  imdbID: string;
  type: "movie";
}

export class Movie implements MovieInterface {
  constructor(private _title, private _year, private _imdbID, private _type) {}

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
}
