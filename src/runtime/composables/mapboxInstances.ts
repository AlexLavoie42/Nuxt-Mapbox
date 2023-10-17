import { Ref } from "vue";
import { MapboxInstancesObject } from "../../module";
import { useState } from "#imports";

export function _useMapboxInstances(): Ref<MapboxInstancesObject> | undefined {
    // TODO: Move to pinia? Would have better debugger support.
    return process.server ? undefined : useState('mapbox_instances', () => ({}));
}
