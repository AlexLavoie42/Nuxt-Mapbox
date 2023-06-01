<script setup lang="ts">
import { ref, watch } from '#imports';

const result = ref<MapboxGeocoder.Result>();
watch(result, (res) => {
  console.log(res?.place_name);
})
</script>

<template>
  <div>
    <MapboxCustomGeocoder
      v-model="result"
      @change="console.log('change')"
      @keydown="console.log('keydown')"
    >
      <input>
    </MapboxCustomGeocoder>
  </div>
</template>