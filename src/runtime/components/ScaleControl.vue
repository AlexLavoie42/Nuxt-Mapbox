<script setup lang="ts">
    import { inject, onMounted } from 'vue';
    import { useMapbox } from '../composables/useMapbox';

    interface Props {
        options?: {
            maxWidth?: number;
            unit?: string;
        };
        position?: 'top-left' | 'top-right' | 'bottom-left' | 'bottom-right';
    }
    const props = withDefaults(defineProps<Props>(), {options: () => ({}), position: () => 'top-right'});

    const mapId = inject<string>('MapID');
    if (!mapId) throw "Mapbox Controls must be placed inside a Map component";

    onMounted(() => {
        useMapbox(mapId, (map) => {
            function addControl(){
                //@ts-ignore
                map.addControl(new mapboxgl.ScaleControl(props.options), props.position);
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