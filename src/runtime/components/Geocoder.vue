<!-- eslint-disable vue/multi-word-component-names -->
<script setup lang="ts">
    import {GeocoderOptions} from '@mapbox/mapbox-gl-geocoder';
    // import mapboxgl from 'mapbox-gl';
    import { inject } from 'vue';
    import { useMapbox } from '../composables/useMapbox';

    interface Props {
        options: Omit<GeocoderOptions, "accessToken">
    }
    const props = withDefaults(defineProps<Props>(), {options: () => ({})});

    const mapId = inject<string>('MapID')
    if (!mapId) throw "Mapbox Controls must be placed inside a Map component"


    useMapbox(mapId, (map) => {
        function addControl(){
          //@ts-ignore TODO: Figure out typing while getting around #2
          map?.addControl(new MapboxGeocoder({accessToken: mapboxgl.accessToken, mapboxgl, ...props.options}))
        }

        map.on('load', addControl)
    })
</script>

<template>
  <div>
    <slot />
  </div>
</template>