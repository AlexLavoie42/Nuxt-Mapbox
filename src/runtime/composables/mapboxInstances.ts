import type { Ref } from "vue";
import type { MapboxInstancesObject } from "../../module";
import { shallowRef, useState } from "#imports";

export function _useMapboxInstances(): Ref<MapboxInstancesObject> | undefined {
    // TODO: Move to pinia? Would have better debugger support.
    return process.server ? undefined : useState('mapbox_instances', () => shallowRef({}));
}
