import { Map } from "mapbox-gl";
import { useMapboxInstances } from "./useMapboxInstances";
import {Ref} from "vue"

export function useMapbox(key: string): Ref<Map> | null {
    const map = computed(() => {
        return useMapboxInstances()?.value[key]
    })
    return map
}
