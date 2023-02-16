import { Map } from "mapbox-gl";
import { _useMapboxInstances } from "./useMapboxInstances";
import { computed, ComputedRef } from "vue"

export function useMapboxInstance(mapID: string): ComputedRef<Map | null>{
    const map = computed(() => {
        return _useMapboxInstances()?.value[mapID] || null
    })
    return map
}
