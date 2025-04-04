export interface Movie {
  id: string;
  url: string;
  primaryTitle: string;
  originalTitle: string;
  trailer: string;
  type: string;
  description: string;
  primaryImage: string;
  contentRating: string;
  startYear: number;
  endYear: number | null;
  releaseDate: string;
  interests: string[];
  countriesOfOrigin: string[];
  externalLinks: string[];
  spokenLanguages: string[];
  filmingLocations: string[];
  budget: number | null;
  grossWorldwide: number | null;
  genres: string[];
  isAdult: boolean;
  runtimeMinutes: number;
  averageRating: number;
  numVotes: number;
}

export interface MovieDetail extends Movie {
  directors: {
    id: string;
    url: string;
    fullName: string;
  }[];
  writers: {
    id: string;
    url: string;
    fullName: string;
  }[];
  cast: {
    id: string;
    url: string;
    fullName: string;
    job: string;
    characters: string[];
  }[];
}
