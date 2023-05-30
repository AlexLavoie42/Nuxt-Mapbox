<!-- eslint-disable vue/multi-word-component-names -->
<script setup lang="ts">
    import { AnySourceData } from 'mapbox-gl';
    import { inject, onMounted } from 'vue';
    import { useMapbox } from '../composables/useMapbox';
    
    interface Props {
        sourceId: string
        source: AnySourceData
    }
    const props = defineProps<Props>();

    const mapId = inject<string>('MapID')
    if (!mapId) throw "Mapbox Source must be placed inside a Map component"
    
    onMounted(() => {
      useMapbox(mapId, (map) => {
          function addLayer(){
            map?.addSource(props.sourceId, props.source)
          }

          addLayer();
      })
    })

</script>

<template>
  <div>
    <slot />
  </div>
</template>