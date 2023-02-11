<script setup lang="ts">
    import { LngLatLike, PopupOptions } from 'mapbox-gl';
    import { ref } from 'vue';
    import { defineMapboxPopup } from '../composables/defineMapboxPopup';

    const props = defineProps<{ popupId: string, options: PopupOptions, lnglat: LngLatLike }>()
    const popupTemplate = ref<HTMLElement | null>(null)

    const popup = defineMapboxPopup(props.popupId, props.options, popupTemplate)
    popup?.setLngLat(props.lnglat)
</script>

<template>
  <div ref="popupTemplate">
    <slot />
  </div>
</template>