import { ComputedRef } from 'vue';
import { Map } from "mapbox-gl";
import { watch } from "#imports";
import { _useMapboxInstanceWithLoaded } from "./useMapboxInstance";

type MapboxCallback = (map: Map) => void

export function useMapbox(mapID: string, callback: MapboxCallback): void {
    let ranCallback = false;

    function tryCallback(instance: ComputedRef<{ map: mapboxgl.Map; loaded: boolean; } | null>) {
        if (!instance?.value?.map) return false;
        if (ranCallback) return true;

        if (instance.value.map && instance.value.loaded) {
            callback(instance.value.map);
            ranCallback = true;
        } else {
            instance.value.map.on("load", () => {
                tryCallback(instance);
            })
        }
        
        return true;
    }

    const mapboxInstance = _useMapboxInstanceWithLoaded(mapID);
    const callbackDone = tryCallback(mapboxInstance);
    if (callbackDone) return;

    watch(mapboxInstance, () => {
        if (mapboxInstance.value?.map) {
            tryCallback(mapboxInstance);
        }
    })
}
