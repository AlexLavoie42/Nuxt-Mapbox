import { Ref, computed } from 'vue';
import { Marker } from "mapbox-gl";
import { useNuxtApp, watch } from "#imports";
import { useMapboxMarkerRef } from './mapboxMarkerRef';

export function useMapboxMarker(markerID: string, callback: (marker: Marker) => void) {
    const marker = useMapboxMarkerRef(markerID);
    if (!marker.value) {
        watch(marker, () => {
            if (marker.value) {
                callback(marker.value);
            }
        })
    } else {
        callback(marker.value);
    }
}