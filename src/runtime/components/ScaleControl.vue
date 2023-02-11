<script setup lang="ts">
    import { ScaleControl } from 'mapbox-gl';
    import { inject, watch } from 'vue';
    import { useMapbox } from '../composables/useMapbox';

    interface Props {
        options: {
            maxWidth?: number;
            unit?: string;
        }
    }
    const props = defineProps<Props>();

    const mapId = inject<string>('MapID')
    if (!mapId) throw "Mapbox Controls must be placed inside a Map component"

    function addControl(){
        map.value?.addControl(new ScaleControl(props.options))
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