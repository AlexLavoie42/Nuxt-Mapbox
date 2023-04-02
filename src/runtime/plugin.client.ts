import { ExtendedAppConfig } from '../module';
import { defineNuxtPlugin, useAppConfig, useState } from '#app'
// import mapboxgl from 'mapbox-gl'
// import { Map, MapboxOptions, PopupOptions, Popup, MarkerOptions, Marker } from 'mapbox-gl';
import { Ref } from 'vue';

export interface MapboxInstancesObject {
    [key: string]: mapboxgl.Map
}
export interface MapboxPopupsObject {
  [key: string]: mapboxgl.Popup
}
export interface MapboxMarkerObject {
  [key: string]: mapboxgl.Marker
}

export default defineNuxtPlugin((nuxtApp) => {
    const mapbox_instances: Ref<MapboxInstancesObject> = useState('mapbox_instances', () => {return {}})
    const mapbox_popup_instances: Ref<MapboxPopupsObject> = useState('mapbox_popup_instances', () => {return {}})
    const mapbox_marker_instances: Ref<MapboxMarkerObject> = useState('mapbox_marker_instances', () => {return {}})

    const appConfig = useAppConfig() as ExtendedAppConfig
    //@ts-ignore
    mapboxgl.accessToken = appConfig._MAPBOX_CONFIG.accessToken;
    //@ts-ignore
    if (appConfig._MAPBOX_CONFIG.baseApiUrl) mapboxgl.baseApiUrl = appConfig._MAPBOX_CONFIG.baseApiUrl;
    //@ts-ignore
    if (appConfig._MAPBOX_CONFIG.workerUrl) mapboxgl.workerUrl = appConfig._MAPBOX_CONFIG.workerUrl;
    //@ts-ignore
    if (appConfig._MAPBOX_CONFIG.workerCount) mapboxgl.workerCount = appConfig._MAPBOX_CONFIG.workerCount;
    //@ts-ignore
    if (appConfig._MAPBOX_CONFIG.prewarm) mapboxgl.prewarm();

    return {
      provide: {
          mapboxInit: (key: string, options: mapboxgl.MapboxOptions = {container: key}) => {
            //@ts-ignore
            mapbox_instances.value[key] = new mapboxgl.Map(options)
          },
          mapboxInstances: () => mapbox_instances,

          mapboxInitPopup: (key: string, options: mapboxgl.PopupOptions) => {
            //@ts-ignore
            mapbox_popup_instances.value[key] = new mapboxgl.Popup(options)
          },
          mapboxPopupInstances: () => mapbox_popup_instances,

          mapboxInitMarker: (key: string, options: mapboxgl.MarkerOptions) => {
            //@ts-ignore
            mapbox_marker_instances.value[key] = new mapboxgl.Marker(options)
          },
          mapboxMarkerInstances: () => mapbox_marker_instances,
      }
    }
})
