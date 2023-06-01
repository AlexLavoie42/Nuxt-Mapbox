<script setup lang="ts">
import { GeocoderOptions, Result } from "@mapbox/mapbox-gl-geocoder";
import { ref, onMounted } from "#imports";

interface Props {
    options?: Omit<GeocoderOptions, "accessToken">;
}
const props = withDefaults(defineProps<Props>(), { options: () => ({}) });

const emit = defineEmits<{ 
    (e: "change", event: Event): void,
    (e: "keydown", event: Event): void
    (e: "result", event: { result: Result }): void
}>();

const geocoderInput = ref<HTMLElement>();
onMounted(() => {
    //@ts-ignore
    const geocoder = new MapboxGeocoder({
        //@ts-ignore
        accessToken: mapboxgl.accessToken,
        //@ts-ignore
        mapboxgl,
        //@ts-ignore
        ...props.options,
    });

    if (geocoderInput.value) geocoder.addTo(geocoderInput.value);

    //@ts-ignore Using private variables here
    const defaultInput = geocoder._inputEl as HTMLElement;

    defaultInput.addEventListener("change", (e) => {
        emit("change", e);
    });
    defaultInput.addEventListener("keydown", (e) => {
        emit("keydown", e);
    });

    geocoder.on("result", (e: { result: Result }) => {
        emit("result", e);
    });

});
</script>

<template>
  <div ref="geocoderInput">
    <slot />
  </div>
</template>
