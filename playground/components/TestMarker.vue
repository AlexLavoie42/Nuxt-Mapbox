<script setup lang="ts">
    import { MarkerOptions } from 'mapbox-gl';
    import { ref, watch } from 'vue';
    import { defineMapboxMarker, toRef } from '#imports';

    const props = defineProps<{ markerId: string, options: MarkerOptions & { lnglat: [number, number] } }>()
    const markerRef = ref<HTMLElement | null>(null)
    const options = toRef(props.options)


    const marker = defineMapboxMarker(props.markerId, options, markerRef, (m) => {
        m.setLngLat([110, 6])
    })
    const num = ref(40)
</script>

<template>
  <div>
    <div
      ref="markerRef"
      class="marker"
      :style="{
        backgroundImage: `url(https://placekitten.com/g/40/${num})`,
        width: '40px',
        height: '40px',
        backgroundSize: '100%',
      }
      "
      @click="num += 1"
    />
  </div>
</template>

<style>
    .marker {
        display: block;
        border: none;
        border-radius: 50%;
        cursor: pointer;
        padding: 0;
    }
</style>
     