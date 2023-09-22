import { useMapboxInstance, initMapbox, _useMapboxInstances } from "#imports"
import {default as mapboxgl} from 'mapbox-gl'

export function defineMapboxInstance(key: string, options: mapboxgl.MapboxOptions = {container: key}) {
    initMapbox();
    const mapbox_instances = _useMapboxInstances();
    if (!mapbox_instances) return;

    mapbox_instances.value[key] = {map: new mapboxgl.Map(options), loaded: false};
    mapbox_instances.value[key].map.on("load", () => {
      mapbox_instances.value[key].loaded = true;
    })
    return useMapboxInstance(key)
}