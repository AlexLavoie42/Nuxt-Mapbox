<script setup lang="ts">

</script>

<template>
  <div>
    <MapboxCustomGeocoder
      @change="console.log('change')"
      @keydown="console.log('keydown')"
    >
      <input>
    </MapboxCustomGeocoder>
  </div>
</template>