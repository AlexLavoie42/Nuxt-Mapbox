import { ExtendedAppConfig } from '../module';
import { defineNuxtPlugin, useAppConfig, useState } from '#app'
import mapboxgl from 'mapbox-gl';
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
    
    mapboxgl.accessToken = appConfig._MAPBOX_API_KEY;


    return {
      provide: {
          mapboxInit: (key: string, options: mapboxgl.MapboxOptions = {container: key}) => {
            mapbox_instances.value[key] = new mapboxgl.Map(options)
          },
          mapboxInstances: () => mapbox_instances,

          mapboxInitPopup: (key: string, options: mapboxgl.PopupOptions) => {
            mapbox_popup_instances.value[key] = new mapboxgl.Popup(options)
          },
          mapboxPopupInstances: () => mapbox_popup_instances,

          mapboxInitMarker: (key: string, options: mapboxgl.MarkerOptions) => {
            mapbox_marker_instances.value[key] = new mapboxgl.Marker(options)
          },
          mapboxMarkerInstances: () => mapbox_marker_instances,
      }
    }
})
