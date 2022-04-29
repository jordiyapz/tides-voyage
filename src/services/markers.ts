import { push, ref, remove, set } from "firebase/database";
import { database } from "../firebase";
import { Marker } from "../types";

export const addMarker = (day: string, marker: Marker) => {
  const markerRef = ref(database, "markers/" + day);
  return set(push(markerRef), marker);
};

export const removeMarker = (day: string, id: string) => {
  const markerRef = ref(database, `markers/${day}/${id}`);
  return remove(markerRef);
};
