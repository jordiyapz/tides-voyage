import { onChildAdded, onChildRemoved, ref } from "firebase/database";
import { useEffect, useState } from "react";
import { database } from "../firebase";
import { Marker, RawMarker } from "../types";
import MarkerFactory from "../utils/MarkerFactory";

export const useMarker = (day: string) => {
  const [markers, setMarkerList] = useState<Marker[]>([]);

  // Attach marker event listeners
  useEffect(() => {
    const markerListRef = ref(database, "markers/" + day);

    const unsubChildAdded = onChildAdded(markerListRef, (data) => {
      if (data.key !== null) {
        const newRawMarker = { key: data.key, ...data.val() };
        const newMarker = MarkerFactory.enhance(newRawMarker);
        setMarkerList((md) => [...md, newMarker]);
      }
    });

    const unsubChildRemoved = onChildRemoved(markerListRef, (data) => {
      setMarkerList((md) => md.filter((marker) => marker.key !== data.key));
    });

    return () => {
      unsubChildRemoved();
      unsubChildAdded();
    };
  }, [day]);

  return { markers };
};
