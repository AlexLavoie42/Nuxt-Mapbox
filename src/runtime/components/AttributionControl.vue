<script setup lang="ts">
import { AttributionControl } from 'mapbox-gl';
    interface AttributionControlOptions {
        compact?: boolean
        customAttribution?: string | Array<string>
    }

    interface Props {
        options: AttributionControlOptions
    }
    const props = defineProps<Props>();

    const mapId = inject('MapID')
    
    function addControl(){
        map.value.addControl(new AttributionControl(props.options))
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