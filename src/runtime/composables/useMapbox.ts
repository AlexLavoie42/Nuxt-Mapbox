import { Map } from "mapbox-gl";
import { watch } from "vue";
import { _useMapboxInstance } from "./useMapboxInstance";

type MapboxCallback = (map: Map) => void

export function useMapbox(key: string, callback: MapboxCallback): void {
    const map = _useMapboxInstance(key);
    if (map.value) return callback(map.value);

    watch(map, () => {
        if (map.value) callback(map.value)
    })
}
