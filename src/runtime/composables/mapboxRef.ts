import { Map } from "mapbox-gl";
import { _useMapboxInstances, computed, ref, shallowRef, triggerRef, watch, type ComputedRef, type Ref } from "#imports";

export function useMapboxRef(mapID: string): Ref<Map | undefined> {
    const instances = _useMapboxInstances();
    if (!instances) return ref();
    const map = shallowRef(instances.value[mapID]?.map);
    watch(instances, () => {
        map.value = instances.value[mapID]?.map
        triggerRef(map)
    });
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
    // _useMapboxInstances()?.value[mapID].map?.remove();
    delete _useMapboxInstances()?.value[mapID];
}
