<script setup lang="ts">
import { useMapbox, inject, onMounted, ref } from "#imports";

interface NavigationControlOptions {
    showCompass?: boolean;
    showZoom?: boolean;
    visualizePitch?: boolean;
}
interface Props {
    options?: NavigationControlOptions;
    position?: "top-left" | "top-right" | "bottom-left" | "bottom-right";
}
const props = withDefaults(defineProps<Props>(), {
    options: () => ({}),
    position: () => "top-right",
});

const mapId = inject<string>("MapID");
if (!mapId) throw "Mapbox Controls must be placed inside a Map component";

const controlRef = ref<mapboxgl.NavigationControl>();

onMounted(() => {
    useMapbox(mapId, (map) => {
        function addControl() {
            //@ts-ignore
            const control = new mapboxgl.NavigationControl(props.options)
            controlRef.value = control;

            map?.addControl(
                control,
                props.position
            );
        }

        map.on("load", addControl);
    });
});

onMounted(() => {
    useMapbox(mapId, (map) => {
        if (controlRef.value) map.removeControl(controlRef.value);
    })
})
</script>

<template>
  <div>
    <slot />
  </div>
</template>
