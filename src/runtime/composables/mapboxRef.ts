import { Map } from "mapbox-gl";
import { _useMapboxInstances, type ComputedRef, type Ref } from "#imports";
import { computedWithControl } from "@vueuse/core";

export function useMapboxRef(mapID: string): Ref<Map | undefined>{
    const map = computedWithControl(() => _useMapboxInstances(), () => {
        return _useMapboxInstances()?.value[mapID]?.map
    })

    return map
}

export function useMapboxInstance(mapID: string): Ref<Map | undefined>{
    return useMapboxRef(mapID);
}

export function _useMapboxInstanceWithLoaded(mapID: string): ComputedRef<{ map: Map, loaded: boolean } | undefined>{
    const map = computedWithControl(() => _useMapboxInstances(), () => {
        return _useMapboxInstances()?.value[mapID]
    })
    return map
}

export function cleanMapboxInstance(mapID: string): void {
    _useMapboxInstances()?.value[mapID].map?.remove();
    delete _useMapboxInstances()?.value[mapID];
}
