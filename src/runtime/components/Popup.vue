<script setup lang="ts">
import { Popup, PopupOptions } from 'mapbox-gl';

    interface Props {
        options: PopupOptions
    }
    const props = defineProps<Props>();

    const mapId = inject('MapID')

    function addControl(){
        map.value.addControl(new Popup(props.options))
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