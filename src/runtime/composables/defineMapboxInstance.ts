import { useMapboxInstance, initMapbox, _useMapboxInstances, ref, shallowReactive, shallowRef, triggerRef, isShallow, markRaw } from "#imports"
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
    mapbox_instances.value[key].map.on("load", () => {
      mapbox_instances.value[key].loaded = true;
      triggerRef(mapbox_instances)
      triggerRef(mapbox_instances.value[key])
    })

    mapbox_instances.value[key].map.on("idle", () => {
      triggerRef(mapbox_instances)
      triggerRef(mapbox_instances.value[key])
    })
    mapbox_instances.value[key].map.on("data", () => {
      triggerRef(mapbox_instances)
      triggerRef(mapbox_instances.value[key])
    })
    return useMapboxInstance(key)
}