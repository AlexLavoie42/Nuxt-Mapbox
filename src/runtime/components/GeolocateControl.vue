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
    const props = withDefaults(defineProps<Props>(), {options: () => ({})});

    const emit = defineEmits<{  
      (e: 'geolocate', control: GeolocateControl): void
      (e: 'error', control: GeolocateControl): void
      (e: 'outofmaxbounds', control: GeolocateControl): void
      (e: 'trackuserlocationstart', control: GeolocateControl): void
      (e: 'trackuserlocationend', control: GeolocateControl): void
    }>()

    const mapId = inject<string>('MapID')
    if (!mapId) throw "Mapbox Controls must be placed inside a Map component"
    
    useMapbox(mapId, (map) => {
        function addControl(){
            //@ts-ignore
            const geolocate = new mapboxgl.GeolocateControl(props.options);
            map?.addControl(geolocate)

            geolocate.on('geolocate', () => {
                emit('geolocate', geolocate)
            })
            geolocate.on('error', () => {
                emit('error', geolocate)
            })
            geolocate.on('outofmaxbounds', () => {
                emit('outofmaxbounds', geolocate)
            })
            geolocate.on('trackuserlocationstart', () => {
                emit('trackuserlocationstart', geolocate)
            })
            geolocate.on('trackuserlocationend', () => {
                emit('trackuserlocationend', geolocate)
            })
        }

        map.on('load', addControl)
    })
</script>

<template>
  <div>
    <slot />
  </div>
</template>