import { ref, Ref } from 'vue';
import { watch } from 'vue';
import { useNuxtApp } from '#app';
import { Marker, MarkerOptions } from "mapbox-gl";
import { inject } from 'vue';
import { useMapbox } from './useMapbox';



/**
 * Create a new Marker instance for a component. Will be automatically added to map if it is nested in MapboxMap
 * 
 * This overload adds the passed template ref to the marker. It has to pass a Ref since the Marker instance has to be created after html is mounted
 * 
 * You should set the marker properties through the callback, since you cannot normally access it before it is attached to map.
 * 
 * @param markerHTML Optionally pass a template ref to automatically put html inside marker
 * @param mapID Optionally pass the mapID manually. Will be auto injected if component is nested in MapboxMap
 */
export function defineMapboxMarker(
    markerID: string, options: MarkerOptions, markerHTML: Ref<HTMLElement | null>, callback?: (marker: Marker) => void, mapID?: string ): Ref<Marker | null> | undefined

/**
 * Create a new Marker instance for a component. Will be automatically added to map if it is nested in MapboxMap
 * 
 * @param mapID Optionally pass the mapID manually. Will be auto injected if component is nested in MapboxMap
 */
export function defineMapboxMarker(markerID: string, options: MarkerOptions, markerHTML?: undefined, callback?: undefined, mapID?: string ): Marker

export function defineMapboxMarker(markerID: string, options: MarkerOptions, markerHTML?: Ref<HTMLElement | null> | undefined, callback?: Function, mapID: string = ""): any {
    const mapId = inject<string>('MapID')
    if (!useNuxtApp().$mapboxInitMarker) return; // So we dont run on server.

    const markerRef = ref<Marker | null>(null)
    if (markerHTML) {
        watch(markerHTML, () => {
            if (markerHTML.value) {
                markerHTML.value.remove()

                useNuxtApp().$mapboxInitMarker(markerID, {element: markerHTML.value, ...options})
                markerRef.value = useNuxtApp().$mapboxMarkerInstances().value[markerID]
                if (callback)
                    callback(markerRef.value)

                useMapbox(mapId || mapID, (map) => {
                    if (markerRef.value)
                        markerRef?.value?.addTo(map)
                })
            }
        })
        return markerRef;
    } else {
        useNuxtApp().$mapboxInitMarker(markerID, options)
        const marker = useNuxtApp().$mapboxMarkerInstances().value[markerID]
    
        useMapbox(mapId || mapID, (map) => {
            marker.addTo(map)
        })
        return marker;
    }

}