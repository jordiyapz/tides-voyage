import { Marker, RawMarker } from "../types";
import { markerDict } from "./marker";

// Turns out this is not quite right.
// I guess I will refactor this into simple function and put it in utils/markers.ts instead.
// Something like, umm, maybe `enhanceRawMarker` should be good enough.
class MarkerFactory {
  static enhance(rawMarker: RawMarker): Marker {
    return { ...rawMarker, ...markerDict[rawMarker.type] };
  }
}

export default MarkerFactory;
