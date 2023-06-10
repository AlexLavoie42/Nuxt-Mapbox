<!-- eslint-disable vue/multi-word-component-names -->
<script setup lang="ts">
import { GeocoderOptions } from "@mapbox/mapbox-gl-geocoder";
import { ref, onMounted, useMapbox, inject, onUnmounted } from "#imports";

interface Props {
    options?: Omit<GeocoderOptions, "accessToken" | "mapboxgl">;
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
        useMapbox(mapId, (map) => {                
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
