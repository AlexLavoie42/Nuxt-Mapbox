<script setup lang="ts">
import { AttributionControl } from 'mapbox-gl'
import { useMapbox, inject, onMounted } from "#imports";

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

onMounted(() => {
    useMapbox(mapId, (map) => {
        function addControl() {
            map?.addControl(
                new AttributionControl(props.options),
                props.position
            );
        }

        map.on("load", addControl);
    });
});
</script>

<template>
  <div>
    <slot />
  </div>
</template>
