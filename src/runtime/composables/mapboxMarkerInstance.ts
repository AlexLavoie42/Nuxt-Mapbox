import { Ref, computed } from 'vue';
import { Marker } from "mapbox-gl";
import { useNuxtApp } from "#imports";

export function useMapboxMarkerInstance(markerID: string): Ref<Marker> {
    return computed(() => {
        const marker = useNuxtApp().$mapboxMarkerInstances().value[markerID];
        return marker;
    });
}