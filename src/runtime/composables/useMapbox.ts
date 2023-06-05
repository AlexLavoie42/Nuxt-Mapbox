import { Map } from "mapbox-gl";
import { watch } from "vue";
import { useMapboxInstance } from "./useMapboxInstance";

type MapboxCallback = (map: Map) => void

export function useMapbox(mapID: string, callback: MapboxCallback): void {
    let ranCallback = false;

    function tryCallback(map: Map | null) {
        if (!map) return false;
        if (ranCallback) return true;

        if (map && map.isStyleLoaded()) {
            callback(map);
            ranCallback = true;
        }
        else if (map) {
            setTimeout(tryCallback, 200);
        }
        return true;
    }

    const map = useMapboxInstance(mapID);
    const loaded = tryCallback(map.value);
    if (loaded) return;

    watch(map, () => {
        if (map.value) {
            if (map.value.isStyleLoaded()) return callback(map.value);

            map.value.on('load', () => { callback(map.value as Map) });
        }
    })
}
