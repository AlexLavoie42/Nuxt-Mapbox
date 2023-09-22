import { Ref, computed } from 'vue';
import { Popup } from "mapbox-gl";
import { useNuxtApp, useState } from "#imports";
import { MapboxPopupsObject } from '../../module';

export function useMapboxPopupRef(markerID: string): Ref<Popup | null> {
    return computed(() => {
        const popupInstances = useState<MapboxPopupsObject>('mapbox_popup_instances', () => {return {}});
        const marker = popupInstances.value[markerID];
        return marker;
    });
}