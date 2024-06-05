import { Marker } from "mapbox-gl";
import { watch } from "#imports";
import { useMapboxMarkerRef } from './mapboxMarkerRef';

export function useMapboxMarker(markerID: string, callback: (marker: Marker) => void) {
    const marker = useMapboxMarkerRef(markerID);
    if (!marker.value) {
        watch(() => marker.value, () => {
            if (marker.value) {
                callback(marker.value);
            }
        })
    } else {
        callback(marker.value);
    }
}