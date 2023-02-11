import { useNuxtApp } from "#app";
import { Ref } from "vue";
import { MapboxInstancesObject } from "../plugin.client";

export function _useMapboxInstances(): Ref<MapboxInstancesObject> | null {
    const instances = useNuxtApp().$mapboxInstances;
    return instances ? instances() : null;
}
