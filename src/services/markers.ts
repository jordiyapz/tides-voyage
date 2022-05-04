import { push, ref, remove, set } from "firebase/database";
import { database } from "../firebase";
import { MinimalMarker } from "../types";

export const addMarker = (
  day: string,
  marker: MinimalMarker,
  postedBy: string
) => {
  const markerRef = ref(database, "markers/" + day);
  return set(push(markerRef), { ...marker, postedBy });
};

export const removeMarker = (day: string, key: string) => {
  const markerRef = ref(database, `markers/${day}/${key}`);
  return remove(markerRef);
};
