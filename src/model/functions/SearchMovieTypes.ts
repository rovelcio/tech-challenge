interface SearchPayload_Generic {
  title?: string;
  imdbID?: string;
}

interface SearchPayload_UnknownMovie extends SearchPayload_Generic {
  title: string;
}

interface SearchPayload_KnownMovie extends SearchPayload_Generic {
  imdbID: string;
}

export type SearchPayload =
  | SearchPayload_KnownMovie
  | SearchPayload_UnknownMovie;
