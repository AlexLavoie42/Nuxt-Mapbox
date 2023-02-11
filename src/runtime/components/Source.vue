<script setup lang="ts">
    import { AnyLayer, AnySourceData } from 'mapbox-gl';
    interface Props {
        sourceId: string
        source: AnySourceData
    }
    const props = defineProps<Props>();

    const mapId = inject('MapID')
    
    function addLayer(){
      map.value.addSource(props.sourceId, props.source)
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