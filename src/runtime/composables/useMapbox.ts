import { Map } from "mapbox-gl";
import { watch } from "vue";
import { useMapboxInstance } from "./useMapboxInstance";

type MapboxCallback = (map: Map) => void

export function useMapbox(mapID: string, callback: MapboxCallback): void {
    const map = useMapboxInstance(mapID);
    if (map.value) return callback(map.value);

    watch(map, () => {
        if (map.value) callback(map.value)
    })
}
