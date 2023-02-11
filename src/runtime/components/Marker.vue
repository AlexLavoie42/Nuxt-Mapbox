<script setup lang="ts">
import { Marker, MarkerOptions } from 'mapbox-gl';

    interface Props {
        options: MarkerOptions
    }
    const props = defineProps<Props>();

    const mapId = inject('MapID')

    function addControl(){
        map.value.addControl(new Marker(props.options))
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