import "source-map-support/register";
import { APIGatewayProxyEvent, APIGatewayProxyResult } from "aws-lambda";
import { APIGatewayResponse } from "src/lib/APIGatewayResponse";

export default async function ListBookmarkedMovies(
  event: APIGatewayProxyEvent
): Promise<APIGatewayProxyResult> {
  return APIGatewayResponse.build(200, {});
}