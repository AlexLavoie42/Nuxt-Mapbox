import { useNuxtApp } from "#app";
import { Ref } from "vue";
import { MapboxInstancesObject } from "../../module";
import { useState } from "#imports";

export function _useMapboxInstances(): Ref<MapboxInstancesObject> | null {
    // TODO: Move to pinia? Would have better debugger support.
    return process.server ? null : useState('mapbox_instances', () => ({}));
}
