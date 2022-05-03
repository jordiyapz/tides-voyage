import { onChildAdded, onChildRemoved, ref } from "firebase/database";
import { useEffect, useState } from "react";
import { database } from "../firebase";
import { Marker } from "../types";

export const useMarker = (day: string) => {
  const [markerList, setMarkerList] = useState<{ [key: string]: Marker }>({});
  const markers = Object.values(markerList) as Marker[];

  // Attach marker event listeners
  useEffect(() => {
    const markerListRef = ref(database, "markers/" + day);

    const unsubChildAdded = onChildAdded(markerListRef, (data) => {
      if (data.key) {
        setMarkerList((md) => ({ ...md, [data.key ?? ""]: data.val() }));
      }
    });

    const unsubChildRemoved = onChildRemoved(markerListRef, (data) => {
      setMarkerList((md) => {
        const newMarkerDict = { ...md };
        if (data.key) delete newMarkerDict[data.key];
        return newMarkerDict;
      });
    });

    return () => {
      unsubChildRemoved();
      unsubChildAdded();
    };
  }, [day]);

  return {
    markers,
    markerList,
  };
};
