import Axios, { AxiosInstance } from "axios";
import { Movie, RawMovie } from "#types/Movie";

interface IMDBClientInterface {
  searchMoviesByName(name: string): Promise<Array<Movie>>;
  getMovieById(id: string): Promise<Movie>;
}

export class IMDBClient implements IMDBClientInterface {
  private _apiClient: AxiosInstance;

  constructor(apiKey: string) {
    this._apiClient = Axios.create({
      baseURL: "https://www.omdbapi.com",
    });

    this._apiClient.interceptors.request.use((configuration) => {
      configuration.params = {
        apiKey: apiKey,
        ...configuration.params,
      };
      return configuration;
    });
  }

  async searchMoviesByName(name: string): Promise<Array<Movie>> {
    const request = await this._apiClient.get<{ Search: RawMovie[] }>("", {
      params: {
        s: encodeURI(name),
      },
    });
    const response = [];

    if (request.status === 200) {
      request.data.Search.filter(
        (rawMovie) => rawMovie.Type === "movie"
      ).forEach((rawMovie) =>
        response.push(
          new Movie(
            rawMovie.Title,
            rawMovie.Year,
            rawMovie.imdbID,
            rawMovie.Type,
            rawMovie.Poster
          )
        )
      );
    }

    return response;
  }
  async getMovieById(id: string): Promise<Movie> {
    const request = await this._apiClient.get<RawMovie>("", {
      params: {
        i: id,
      },
    });

    const rawMovie = request.data;

    return request.status === 200 && rawMovie.Type === "movie"
      ? new Movie(
          rawMovie.Title,
          rawMovie.Year,
          rawMovie.imdbID,
          rawMovie.Type,
          rawMovie.Poster
        )
      : null;
  }
}
