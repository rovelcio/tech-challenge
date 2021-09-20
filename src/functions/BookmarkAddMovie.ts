import "source-map-support/register";
import { APIGatewayProxyEvent, APIGatewayProxyResult } from "aws-lambda";
import { APIGatewayResponse } from "../lib/APIGatewayResponse";
import { DynamoDBMovieClient } from "../lib/DynamoDBMovieClient";
import { IMDBClient } from "../lib/IMDBClient";

const dynamoDbClient = new DynamoDBMovieClient();
const imdbClient = new IMDBClient();

export const BookmarkAddMovie = async (
  event: APIGatewayProxyEvent
): Promise<APIGatewayProxyResult> => {
  const searchPayload = event.pathParameters;
  const imdbID = searchPayload.imdbID;

  if (!imdbID) {
    return APIGatewayResponse.build(400, {});
  }

  const movie = await imdbClient.getMovieById(imdbID);
  const addedMovie = await dynamoDbClient.bookmarkAddMovie(imdbID, movie);
  return APIGatewayResponse.build(addedMovie ? 200 : 502, { addedMovie });
};
