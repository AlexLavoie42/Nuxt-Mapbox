import { Map } from "mapbox-gl";
import { _useMapboxInstances } from "#imports";
import { computed, ComputedRef, Ref } from "vue"

export function useMapboxRef(mapID: string): Ref<Map | null>{
    const map = computed(() => {
        return _useMapboxInstances()?.value[mapID]?.map || null
    })
    return map
}

export function useMapboxInstance(mapID: string): Ref<Map | null>{
    return useMapboxRef(mapID);
}

export function _useMapboxInstanceWithLoaded(mapID: string): ComputedRef<{ map: Map, loaded: boolean } | null>{
    const map = computed(() => {
        return _useMapboxInstances()?.value[mapID] || null
    })
    return map
}

export function cleanMapboxInstance(mapID: string): void {
    _useMapboxInstances()?.value[mapID].map?.remove();
    delete _useMapboxInstances()?.value[mapID];
}
