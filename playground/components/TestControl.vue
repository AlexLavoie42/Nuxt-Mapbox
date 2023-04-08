<script setup lang="ts">
    import { ref } from 'vue';
    import { defineMapboxControl, useMapbox } from '#imports';

    const markerRef = ref<HTMLElement | null>(null);

    useMapbox('map2', (map) => {
        if (markerRef.value) {
            const control = defineMapboxControl((_map) => {
                return markerRef.value as HTMLElement;
            }, (map) => {})
            map.addControl(control, 'bottom-left');
        }
    })
</script>

<template>
  <div>
    <div
      ref="markerRef"
      class="marker"
      style="
          backgroundImage: url(https://placekitten.com/g/40/40/);
          width: 40px;
          height: 40px;
          backgroundSize: 100%;
        "
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
     