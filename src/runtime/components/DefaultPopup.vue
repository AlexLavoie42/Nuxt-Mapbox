<script setup lang="ts">
import { LngLatLike, Marker, Popup, PopupOptions } from "mapbox-gl";
import { Ref, inject, ref, watch } from "vue";
import { defineMapboxPopup } from "../composables/defineMapboxPopup";
import { onUnmounted, onMounted } from "#imports";

const props = withDefaults(
    defineProps<{ popupId: string; options?: PopupOptions; lnglat: LngLatLike }>(),
    { options: () => ({}) }
);
const popupTemplate = ref<HTMLElement | null>(null);

const emit = defineEmits<{
    (e: "open", popup: Popup): void;
    (e: "close", popup: Popup): void;
}>();

const markerRef = inject<Ref<Marker> | null>("MarkerRef", null);
const popupRef = ref<Popup>();

onMounted(() => {
    const popup = defineMapboxPopup(props.popupId, props.options, popupTemplate);
    popupRef.value = popup;

    if (popup) {
        popup?.setLngLat(props.lnglat);
        popup?.on("open", () => {
            emit("open", popup);
        });
        popup?.on("close", () => {
            emit("close", popup);
        });
    }

    if (markerRef) {
        if (markerRef.value) {
            markerRef.value.setPopup(popup);
        } else {
            watch(markerRef, () => {
                if (markerRef.value) {
                    markerRef.value.setPopup(popup);
                }
            });
        }
    }
});

onUnmounted(() => {
    popupRef.value?.remove();
});
</script>

<template>
  <div ref="popupTemplate">
    <slot />
  </div>
</template>
