<script setup lang="ts">
    import { inject } from 'vue';
    import { useMapbox } from '../composables/useMapbox';
    
    interface NavigationControlOptions {
        showCompass?: boolean;
        showZoom?: boolean;
        visualizePitch?: boolean;
    }
    interface Props {
        options: NavigationControlOptions
    }
    const props = withDefaults(defineProps<Props>(), {options: () => ({})});

    const mapId = inject<string>('MapID')
    if (!mapId) throw "Mapbox Controls must be placed inside a Map component"
    
    useMapbox(mapId, (map) => {
        function addControl(){
          //@ts-ignore
          map?.addControl(new mapboxgl.NavigationControl(props.options))
        }

        map.on('load', addControl)
    })
</script>

<template>
  <div>
    <slot />
  </div>
</template>