<script setup lang="ts">
    import { LngLatLike, Popup, PopupOptions } from 'mapbox-gl';
    import { ref } from 'vue';
    import { defineMapboxPopup } from '../composables/defineMapboxPopup';

    const props = withDefaults(defineProps<{ popupId: string, options: PopupOptions, lnglat: LngLatLike }>(), {options: () => ({})});
    const popupTemplate = ref<HTMLElement | null>(null)

    const emit = defineEmits<{  
      (e: 'open', popup: Popup): void
      (e: 'close', popup: Popup): void
    }>()

    const popup = defineMapboxPopup(props.popupId, props.options, popupTemplate)
    popup?.setLngLat(props.lnglat)
    popup?.on('open', () => { emit('open', popup) })
    popup?.on('close', () => { emit('close', popup) })
</script>

<template>
  <div ref="popupTemplate">
    <slot />
  </div>
</template>