<script setup lang="ts">
import { GeolocateControl } from 'mapbox-gl';
    interface GeolocateControlOptions {
        positionOptions?: mapboxgl.PositionOptions;
        fitBoundsOptions?: mapboxgl.FitBoundsOptions;
        trackUserLocation?: boolean;
        showAccuracyCircle?: boolean;
        showUserLocation?: boolean;
        showUserHeading?: boolean;
        geolocation?: Geolocation;
    }
    
    interface Props {
        options: GeolocateControlOptions
    }
    const props = defineProps<Props>();

    const mapId = inject('MapID')
    
    function addControl(){
        map.value.addControl(new GeolocateControl(props.options))
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