<script setup lang="ts">
import { type MarkerOptions, type LngLatLike, Marker } from "mapbox-gl";
import { defineMapboxMarker, onMounted, provide, ref, watch } from "#imports";
import { useVModel } from "@vueuse/core";

const props = withDefaults(
    defineProps<{ markerId: string; options?: MarkerOptions; lnglat: LngLatLike }>(),
    { options: () => ({}) }
);

const emit = defineEmits<{
    (e: "dragstart", marker: Marker): void;
    (e: "drag", marker: Marker): void;
    (e: "dragend", marker: Marker): void;
    (e: "update:lnglat", lnglat: LngLatLike): void;
}>();

const lnglat = useVModel(props, "lnglat", emit);

const markerRef = ref<Marker>();
provide("MarkerRef", markerRef);

const newOptions = ref({...props.options, lnglat: lnglat.value})

watch(() => newOptions.value.lnglat, () => {
    lnglat.value = newOptions.value.lnglat;
});

watch(() => props.options, () => {
    newOptions.value = {...props.options, lnglat: lnglat.value}
});

onMounted(() => {
    markerRef.value = defineMapboxMarker(props.markerId, newOptions);
    const marker = markerRef.value;

    if (lnglat) marker?.setLngLat(lnglat.value);

    marker?.on("dragstart", () => {
        emit("dragstart", marker);
    });
    marker?.on("drag", () => {
        emit("drag", marker);
    });
    marker?.on("dragend", () => {
        emit("dragend", marker);
    });
});
</script>

<template>
  <div />
  <slot />
</template>
