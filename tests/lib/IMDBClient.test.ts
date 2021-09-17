import { Movie } from "../../src/types/data/Movie";
import { IMDBClient } from "../../src/lib/IMDBClient";

const imdbClient = new IMDBClient("925eba28");
const batmanBegins = new Movie(
  "Batman Begins",
  "2005",
  "tt0372784",
  "movie",
  "https://m.media-amazon.com/images/M/MV5BOTY4YjI2N2MtYmFlMC00ZjcyLTg3YjEtMDQyM2ZjYzQ5YWFkXkEyXkFqcGdeQXVyMTQxNzMzNDI@._V1_SX300.jpg"
);

test("IMDB API Client is working to catch Batman", () => {
  return imdbClient.getMovieById("tt0372784").then((testMovie) => {
    expect(testMovie).toMatchObject(batmanBegins);
  });
});
