type ComicSummary = {
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
  type: string; // Adding 'type' property as mentioned in StorySummary
};

export type StoryList = ListType<StorySummary>;

type EventSummary = {
  resourceURI: string;
  name: string;
};

export type EventList = ListType<EventSummary>;

type SeriesSummary = {
  resourceURI: string;
  name: string;
};

export type SeriesList = ListType<SeriesSummary>;
