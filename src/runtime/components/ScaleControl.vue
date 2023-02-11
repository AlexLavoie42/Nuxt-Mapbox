<script setup lang="ts">
    import { ScaleControl } from 'mapbox-gl';

    interface Props {
        options: {
            maxWidth?: number;
            unit?: string;
        }
    }
    const props = defineProps<Props>();

    const mapId = inject('MapID')

    function addControl(){
        map.value.addControl(new ScaleControl(props.options))
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