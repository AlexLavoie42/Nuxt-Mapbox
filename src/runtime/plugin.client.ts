import { ExtendedAppConfig } from '../module';
import { defineNuxtPlugin, useAppConfig, useState } from '#app'
import mapbox from "mapbox-gl"
import mapboxgl from 'mapbox-gl';
import { Ref } from 'vue';

export interface MapboxInstancesObject {
    [key: string]: mapbox.Map
}
export interface MapboxPopupsObject {
  [key: string]: mapbox.Popup
}
export interface MapboxMarkerObject {
  [key: string]: mapbox.Marker
}

export default defineNuxtPlugin((nuxtApp) => {
    const mapbox_instances: Ref<MapboxInstancesObject> = useState('mapbox_instances', () => {return {}})
    const mapbox_popup_instances: Ref<MapboxPopupsObject> = useState('mapbox_popup_instances', () => {return {}})
    const mapbox_marker_instances: Ref<MapboxMarkerObject> = useState('mapbox_marker_instances', () => {return {}})

    const appConfig = useAppConfig() as ExtendedAppConfig
    
    mapboxgl.accessToken = appConfig._MAPBOX_API_KEY;


    return {
      provide: {
          mapboxInit: (key: string, options: mapbox.MapboxOptions = {container: key}) => {
            mapbox_instances.value[key] = new mapbox.Map(options)
          },
          mapboxInstances: () => mapbox_instances,

          mapboxInitPopup: (key: string, options: mapbox.PopupOptions) => {
            mapbox_popup_instances.value[key] = new mapbox.Popup(options)
          },
          mapboxPopupInstances: () => mapbox_popup_instances,

          mapboxInitMarker: (key: string, options: mapbox.MarkerOptions) => {
            mapbox_marker_instances.value[key] = new mapbox.Marker(options)
          },
          mapboxMarkerInstances: () => mapbox_marker_instances,
      }
    }
})
