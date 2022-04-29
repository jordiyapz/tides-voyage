import { onChildAdded, onChildRemoved, ref } from "firebase/database";
import { useEffect, useState } from "react";
import { database } from "../firebase";
import { Marker } from "../types";

export const useMarker = (day: string) => {
  const markerListRef = ref(database, "markers/" + day);
  const [markerList, setMarkerList] = useState<{ [key: string]: Marker }>({});
  const markers = Object.values(markerList) as Marker[];

  // Attach marker event listeners
  useEffect(() => {
    onChildAdded(markerListRef, (data) => {
      if (data.key) {
        setMarkerList((md) => ({ ...md, [data.key ?? ""]: data.val() }));
      }
    });
    onChildRemoved(markerListRef, (data) => {
      setMarkerList((md) => {
        const newMarkerDict = { ...md };
        if (data.key) delete newMarkerDict[data.key];
        return newMarkerDict;
      });
    });
  }, [markerListRef]);

  return {
    markers,
    markerList,
  };
};
