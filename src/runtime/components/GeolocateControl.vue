<script setup lang="ts">
import { GeolocateControl, type GeolocateControlOptions } from "mapbox-gl";
import { ref, inject, useMapbox, onUnmounted, } from "#imports";

interface Props {
    options?: GeolocateControlOptions;
    position?: "top-left" | "top-right" | "bottom-left" | "bottom-right";
}
const props = withDefaults(defineProps<Props>(), {
    options: () => ({}),
    position: () => "top-right",
});

const emit = defineEmits<{
    (e: "geolocate", control: GeolocateControl): void;
    (e: "error", control: GeolocateControl): void;
    (e: "outofmaxbounds", control: GeolocateControl): void;
    (e: "trackuserlocationstart", control: GeolocateControl): void;
    (e: "trackuserlocationend", control: GeolocateControl): void;
}>();

const mapId = inject<string>("MapID");
if (!mapId) throw "Mapbox Controls must be placed inside a Map component";

const geolocateRef = ref<GeolocateControl>();

useMapbox(mapId, (map) => {
    const geolocate = new GeolocateControl(props.options);
    geolocateRef.value = geolocate;

    map?.addControl(geolocate, props.position);
    
    geolocate.on("geolocate", () => {
        emit("geolocate", geolocate);
    });
    geolocate.on("error", () => {
        emit("error", geolocate);
    });
    geolocate.on("outofmaxbounds", () => {
        emit("outofmaxbounds", geolocate);
    });
    geolocate.on("trackuserlocationstart", () => {
        emit("trackuserlocationstart", geolocate);
    });
    geolocate.on("trackuserlocationend", () => {
        emit("trackuserlocationend", geolocate);
    });
});

onUnmounted(() => {
    useMapbox(mapId, (map) => {
        if (geolocateRef.value) map.removeControl(geolocateRef.value);
    })
})
</script>

<template>
  <div>
    <slot />
  </div>
</template>
