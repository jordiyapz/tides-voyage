export type MarkerType =
  | "chest-common"
  | "chest-rare"
  | "chest-epic"
  | "fishing-tournament";

export interface RawMarker {
  readonly key: string;
  readonly type: MarkerType;
  readonly x: number;
  readonly y: number;
  readonly postedBy: string;
}

export interface Marker extends RawMarker {
  readonly name: string;
  readonly color: string;
  readonly shortLabel: string;
}

export type MinimalMarker = Pick<RawMarker, "type" | "x" | "y">;
