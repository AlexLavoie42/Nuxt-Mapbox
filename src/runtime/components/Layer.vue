<!-- eslint-disable vue/multi-word-component-names -->
<script setup lang="ts">
    import { AnyLayer, AnySourceData } from 'mapbox-gl';
    import { inject } from 'vue';
    import { useMapbox } from '../composables/useMapbox';
    interface Props {
        sourceId: string
        source?: AnySourceData
        layer: AnyLayer
    }
    const props = defineProps<Props>();
    
    const mapId = inject<string>('MapID')
    if (!mapId) throw "Mapbox Controls must be placed inside a Map component"
    
    useMapbox(mapId, (map) => {
        function addLayer() {
            // TODO: Use computed & watch here instead of polling
            if (!map?.getSource(props.sourceId)) {
              setTimeout(addLayer, 50);
              return;
            }
          
            map?.addLayer(props.layer)
        }
        function addSource() {
          if (props.source)
            map?.addSource(props.sourceId, props.source)
        }

        map.on('load', () => {
          addSource();
          addLayer();
        });
    })
</script>

<template>
  <div>
    <slot />
  </div>
</template>