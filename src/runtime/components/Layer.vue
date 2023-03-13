<!-- eslint-disable vue/multi-word-component-names -->
<script setup lang="ts">
    import { AnyLayer, AnySourceData, MapMouseEvent } from 'mapbox-gl';
    import { inject } from 'vue';
    import { useMapbox } from '../composables/useMapbox';
    interface Props {
        sourceId: string
        source?: AnySourceData
        layer: AnyLayer
    }
    const props = defineProps<Props>();

    const emit = defineEmits<{  
      (e: 'mousedown', event: MapMouseEvent): void
      (e: 'mouseup', event: MapMouseEvent): void
      (e: 'mouseover', event: MapMouseEvent): void
      (e: 'mousemove', event: MapMouseEvent): void
      (e: 'click', event: MapMouseEvent): void
      (e: 'dblclick', event: MapMouseEvent): void
      (e: 'mouseenter', event: MapMouseEvent): void
      (e: 'mouseleave', event: MapMouseEvent): void
    }>()
    
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

        map.on('mousedown', props.layer.id, (e) => { emit('mousedown', e) })
        map.on('mouseup', props.layer.id, (e) => { emit('mouseup', e) })
        map.on('mouseover', props.layer.id, (e) => { emit('mouseover', e) })
        map.on('mousemove', props.layer.id, (e) => { emit('mousemove', e) })
        map.on('click', props.layer.id, (e) => { emit('click', e) })
        map.on('dblclick', props.layer.id, (e) => { emit('dblclick', e) })
        map.on('mouseenter', props.layer.id, (e) => { emit('mouseenter', e) })
        map.on('mouseleave', props.layer.id, (e) => { emit('mouseleave', e) })
    })
</script>

<template>
  <div>
    <slot />
  </div>
</template>