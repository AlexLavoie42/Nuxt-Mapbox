import { type Ref, computed } from 'vue';
import { Popup } from "mapbox-gl";
import { useState } from "#imports";
import type { MapboxPopupsObject } from '../../module';

export function useMapboxPopupRef(markerID: string): Ref<Popup> {
    return computed(() => {
        const popupInstances = useState<MapboxPopupsObject>('mapbox_popup_instances', () => {return {}});
        const marker = popupInstances.value[markerID];
        return marker;
    });
}