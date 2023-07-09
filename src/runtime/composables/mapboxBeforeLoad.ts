import { useMapboxInstance } from "#imports";
import { watchOnce } from "@vueuse/core";
import { Map } from "mapbox-gl";

type MapboxCallback = (map: Map) => void

export function useMapboxBeforeLoad(mapID: string, callback: MapboxCallback): void {
    const map = useMapboxInstance(mapID);
    if (map.value) return callback(map.value);

    watchOnce(map, () => {
        if (map.value) {
            callback(map.value as Map)
        }
    })
}
