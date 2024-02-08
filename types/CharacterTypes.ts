import { ListType } from "./ListTypes";

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
  stories: ListType;
  comics: ListType;
  events: ListType;
  series: ListType;
};
