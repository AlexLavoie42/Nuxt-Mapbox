import { ExtendedAppConfig } from '../module';
import { defineNuxtPlugin, useAppConfig, useState } from '#app'
import mapbox from "mapbox-gl"
import mapboxgl from 'mapbox-gl';
import { Ref } from 'vue';
export interface MapboxInstancesObject {
    [key: string]: mapbox.Map
}

export default defineNuxtPlugin((nuxtApp) => {
    const mapbox_instances: Ref<MapboxInstancesObject> = useState('mapbox_instances', () => {return {}})

    const appConfig = useAppConfig() as ExtendedAppConfig
    
    mapboxgl.accessToken = appConfig._MAPBOX_API_KEY;


    return {
      provide: {
          mapboxInit: (key: string, options: mapbox.MapboxOptions = {container: key}) => {
            mapbox_instances.value[key] = new mapbox.Map(options)
          },
          mapboxInstances: () => mapbox_instances
      }
    }
})
