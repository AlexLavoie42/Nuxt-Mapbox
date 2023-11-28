<script setup lang="ts">
import { AttributionControl } from 'mapbox-gl'
import { useMapbox, inject, onMounted, onUnmounted, ref } from "#imports";

interface AttributionControlOptions {
    compact?: boolean;
    customAttribution?: string | Array<string>;
}

interface Props {
    options?: AttributionControlOptions;
    position?: "top-left" | "top-right" | "bottom-left" | "bottom-right";
}
const props = withDefaults(defineProps<Props>(), {
    options: () => ({}),
    position: () => "top-right",
});

const mapId = inject<string>("MapID");
if (!mapId) throw "Mapbox Controls must be placed inside a Map component";

const controlRef = ref<AttributionControl>();

onMounted(() => {
    useMapbox(mapId, (map) => {
        function addControl() {
            const control = new AttributionControl(props.options)
            controlRef.value = control;
            map?.addControl(
                control,
                props.position
            );
        }

        map.on("load", addControl);
    });
});

onUnmounted(() => {
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
