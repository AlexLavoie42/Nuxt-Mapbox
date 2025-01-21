import type { Ref } from "vue";
import type { MapboxInstancesObject } from "../../module";
import { shallowRef } from "#imports";

const mapbox_instances = shallowRef({})

export function _useMapboxInstances(): Ref<MapboxInstancesObject> | undefined {
    // TODO: Move to pinia? Would have better debugger support.
    return import.meta.server ? undefined : mapbox_instances;
}
