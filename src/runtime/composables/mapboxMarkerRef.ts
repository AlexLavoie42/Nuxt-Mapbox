import { type Ref, computed } from 'vue';
import { Marker } from "mapbox-gl";
import { useState } from "#imports";
import type { MapboxMarkerObject } from '../utils/types';

export function useMapboxMarkerRef(markerID: string): Ref<Marker | null> {
    return computed(() => {
        const mapbox_marker_instances: Ref<MapboxMarkerObject> = useState('mapbox_marker_instances', () => {return {}});
        return mapbox_marker_instances.value[markerID];
    });
}