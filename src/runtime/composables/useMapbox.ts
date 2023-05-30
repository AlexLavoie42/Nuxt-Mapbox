import { Map } from "mapbox-gl";
import { watch } from "vue";
import { useMapboxInstance } from "./useMapboxInstance";

type MapboxCallback = (map: Map) => void

export function useMapbox(mapID: string, callback: MapboxCallback): void {
    const map = useMapboxInstance(mapID);
    if (map.value && map.value.loaded()) return callback(map.value);
    else if (map.value) map.value.on('load', () => callback(map.value as Map));

    watch(map, () => {
        if (map.value) {
            if (map.value.loaded()) return callback(map.value);

            map.value.on('load', () => { callback(map.value as Map) });
        }
    })
}
