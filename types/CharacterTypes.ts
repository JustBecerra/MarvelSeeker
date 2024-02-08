import { ComicList, EventList, SeriesList, StoryList } from "./ListTypes";

type Image = {
  path: string;
  extension: string;
};

type Url = {
  type: string;
  url: string;
};

export type CharacterType = {
  id: number;
  name: string;
  description: string;
  modified: Date;
  resourceURI: string;
  urls: Url[];
  thumbnail: Image;
  stories: StoryList;
  comics: ComicList;
  events: EventList;
  series: SeriesList;
};

export type CharacterDataContainer = {
  offset?: number;
  limit?: number;
  total?: number;
  count?: number;
  results?: CharacterType[];
};

export type CharacterDataWrapper = {
  code?: number;
  status?: string;
  attributionText?: string;
  attributionHTML?: string;
  data?: CharacterDataContainer;
  etag?: string;
};
