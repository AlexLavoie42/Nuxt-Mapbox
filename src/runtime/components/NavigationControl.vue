<script setup lang="ts">
    import { NavigationControl } from 'mapbox-gl';
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
    const props = defineProps<Props>();

    const mapId = inject<string>('MapID')
    if (!mapId) throw "Mapbox Controls must be placed inside a Map component"
    
    useMapbox(mapId, (map) => {
        function addControl(){
          map?.addControl(new NavigationControl(props.options))
        }

        map.on('load', addControl)
    })
</script>

<template>
  <div>
    <slot />
  </div>
</template>