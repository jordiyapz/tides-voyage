import { Marker, MarkerType } from "../types";

type MarkerDictItem = {
  id: string;
  label: string;
  color: string;
  shortLabel: string;
};

export const markerDict: { [key in MarkerType]: MarkerDictItem } = {
  "chest-common": {
    id: "chest-common",
    label: "Common chest",
    color: "green",
    shortLabel: "C",
  },
  "chest-rare": {
    id: "chest-rare",
    label: "Rare chest",
    color: "blue",
    shortLabel: "R",
  },
  "chest-epic": {
    id: "chest-epic",
    label: "Epic chest",
    color: "purple",
    shortLabel: "E",
  },
  "fishing-tournament": {
    id: "fishing-tournament",
    label: "Fishing Tournament",
    color: "cyan",
    shortLabel: "F",
  },
};

export const markerTypes = Object.keys(markerDict) as MarkerType[];

export function getRandomMarker(): Marker {
  return {
    type: markerTypes[Math.floor(Math.random() * markerTypes.length)],
    x: Math.floor(Math.random() * 6000 - 3000),
    y: Math.floor(Math.random() * 6000 - 3000),
  };
}
