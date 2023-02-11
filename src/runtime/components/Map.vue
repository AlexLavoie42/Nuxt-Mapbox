<!-- eslint-disable vue/multi-word-component-names -->
<script setup lang="ts">
    import { MapboxOptions } from 'mapbox-gl';
    import { provide, onMounted, StyleValue } from 'vue';
    import { _mapboxInit } from '../composables/mapboxInit';
    
    type MapboxComponentOptions = Omit<MapboxOptions, "container">

    const props = defineProps<{ mapId: string, options?: MapboxComponentOptions }>()

    provide('MapID', props.mapId)
    onMounted(() => {
        _mapboxInit(props.mapId, {...props.options, container: props.mapId})
    })
</script>


<template>
  <div
    class="mapboxgl-default-map-size"
    :id="mapId"
    :class="$attrs.class"
    :style="$attrs.style as StyleValue"
  />
  <slot />
</template>

<style>
  .mapboxgl-default-map-size {
    position: absolute;
    top: 0;
    bottom: 0;
    width: 100%;
  }
</style>