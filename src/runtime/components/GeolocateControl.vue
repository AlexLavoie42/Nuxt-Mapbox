<script setup lang="ts">
    import { GeolocateControl } from 'mapbox-gl';
    import { inject } from 'vue';
    import { useMapbox } from '../composables/useMapbox';
    
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

    const mapId = inject<string>('MapID')
    if (!mapId) throw "Mapbox Controls must be placed inside a Map component"
    
    useMapbox(mapId, (map) => {
        function addControl(){
            map?.addControl(new GeolocateControl(props.options))
        }

        map.on('load', addControl)
    })
</script>

<template>
  <div>
    <slot />
  </div>
</template>