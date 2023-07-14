<script setup lang="ts">
import { MarkerOptions, LngLatLike, Marker } from "mapbox-gl";
import { onUnmounted, defineMapboxMarker, onMounted, provide, ref, watch, useNuxtApp, computed} from "#imports";

const props = withDefaults(
    defineProps<{ markerId: string; options?: MarkerOptions; lnglat: LngLatLike }>(),
    { options: () => ({}) }
);

const emit = defineEmits<{
    (e: "dragstart", marker: Marker): void;
    (e: "drag", marker: Marker): void;
    (e: "dragend", marker: Marker): void;
}>();

const markerRef = ref<Marker>();
provide("MarkerRef", markerRef);

onMounted(() => {
    markerRef.value = defineMapboxMarker(props.markerId, computed(() => ({...props.options, lnglat: props.lnglat})));
    const marker = markerRef.value;

    if (props.lnglat) marker?.setLngLat(props.lnglat);

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
