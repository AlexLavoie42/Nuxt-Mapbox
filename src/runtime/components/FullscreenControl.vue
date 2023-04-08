<script setup lang="ts">
    import { inject } from 'vue';
    import { useMapbox } from '../composables/useMapbox';
    import { onMounted } from 'vue';

    interface Props {
        options?: mapboxgl.FullscreenControlOptions;
        position?: 'top-left' | 'top-right' | 'bottom-left' | 'bottom-right';
    }
    const props = withDefaults(defineProps<Props>(), {options: () => ({}), position: () => 'top-right'});

    const mapId = inject<string>('MapID');
    if (!mapId) throw "Mapbox Controls must be placed inside a Map component";

    onMounted(() => {
      useMapbox(mapId, (map) => {
          function addControl(){
              //@ts-ignore
              map?.addControl(new mapboxgl.FullscreenControl(props.options), props.position);
          }

          map.on('load', addControl);
      })
    })
</script>

<template>
  <div>
    <slot />
  </div>
</template>