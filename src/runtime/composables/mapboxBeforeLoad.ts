import { watch, useMapboxInstance } from "#imports";
import { Map } from "mapbox-gl";

type MapboxCallback = (map: Map) => void

export function useMapboxBeforeLoad(mapID: string, callback: MapboxCallback): void {
    const map = useMapboxInstance(mapID);
    if (map.value) return callback(map.value);

    watch(map, () => {
        if (map.value) {
            map.value.on('load', () => { callback(map.value as Map) });
        }
    })
}
