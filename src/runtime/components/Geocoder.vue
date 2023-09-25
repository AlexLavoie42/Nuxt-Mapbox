<!-- eslint-disable vue/multi-word-component-names -->
<script setup lang="ts">
import { default as mapboxgl } from 'mapbox-gl'
import { ref, onMounted, useMapbox, inject, onUnmounted, initMapbox } from "#imports";
import '@mapbox/mapbox-gl-geocoder/dist/mapbox-gl-geocoder.css'

async function initGeocoder() {
    if (process.client) {
        //@ts-ignore TODO: Get geocoder module import working
        const MapboxGeocoder = await import('https://api.mapbox.com/mapbox-gl-js/plugins/mapbox-gl-geocoder/v5.0.0/mapbox-gl-geocoder.min.js');
        initMapbox();
    }
}
const geocoderPromise = initGeocoder();

interface Props {
    options?: Omit<MapboxGeocoder.GeocoderOptions, "accessToken" | "mapboxgl">;
    position?: "top-left" | "top-right" | "bottom-left" | "bottom-right";
}
const props = withDefaults(defineProps<Props>(), { 
    options: () => ({}),
    position: () => "top-right"
});
const geocoderRef = ref<MapboxGeocoder>();
const mapId = inject<string>("MapID");
const containerRef = ref<HTMLDivElement>();

if (mapId) {
    onMounted(() => {
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

</script>

<template>
  <div ref="containerRef">
    <slot />
  </div>
</template>
