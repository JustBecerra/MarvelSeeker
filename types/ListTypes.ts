export type ListType = {
  available: number;
  returned: number;
  collectionURI: string;
  items: Summary[];
};

type Summary = {
  resourceURI: string;
  name: string;
};
