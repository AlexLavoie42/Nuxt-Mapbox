import { watchOnce } from '@vueuse/core';
import { ComputedRef } from 'vue';
import { Map } from "mapbox-gl";
import { _useMapboxInstanceWithLoaded, watch } from "#imports";

type MapboxCallback = (map: Map) => void

export function useMapbox(mapID: string, callback: MapboxCallback): void {

    function tryCallback(instance: ComputedRef<{ map: mapboxgl.Map; loaded: boolean; } | null>) {
        if (!instance?.value?.map) return false;

        if (instance.value.map && instance.value.loaded) {
            callback(instance.value.map);
        } else {
            watchOnce(() => instance.value?.loaded, () => {
                if (instance.value?.loaded) {
                    callback(instance.value.map);
                }
            })
        }
        
        return true;
    }

    const mapboxInstance = _useMapboxInstanceWithLoaded(mapID);
    const callbackDone = tryCallback(mapboxInstance);
    if (callbackDone) return;

    watchOnce(mapboxInstance, () => {
        if (mapboxInstance.value?.map) {
            tryCallback(mapboxInstance);
        }
    })
}

