import { Movie } from "../../src/types/data/Movie";
import { IMDBClient } from "../../src/lib/IMDBClient";

const imdbClient = new IMDBClient("925eba28");
test("IMDB API Client is working to catch Batman", () => {
  return imdbClient.getMovieById("tt0372784").then((testMovie) => {
    expect(testMovie).toBeInstanceOf(Movie);
  });
});
