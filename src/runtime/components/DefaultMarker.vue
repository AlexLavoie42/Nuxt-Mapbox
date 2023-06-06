<script setup lang="ts">
import { MarkerOptions, LngLatLike, Marker } from "mapbox-gl";
import { onUnmounted, defineMapboxMarker, onMounted, provide, ref, watch} from "#imports";

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
    markerRef.value = defineMapboxMarker(props.markerId, {...props.options, lnglat: props.lnglat});
    const marker = markerRef.value;

    if (props.lnglat) marker?.setLngLat(props.lnglat);

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
});

watch(() => props.lnglat, () => {
    markerRef.value?.setLngLat(props.lnglat);
});

watch(() => props.options, () => {
    if (props.options.draggable) markerRef.value?.setDraggable(props.options.draggable);
    if (props.options.offset) markerRef.value?.setOffset(props.options.offset);
    if (props.options.pitchAlignment) markerRef.value?.setPitchAlignment(props.options.pitchAlignment);
    if (props.options.rotationAlignment) markerRef.value?.setRotationAlignment(props.options.rotationAlignment);
    if (props.options.rotation) markerRef.value?.setRotation(props.options.rotation);
});
</script>

<template>
  <div />
  <slot />
</template>
