export const markerTypes = [
  "chest-common",
  "chest-rare",
  "chest-epic",
  "fishing-tournament",
] as const;
export type MarkerType = typeof markerTypes[number];

export type Marker = { type: MarkerType; x: number; y: number };
