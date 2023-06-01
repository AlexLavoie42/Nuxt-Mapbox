<script setup lang="ts">
import MapboxGeocoder, { GeocoderOptions, Result } from "@mapbox/mapbox-gl-geocoder";
import { ref, onMounted, watch } from "#imports";

interface Props {
    modelValue?: MapboxGeocoder.Result;
    options?: Omit<GeocoderOptions, "accessToken">;
}
const props = withDefaults(defineProps<Props>(), { options: () => ({}), modelValue: undefined });

const emit = defineEmits<{ 
    (e: "update:modelValue", result: MapboxGeocoder.Result ): void
    (e: "change", event: Event): void,
    (e: "keydown", event: Event): void
}>();

const geocoderInput = ref<HTMLElement>();
const customInputContainer = ref<HTMLElement>();

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
    //@ts-ignore
    const defaultContainer = geocoder.container as HTMLElement;
    defaultInput.addEventListener("change", (e) => {
        emit("change", e);
    });
    defaultInput.addEventListener("keydown", (e) => {
        emit("keydown", e);
    });

    geocoder.on("result", (e: { result: Result }) => {
        emit("update:modelValue", e.result);
    });

    watch(() => props.modelValue, (result: Result) => {
        geocoder.setInput(result.place_name);
    });

    const customInputs = customInputContainer.value?.querySelectorAll("input");
    if (customInputs) {
        customInputs.forEach((input) => {
            geocoder.on("result", (e: { result: Result }) => {
                input.value = e.result.place_name
            })

        })
    }

});
</script>

<template>
  <div ref="geocoderInput" />
  <slot ref="customInputContainer" />
</template>
