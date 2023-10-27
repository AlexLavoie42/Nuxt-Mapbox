import { watchOnce } from '@vueuse/core';
import type { ComputedRef } from 'vue';
import { Map } from "mapbox-gl";
import { _useMapboxInstanceWithLoaded } from "#imports";

type MapboxCallback = (map: Map) => void

/**
 * Executes a callback function when the Mapbox instance with the specified map ID is available & loaded.
 * 
 * if you need access to the map before load be sure to use `useMapboxBeforeLoad` instead
 *
 * @param {string} mapID - The ID of the Mapbox map.
 * @param {MapboxCallback} callback - The callback function to be executed when the Mapbox map is available.
 */
export function useMapbox(mapID: string, callback: MapboxCallback): void {

    function tryCallback(instance: ComputedRef<{ map: mapboxgl.Map; loaded: boolean; } | undefined>) {
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

