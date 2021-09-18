import Axios, { AxiosInstance } from "axios";
import { Movie, RawMovie } from "../model/data/Movie";

interface IMDBClientInterface {
  searchMoviesByName(name: string): Promise<Array<Movie>>;
  getMovieById(id: string): Promise<Movie>;
}

export class IMDBClient implements IMDBClientInterface {
  private _apiClient: AxiosInstance;

  constructor(imdbAPIKey?: string) {
    this._apiClient = Axios.create({
      baseURL: "https://www.omdbapi.com",
    });
    const apiKey = process.env.APIKEY || imdbAPIKey;
    this._apiClient.interceptors.request.use((configuration) => {
      configuration.params = {
        apiKey,
        type: "movie",
        ...configuration.params,
      };
      return configuration;
    });
  }

  async searchMoviesByName(name: string): Promise<Array<Movie>> {
    const request = await this._apiClient.get<{
      Search: RawMovie[];
      Response: "True" | "False";
    }>("", {
      params: {
        s: encodeURI(name),
      },
    });

    const response = [];

    if (request.data.Response === "True") {
      request.data.Search.forEach((rawMovie) =>
        response.push(Movie.fromImdb(rawMovie))
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

    return request.data.Response === "True" ? Movie.fromImdb(rawMovie) : null;
  }
}
