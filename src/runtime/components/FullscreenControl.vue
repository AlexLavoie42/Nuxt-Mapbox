<script setup lang="ts">
import { FullscreenControl, FullscreenControlOptions } from 'mapbox-gl';

    interface Props {
        options: FullscreenControlOptions
    }
    const props = defineProps<Props>();

    const mapId = inject('MapID')

    function addControl(){
        map.value.addControl(new FullscreenControl(props.options))
    }
    
    const map = useMapbox(mapId)
    watch(map, () => {
      if (map.value)
        map.value.on('load', addControl)
    })
</script>

<template>
  <div>
    <slot />
  </div>
</template>