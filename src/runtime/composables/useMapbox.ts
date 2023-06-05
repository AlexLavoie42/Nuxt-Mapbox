import { Map } from "mapbox-gl";
import { watch } from "vue";
import { useMapboxInstance } from "./useMapboxInstance";

type MapboxCallback = (map: Map) => void

let callbackStack: MapboxCallback[] = [];

export function useMapbox(mapID: string, callback: MapboxCallback): void {
    function tryCallbacks(map: Map | null): boolean {
        if (map && map.isStyleLoaded()) {
            callbackStack.forEach(cb => cb(map as Map));
            callbackStack = [];
            return true;
        }
        else if (map) {
            setTimeout(tryCallbacks, 200);
            return true;
        }
        return false;
    }

    callbackStack.push(callback);
    const map = useMapboxInstance(mapID);
    
    const isLoaded = tryCallbacks(map.value);
    if (!isLoaded) {
        watch(map, tryCallbacks)
    }
}
