<!-- eslint-disable vue/multi-word-component-names -->
<script setup lang="ts">
    
    import MapboxGeocoder from '@mapbox/mapbox-gl-geocoder';
    import { inject, watch } from 'vue';
    import { useMapbox } from '../composables/useMapbox';

    interface Props {
        options: MapboxGeocoder.GeocoderOptions
    }
    const props = defineProps<Props>();

    const mapId = inject<string>('MapID')
    if (!mapId) throw "Mapbox Controls must be placed inside a Map component"

    function addControl(){
        map.value?.addControl(new MapboxGeocoder(props.options))
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