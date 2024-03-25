import type { Ref } from "vue";
import type { MapboxInstancesObject } from "../../module";
import { useState } from "#imports";

export function _useMapboxInstances(): Ref<MapboxInstancesObject> | undefined {
    // TODO: Move to pinia? Would have better debugger support.
    return import.meta.server ? undefined : useState('mapbox_instances', () => ({}));
}
