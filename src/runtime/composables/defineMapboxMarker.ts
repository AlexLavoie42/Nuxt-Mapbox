import { Ref } from 'vue';
import { inject, isRef, onUnmounted, ref, useMapbox, useMapboxMarkerRef, useNuxtApp, watch } from '#imports';
import { MarkerOptions, Marker } from 'mapbox-gl';



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
    markerID: string,
    options: MarkerOptions & { lnglat: mapboxgl.LngLatLike } | Ref<MarkerOptions & { lnglat: mapboxgl.LngLatLike }>,
    markerHTML: Ref<HTMLElement | null>,
    callback?: (marker: Marker) => void,
    mapID?: string ): Ref<Marker | null> | undefined

/**
 * Create a new Marker instance for a component. Will be automatically added to map if it is nested in MapboxMap
 * 
 * @param mapID Optionally pass the mapID manually. Will be auto injected if component is nested in MapboxMap
 */
export function defineMapboxMarker(markerID: string,
    options: MarkerOptions & { lnglat: mapboxgl.LngLatLike } | Ref<MarkerOptions & { lnglat: mapboxgl.LngLatLike }>,
    markerHTML?: undefined,
    callback?: undefined, mapID?: string ): Marker

//TODO: MutationObserver on html so it is reactive
export function defineMapboxMarker(markerID: string, options: MarkerOptions & { lnglat: mapboxgl.LngLatLike } | Ref<MarkerOptions & { lnglat: mapboxgl.LngLatLike }>, markerHTML?: Ref<HTMLElement | null> | undefined, callback?: Function, mapID: string = ""): any {
    if (!useNuxtApp().$mapboxInitMarker) return; // So we dont run on server.
    const markerRef = ref<Marker | null>(null);
    const mapId = inject<string>('MapID')

    function initMarker() {
        const markerOptions = isRef(options) ? options.value : options;
        if (markerHTML) {
            if (markerHTML.value) {
                markerHTML.value.remove()
    
                useNuxtApp().$mapboxInitMarker(markerID, {element: markerHTML.value, ...markerOptions})
                markerRef.value = useNuxtApp().$mapboxMarkerInstances().value[markerID]
                if (callback)
                    callback(markerRef.value)
    
                useMapbox(mapId || mapID, (map) => {
                    if (markerRef.value)
                        markerRef?.value?.addTo(map)
                })
            }
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
            useNuxtApp().$mapboxInitMarker(markerID, markerOptions)
            const marker = useNuxtApp().$mapboxMarkerInstances().value[markerID]
        
            useMapbox(mapId || mapID, (map) => {
                marker.setLngLat(markerOptions.lnglat);
                marker.addTo(map);
            })
            return marker;
        }
    }

    if (isRef(options)) {
        watch(options, (newOptions, oldOptions) => {
            const currentMarker = useMapboxMarkerRef(markerID);
            if (newOptions.draggable !== oldOptions?.draggable && newOptions.draggable !== undefined) {
                currentMarker.value?.setDraggable(newOptions.draggable);
            }
            if (newOptions.offset !== oldOptions?.offset && newOptions.offset !== undefined) {
                currentMarker.value?.setOffset(newOptions.offset);
            }
            if (newOptions.pitchAlignment !== oldOptions?.pitchAlignment && newOptions.pitchAlignment !== undefined) {
                currentMarker.value?.setPitchAlignment(newOptions.pitchAlignment);
            }
            if (newOptions.rotationAlignment !== oldOptions?.rotationAlignment && newOptions.rotationAlignment !== undefined) {
                currentMarker.value?.setRotationAlignment(newOptions.rotationAlignment);
            }
            if (newOptions.rotation !== oldOptions?.rotation && newOptions.rotation !== undefined) {
                currentMarker.value?.setRotation(newOptions.rotation);
            }
            if (newOptions.lnglat !== oldOptions?.lnglat) {
                currentMarker.value?.setLngLat(newOptions.lnglat);
            }
        }, { deep: true });
    }

    onUnmounted(() => {
        const currentMarker = useMapboxMarkerRef(markerID);
        if (currentMarker.value) {
            currentMarker.value.remove();
            delete useNuxtApp().$mapboxMarkerInstances().value[markerID];
        }
    })
    return initMarker();
}