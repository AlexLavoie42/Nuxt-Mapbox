<script setup lang="ts">
  import { AnyLayer, AnySourceData } from 'mapbox-gl';
import { watch } from 'vue';
    interface Props {
        sourceId: string
        source: AnySourceData
        layer: AnyLayer
    }
    const props = defineProps<Props>();

    const mapId = inject('MapID')
    
    function addLayer(){
      map.value.addSource(props.sourceId, props.source)
      map.value.addLayer(props.layer)
    }
    
    const map = useMapbox(mapId)
    watch(map, () => {
      if (map.value)
        map.value.on('load', addLayer)
    })
</script>

<template>
  <div>
    <slot />
  </div>
</template>