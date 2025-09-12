import { useMapboxInstance, initMapbox, _useMapboxInstances, ref, shallowReactive, triggerRef, toRef } from "#imports"
import {default as mapboxgl} from 'mapbox-gl'

export function defineMapboxInstance(key: string, options: mapboxgl.MapboxOptions = {container: key}) {
    initMapbox();
    const mapbox_instances = _useMapboxInstances();
    if (!mapbox_instances) return ref();
    if (mapbox_instances.value[key]) {
        console.warn(`Mapbox instance with key '${key}' was initialized multiple times. This can cause unexpected behaviour.`);
        return useMapboxInstance(key)
    }
    mapbox_instances.value[key] = shallowReactive({ map: new mapboxgl.Map(options), loaded: false });
    const mapInstance = mapbox_instances.value[key];
    mapInstance.map.on("load", () => {
      mapInstance.loaded = true;
      triggerRef(mapbox_instances)
      if (mapInstance) {
        triggerRef(toRef(mapInstance))
      }
    });

    mapInstance.map.on("style.load", () => {
      mapInstance.loaded = true;
      triggerRef(mapbox_instances)
      if (mapInstance) {
        triggerRef(toRef(mapInstance))
      }
    });

    mapInstance.map.on("idle", () => {
      triggerRef(mapbox_instances)
      if (mapInstance) {
        triggerRef(toRef(mapInstance))
      }
    });

    mapInstance.map.on("data", () => {
      triggerRef(mapbox_instances)
      if (mapInstance) {
        triggerRef(toRef(mapInstance))
      }
    });
    return useMapboxInstance(key)
}