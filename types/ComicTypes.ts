import { Image } from "./CharacterTypes";
import {
  CharacterList,
  ComicSummary,
  CreatorList,
  EventList,
  SeriesSummary,
  StoryList,
} from "./ListTypes";

type ComicDate = {
  type: string;
  date: Date;
};
type ComicPrice = {
  type: string;
  price: number;
};

type Url = {
  type: string;
  url: string;
};

type TextObject = {
  type: string;
  language: string;
  text: string;
};

export type ComicType = {
  id: number;
  digitalId: number;
  title: string;
  issueNumber: number;
  variantDescription: string;
  description: string;
  modified: Date;
  isbn: string;
  upc: string;
  diamondCode: string;
  ean: string;
  issn: string;
  format: string;
  pageCount: number;
  textObjects: TextObject[];
  resourceURI: string;
  urls: Url[];
  series: SeriesSummary;
  variants: ComicSummary[];
  collections: ComicSummary[];
  collectedIssues: ComicSummary[];
  dates: ComicDate[];
  prices: ComicPrice[];
  thumbnail: Image;
  images: Image[];
  creators: CreatorList;
  characters: CharacterList;
  stories: StoryList;
  events: EventList;
};

type ComicDataContainer = {
  offset: number;
  limit: number;
  total: number;
  count: number;
  results: ComicType;
};

type ComicDataWrapper = {
  code: number;
  status: string;
  copyright: string;
  attributionText: string;
  attributionHTML: string;
  data: ComicDataContainer;
  etag: string;
};
