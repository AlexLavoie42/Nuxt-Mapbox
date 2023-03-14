<script setup lang="ts">
    import { MarkerOptions, LngLatLike, Marker } from 'mapbox-gl';
    import { defineMapboxMarker } from '../composables/defineMapboxMarker';

    const props = withDefaults(defineProps<{ markerId: string, options: MarkerOptions, lnglat: LngLatLike }>(), {options: () => ({})});

    const emit = defineEmits<{  
      (e: 'dragstart', marker: Marker): void
      (e: 'drag', marker: Marker): void
      (e: 'dragend', marker: Marker): void
    }>()

    const marker = defineMapboxMarker(props.markerId, props.options)
    marker?.setLngLat(props.lnglat)

    marker?.on('dragstart', () => { emit("dragstart", marker) })
    marker?.on('drag', () => { emit("drag", marker) })
    marker?.on('dragstart', () => { emit("dragstart", marker) })
</script>

<template>
  <div />
</template>