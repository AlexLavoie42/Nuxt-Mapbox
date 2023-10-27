import { Map } from "mapbox-gl";
import { _useMapboxInstances } from "#imports";
import { computed, type ComputedRef, type Ref } from "vue"

export function useMapboxRef(mapID: string): Ref<Map | undefined>{
    const map = computed(() => {
        return _useMapboxInstances()?.value[mapID]?.map
    })
    return map
}

export function useMapboxInstance(mapID: string): Ref<Map | undefined>{
    return useMapboxRef(mapID);
}

export function _useMapboxInstanceWithLoaded(mapID: string): ComputedRef<{ map: Map, loaded: boolean } | undefined>{
    const map = computed(() => {
        return _useMapboxInstances()?.value[mapID]
    })
    return map
}

export function cleanMapboxInstance(mapID: string): void {
    _useMapboxInstances()?.value[mapID].map?.remove();
    delete _useMapboxInstances()?.value[mapID];
}
