<script setup lang="ts">
    import { FullscreenControl, FullscreenControlOptions } from 'mapbox-gl';
    import { inject } from 'vue';
    import { useMapbox } from '../composables/useMapbox';

    interface Props {
        options: FullscreenControlOptions
    }
    const props = defineProps<Props>();

    const mapId = inject<string>('MapID')
    if (!mapId) throw "Mapbox Controls must be placed inside a Map component"


    useMapbox(mapId, (map) => {
        function addControl(){
            map?.addControl(new FullscreenControl(props.options))
        }

        map.on('load', addControl)
    })
</script>

<template>
  <div>
    <slot />
  </div>
</template>