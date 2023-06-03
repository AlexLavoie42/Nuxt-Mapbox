<script setup lang="ts">
import { MarkerOptions, LngLatLike, Marker } from "mapbox-gl";
import { defineMapboxMarker } from "../composables/defineMapboxMarker";
import { onMounted, provide, ref } from "vue";
import { onUnmounted } from "nuxt/dist/app/compat/capi";

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
    markerRef.value = defineMapboxMarker(props.markerId, props.options);
    const marker = markerRef.value;

    marker?.setLngLat(props.lnglat);

    marker?.on("dragstart", () => {
        emit("dragstart", marker);
    });
    marker?.on("drag", () => {
        emit("drag", marker);
    });
    marker?.on("dragstart", () => {
        emit("dragstart", marker);
    });
});

onUnmounted(() => {
    markerRef.value?.remove();
})
</script>

<template>
  <div />
  <slot />
</template>
