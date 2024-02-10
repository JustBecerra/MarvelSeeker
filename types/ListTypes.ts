export type ComicSummary = {
  resourceURI: string;
  name: string;
};

type ListType<T> = {
  available: number;
  returned: number;
  collectionURI: string;
  items: T[];
};

export type ComicList = ListType<ComicSummary>;

type StorySummary = {
  resourceURI: string;
  name: string;
  type: string;
};

export type StoryList = ListType<StorySummary>;

type EventSummary = {
  resourceURI: string;
  name: string;
};

export type CharacterList = ListType<CharacterSummary>;

type CharacterSummary = {
  resourceURI: string;
  name: string;
  role: string;
};

export type CreatorList = ListType<CreatorSummary>;

type CreatorSummary = {
  resourceURI: string;
  name: string;
  role: string;
};

export type EventList = ListType<EventSummary>;

export type SeriesSummary = {
  resourceURI: string;
  name: string;
};

export type SeriesList = ListType<SeriesSummary>;
