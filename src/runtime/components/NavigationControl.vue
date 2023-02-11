<script setup lang="ts">
import { NavigationControl } from 'mapbox-gl';
    interface NavigationControlOptions {
        showCompass?: boolean;
        showZoom?: boolean;
        visualizePitch?: boolean;
    }
    interface Props {
        options: NavigationControlOptions
    }
    const props = defineProps<Props>();

    const mapId = inject('MapID')

    function addControl(){
        map.value.addControl(new NavigationControl(props.options))
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