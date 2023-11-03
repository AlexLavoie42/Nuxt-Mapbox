import { whenever } from '@vueuse/core';
import type { Ref } from 'vue';
import { inject, isRef, onUnmounted, ref, useMapbox, useMapboxMarker, useMapboxMarkerRef, useState, watch } from '#imports';
import mapboxgl, { type MarkerOptions, Marker } from 'mapbox-gl';
import type { MapboxMarkerObject } from '../../module';



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
    if (process.server) return;
    const markerRef = ref<Marker | null>(null);
    const mapId = inject<string>('MapID')

    function initMarker() {
        const markerOptions = isRef(options) ? options.value : options;
        if (markerHTML) {
            whenever(markerHTML, () => {
                if (markerHTML.value) {
                    markerHTML.value.remove();

                    const mapbox_marker_instances: Ref<MapboxMarkerObject> = useState('mapbox_marker_instances', () => {return {}});
                    mapbox_marker_instances.value[markerID] = new mapboxgl.Marker({element: markerHTML.value, ...markerOptions});
                    markerRef.value = mapbox_marker_instances.value[markerID];

                    if (callback) callback(markerRef.value);

                    useMapbox(mapId || mapID, (map) => {
                        if (markerRef.value)
                            markerRef?.value?.setLngLat(markerOptions.lnglat).addTo(map);
                    });
                }
            }, { immediate: true })
            return markerRef;
        } else {
            const mapbox_marker_instances: Ref<MapboxMarkerObject> = useState('mapbox_marker_instances', () => {return {}});
            mapbox_marker_instances.value[markerID] = new mapboxgl.Marker(markerOptions);
            const marker = mapbox_marker_instances.value[markerID]
        
            useMapbox(mapId || mapID, (map) => {
                marker.setLngLat(markerOptions.lnglat).addTo(map);
            })
            return marker;
        }
    }

    if (isRef(options)) {
        // TODO: Watch marker properties and update options ref
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

        useMapboxMarker(markerID, (marker) => {
            marker.on('drag', () => {
                const newLngLat = marker.getLngLat();
                if (Array.isArray(options.value.lnglat)) {
                    options.value.lnglat = newLngLat.toArray() as [number, number];
                } else {
                    options.value.lnglat = newLngLat;
                }
            })
        })
    }

    onUnmounted(() => {
        const currentMarker = useMapboxMarkerRef(markerID);
        if (currentMarker.value) {
            currentMarker.value.remove();
            const mapbox_marker_instances: Ref<MapboxMarkerObject> = useState('mapbox_marker_instances', () => {return {}});
            delete mapbox_marker_instances.value[markerID];
        }
    })
    return initMarker();
}
