<script setup lang="ts">
import { type LngLatLike, Marker, Popup, type PopupOptions } from "mapbox-gl";
import { type Ref } from "vue";
import { onUnmounted, onMounted, defineMapboxPopup, inject, ref, watch } from "#imports";

const props = withDefaults(
    defineProps<{ popupId: string; options?: PopupOptions; lnglat: LngLatLike, text?: string }>(),
    { options: () => ({}), text: undefined }
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
        if (props.lnglat) popup?.setLngLat(props.lnglat);
        popup?.on("open", () => {
            emit("open", popup);
        });
        popup?.on("close", () => {
            emit("close", popup);
        });
        
        if (props.text) popup?.setText(props.text);
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

// TODO: Move to defineMapboxPopup
watch(() => props.lnglat, () => {
    if (props.lnglat) popupRef.value?.setLngLat(props.lnglat);
});

watch(() => props.options, () => {
    if (props.options.offset) popupRef.value?.setOffset(props.options.offset);
    if (props.options.maxWidth) popupRef.value?.setMaxWidth(props.options.maxWidth);
});

watch(() => props.text, () => {
    if (props.text) popupRef.value?.setText(props.text);
});
</script>

<template>
  <div
    ref="popupTemplate"
    hidden
  >
    <slot />
  </div>
</template>
