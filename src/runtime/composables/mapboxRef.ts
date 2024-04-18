import { Map } from "mapbox-gl";
import { _useMapboxInstances, computed, watch, type ComputedRef, type Ref } from "#imports";
import { computedWithControl, whenever } from "@vueuse/core";

export function useMapboxRef(mapID: string): ComputedRef<Map | undefined> {
    const instances = _useMapboxInstances();
    if (!instances) return computed(() => undefined);
    const map = computedWithControl(instances ,() => {
        const instance = _useMapboxInstances()?.value[mapID];
        console.log("changed")
        return instance?.map
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
