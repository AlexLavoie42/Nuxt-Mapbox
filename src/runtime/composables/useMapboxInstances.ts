import { Map } from "mapbox-gl";
import { MapboxInstances } from "../plugin.client";

export function useMapboxInstances(key: string): Ref<MapboxInstances> | null {
    const instances = useNuxtApp().$mapboxInstances;
    return instances ? instances() : null;
}
