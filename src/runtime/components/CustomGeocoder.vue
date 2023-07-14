<script setup lang="ts">
import { default as mapboxgl } from 'mapbox-gl'
import { ref, onMounted, onBeforeMount } from "#imports";
import '@mapbox/mapbox-gl-geocoder/dist/mapbox-gl-geocoder.css'
import { GeocoderOptions, Result } from '@mapbox/mapbox-gl-geocoder';

onBeforeMount(async () => {
    //@ts-ignore TODO: Get geocoder module import working
    const MapboxGeocoder = await import('https://api.mapbox.com/mapbox-gl-js/plugins/mapbox-gl-geocoder/v5.0.0/mapbox-gl-geocoder.min.js')
})

interface Props {
    modelValue?: MapboxGeocoder.Result;
    options?: Omit<GeocoderOptions, "accessToken" | "mapboxgl">;
}
const props = withDefaults(defineProps<Props>(), { options: () => ({}), modelValue: undefined });

const emit = defineEmits<{ 
    (e: "update:modelValue", result: MapboxGeocoder.Result ): void
    (e: "change", event: Event): void,
    (e: "keydown", event: Event): void
}>();

const geocoderInput = ref<HTMLElement>();
const customInputContainer = ref<HTMLElement>();

const geocoderRef = ref<MapboxGeocoder>();

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

    geocoderRef.value = geocoder;

    if (geocoderInput.value) geocoder.addTo(geocoderInput.value);

    //@ts-ignore Using private variables here
    const defaultInput = geocoder._inputEl as HTMLInputElement;
    //@ts-ignore
    const defaultContainer = geocoder.container as HTMLElement;
    //@ts-ignore
    const keyDown = geocoder._typeahead.handleKeyDown.bind(geocoder._typeahead);

    defaultInput.addEventListener("change", (e) => {
        emit("change", e);
    });
    defaultInput.addEventListener("keydown", (e) => {
        emit("keydown", e);
    });

    geocoder.on("result", (e: { result: Result }) => {
        emit("update:modelValue", e.result);
    });

    const customInputs = customInputContainer.value?.querySelectorAll("input");
    if (customInputs) {
        customInputs.forEach((input) => {
            geocoder.on("result", (e: { result: Result }) => {
                input.value = e.result.place_name
            })

            defaultInput.addEventListener("change", (e) => {
                input.value = (e.target as HTMLInputElement)?.value;
            })

            defaultInput.addEventListener("keydown", (e) => {
                input.value = (e.target as HTMLInputElement)?.value;
            })

            input.addEventListener('input', (e) => {
                geocoder.setInput((e.target as HTMLInputElement)?.value);
            });
            input.addEventListener('keydown', keyDown)
        })
    }

});

watch(() => props.modelValue, () => {
    geocoderRef.value?.setInput(props.modelValue?.place_name || "");
});
</script>

<template>
  <div ref="geocoderInput" />
  <div ref="customInputContainer">
    <slot />
  </div>
</template>
