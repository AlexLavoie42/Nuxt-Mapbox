<script setup lang="ts">
    import { LngLatLike, MarkerOptions } from 'mapbox-gl';
    import { defineMapboxMarker } from '../composables/defineMapboxMarker';

    const props = defineProps<{ markerId: string, options: MarkerOptions, lnglat: LngLatLike }>()

    const marker = defineMapboxMarker(props.markerId, props.options)
    marker?.setLngLat(props.lnglat)
</script>

<template>
  <div />
</template>