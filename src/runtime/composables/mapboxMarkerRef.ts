import { Ref, computed } from 'vue';
import { Marker } from "mapbox-gl";
import { useNuxtApp } from "#imports";

export function useMapboxMarkerRef(markerID: string): Ref<Marker | null> {
    return computed(() => {
        const marker = useNuxtApp().$mapboxMarkerInstances().value[markerID];
        return marker;
    });
}