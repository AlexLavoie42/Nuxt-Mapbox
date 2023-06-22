import { Ref, computed } from 'vue';
import { Popup } from "mapbox-gl";
import { useNuxtApp } from "#imports";

export function useMapboxPopupRef(markerID: string): Ref<Popup | null> {
    return computed(() => {
        const marker = useNuxtApp().$mapboxPopupInstances().value[markerID];
        return marker;
    });
}