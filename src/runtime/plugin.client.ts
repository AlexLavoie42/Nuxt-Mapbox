import { ExtendedAppConfig } from '../module';
import { defineNuxtPlugin } from '#app'
import mapbox from "mapbox-gl"
import mapboxgl from 'mapbox-gl';

export default defineNuxtPlugin((nuxtApp) => {
    interface MapboxInstances {
        [key: string]: mapbox.Map
    }
    const mapbox_instances: Ref<MapboxInstances> = useState('mapbox_instances', () => {return {}})

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
