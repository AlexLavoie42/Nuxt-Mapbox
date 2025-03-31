import type { Ref } from "vue";
import { shallowRef } from "#imports";
import type { MapboxInstancesObject } from "../utils/types";

const mapbox_instances = shallowRef({})

export function _useMapboxInstances(): Ref<MapboxInstancesObject> | undefined {
    // TODO: Move to pinia? Would have better debugger support.
    return import.meta.server ? undefined : mapbox_instances;
}
