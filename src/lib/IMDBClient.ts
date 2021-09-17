import Axios, { AxiosInstance } from "axios";
import { Movie } from "src/types/Movie";

interface IMDBClientInterface {
  searchMoviesByName(name: string): Array<Movie>;
  getMovieById(id: string): Movie;
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

  searchMoviesByName(name: string): Array<Movie> {
    return [];
  }
  getMovieById(id: string): Movie {
    return null;
  }
}
