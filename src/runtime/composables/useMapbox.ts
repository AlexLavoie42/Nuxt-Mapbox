import { Map } from "mapbox-gl";
import { useMapboxInstances } from "./useMapboxInstances";
import { computed, ComputedRef } from "vue"

export function useMapbox(key: string): ComputedRef<Map | null>{
    const map = computed(() => {
        return useMapboxInstances()?.value[key] || null
    })
    return map
}
