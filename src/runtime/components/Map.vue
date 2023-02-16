<!-- eslint-disable vue/multi-word-component-names -->
<script setup lang="ts">
    import mapboxgl, { MapboxOptions, MapDataEvent } from 'mapbox-gl';
    import { provide, onMounted, StyleValue } from 'vue';
    import { defineMapboxInstance } from '../composables/defineMapboxInstance';
    
    type MapboxComponentOptions = Omit<MapboxOptions, "container">

    const props = defineProps<{ mapId: string, options?: MapboxComponentOptions }>()

    const emit = defineEmits<{
      (e: 'load'): void
      (e: 'render'): void
      (e: 'idle'): void
      (e: 'error'): void
      (e: 'webglcontextlost'): void
      (e: 'webglcontextrestored'): void

      (e: 'data', event: MapDataEvent): void
      (e: 'styledata', event: MapDataEvent): void
      (e: 'sourcedata', event: MapDataEvent): void
      (e: 'dataloading', event: MapDataEvent): void
      (e: 'styledataloading', event: MapDataEvent): void
      (e: 'sourcedataloading', event: MapDataEvent): void
      (e: 'styleimagemissing', event: MapDataEvent): void
    }>()

    provide('MapID', props.mapId)
    onMounted(() => {
      const map = defineMapboxInstance(props.mapId, {...props.options, container: props.mapId});

      map.value?.on('load', () => { emit("load") })
      map.value?.on('render', () => { emit("render") })
      map.value?.on('idle', () => { emit("idle") })
      map.value?.on('error', () => { emit("error") })
      map.value?.on('webglcontextlost', () => { emit("webglcontextlost") })
      map.value?.on('webglcontextrestored', () => { emit("webglcontextrestored") })

      map.value?.on('data', (e) => { emit("data", e) })
      map.value?.on('styledata', (e) => { emit("styledata", e) })
      map.value?.on('sourcedata', (e) => { emit("sourcedata", e) })
      map.value?.on('dataloading', (e) => { emit("dataloading", e) })
      map.value?.on('styledataloading', (e) => { emit("styledataloading", e) })
      map.value?.on('sourcedataloading', (e) => { emit("sourcedataloading", e) })
      map.value?.on('styleimagemissing', (e) => { emit("styleimagemissing", e) })
    })

    
</script>


<template>
  <div
    :id="mapId"
    class="mapboxgl-default-map-size"
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