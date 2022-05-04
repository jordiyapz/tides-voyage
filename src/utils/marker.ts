import { RawMarker, MarkerType, Marker } from "../types";

type MarkerDictItem = Pick<Marker, "name" | "color" | "shortLabel">;

export const markerDict: { [key in MarkerType]: MarkerDictItem } = {
  "chest-common": {
    name: "Common chest",
    color: "green",
    shortLabel: "C",
  },
  "chest-rare": {
    name: "Rare chest",
    color: "blue",
    shortLabel: "R",
  },
  "chest-epic": {
    name: "Epic chest",
    color: "purple",
    shortLabel: "E",
  },
  "fishing-tournament": {
    name: "Fishing Tournament",
    color: "cyan",
    shortLabel: "F",
  },
};

export const markerTypes = Object.keys(markerDict) as MarkerType[];

export function getRandomMarker() {
  return {
    type: markerTypes[Math.floor(Math.random() * markerTypes.length)],
    x: Math.floor(Math.random() * 6000 - 3000),
    y: Math.floor(Math.random() * 6000 - 3000),
  };
}
