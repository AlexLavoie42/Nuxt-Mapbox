<!-- eslint-disable vue/multi-word-component-names -->
<script setup lang="ts">
    import { AnySourceData } from 'mapbox-gl';
    import { inject } from 'vue';
    import { useMapbox } from '../composables/useMapbox';
    
    interface Props {
        sourceId: string
        source: AnySourceData
    }
    const props = defineProps<Props>();

    const mapId = inject<string>('MapID')
    if (!mapId) throw "Mapbox Source must be placed inside a Map component"
    
    
    useMapbox(mapId, (map) => {
        function addLayer(){
          map?.addSource(props.sourceId, props.source)
        }

        map.on('load', addLayer)
    })
</script>

<template>
  <div>
    <slot />
  </div>
</template>