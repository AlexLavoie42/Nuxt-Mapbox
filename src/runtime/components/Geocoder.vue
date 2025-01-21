<!-- eslint-disable vue/multi-word-component-names -->
<script setup lang="ts">
import { default as mapboxgl } from 'mapbox-gl'
import { ref, onMounted, useMapbox, inject, onUnmounted, initMapbox } from "#imports";
import '@mapbox/mapbox-gl-geocoder/dist/mapbox-gl-geocoder.css'

const emit = defineEmits<{
    (e: "update:modelValue", result: MapboxGeocoder.Result | undefined ): void
    (e: "clear"): void;
    (e: "loading", query: any): void;
    (e: "results", results: MapboxGeocoder.Result[]): void;
    (e: "result", result: MapboxGeocoder.Result): void;
    (e: "error", error: string): void;
}>();

async function initGeocoder() {
    if (import.meta.client) {
        //@ts-ignore TODO: Get geocoder module import working
        const MapboxGeocoder = await import('https://api.mapbox.com/mapbox-gl-js/plugins/mapbox-gl-geocoder/v5.0.0/mapbox-gl-geocoder.min.js');
        initMapbox();
    }
}
const geocoderPromise = initGeocoder();

interface Props {
    modelValue?: MapboxGeocoder.Result;
    options?: Omit<MapboxGeocoder.GeocoderOptions & { version?: 'v5' | 'v6' }, "accessToken" | "mapboxgl">;
    position?: "top-left" | "top-right" | "bottom-left" | "bottom-right";
}
const props = withDefaults(defineProps<Props>(), {
    modelValue: undefined,
    options: () => ({}),
    position: () => "top-right"
});
const geocoderRef = ref<MapboxGeocoder>();
const mapId = inject<string>("MapID");
const containerRef = ref<HTMLDivElement>();

if (mapId) {
    useMapbox(mapId, async (map) => {
        await geocoderPromise;
        //@ts-ignore TODO: Figure out typing while getting around #2
        const geocoder = new MapboxGeocoder({
            //@ts-ignore
            accessToken: mapboxgl.accessToken,
            //@ts-ignore
            mapboxgl,
            ...props.options,
        })
        geocoderRef.value = geocoder;
        map?.addControl(geocoder, props.position);
        geocoder.on('clear', () => {
            emit("update:modelValue", undefined);
            emit("clear");
        });
        geocoder.on('loading', (q) => {
            emit("loading", q);
        });
        geocoder.on('results', (r) => {
            emit("results", r.features);
        });
        geocoder.on('result', (r) => {
            emit("update:modelValue", r.result);
            emit("result", r.result);
        });
        geocoder.on('error', (e) => {
            emit("error", e);
        });
    });
    onUnmounted(() => {
        useMapbox(mapId, (map) => {
            if (geocoderRef.value) map?.removeControl(geocoderRef.value);
        })
    })
} else {
    onMounted(() => {
        if (containerRef.value) {
            //@ts-ignore TODO: Figure out typing while getting around #2
            const geocoder = new MapboxGeocoder({
                //@ts-ignore
                accessToken: mapboxgl.accessToken,
                //@ts-ignore
                mapboxgl,
                ...props.options,
            })
            geocoderRef.value = geocoder;
            geocoder.addTo(containerRef.value);
        }
    });
}

defineExpose({
    geocoder: geocoderRef,
})

</script>

<template>
  <div ref="containerRef">
    <slot />
  </div>
</template>
