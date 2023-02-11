<script setup lang="ts">
    import { MapboxOptions } from 'mapbox-gl';
    import { mapboxInit } from '../composables/mapboxInit';
    type MapboxComponentOptions = Omit<MapboxOptions, "container">

    provide('MapID', props.mapId)

    const props = defineProps<{ mapId: string, options?: MapboxComponentOptions }>()
    onMounted(() => {
        mapboxInit(props.mapId, {...props.options, container: props.mapId})
    })
</script>


<template>
  <div
    :id="mapId"
    :class="$attrs.class"
    :style="$attrs.style"
  />
  <slot />
</template>