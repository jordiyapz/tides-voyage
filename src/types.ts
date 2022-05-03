export type MarkerType =
  | "chest-common"
  | "chest-rare"
  | "chest-epic"
  | "fishing-tournament";

export type Marker = {
  type: MarkerType;
  x: number;
  y: number;
  postedBy?: string;
};
