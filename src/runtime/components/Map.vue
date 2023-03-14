<!-- eslint-disable vue/multi-word-component-names -->
<script setup lang="ts">
    import { EventData, MapboxEvent, MapboxOptions, MapBoxZoomEvent, MapDataEvent, MapMouseEvent, MapTouchEvent, MapWheelEvent, Map } from 'mapbox-gl';
    import { provide, onMounted, StyleValue } from 'vue';
    import { defineMapboxInstance } from '../composables/defineMapboxInstance';
    
    type MapboxComponentOptions = Omit<MapboxOptions, "container">

    const props = defineProps<{ mapId: string, options?: MapboxComponentOptions }>()

    const emit = defineEmits<{
      (e: 'resize', map: Map): void
      (e: 'remove', map: Map): void

      (e: 'load', map: Map): void
      (e: 'render', map: Map): void
      (e: 'idle', map: Map): void
      (e: 'error', map: Map): void
      (e: 'webglcontextlost', map: Map): void
      (e: 'webglcontextrestored', map: Map): void

      (e: 'data', event: MapDataEvent): void
      (e: 'styledata', event: MapDataEvent): void
      (e: 'sourcedata', event: MapDataEvent): void
      (e: 'dataloading', event: MapDataEvent): void
      (e: 'styledataloading', event: MapDataEvent): void
      (e: 'sourcedataloading', event: MapDataEvent): void
      (e: 'styleimagemissing', event: MapDataEvent): void

      (e: 'movestart', event: MapboxEvent<MouseEvent | TouchEvent | WheelEvent | undefined> & EventData): void
      (e: 'move', event: MapboxEvent<MouseEvent | TouchEvent | WheelEvent | undefined> & EventData): void
      (e: 'moveend', event:  MapboxEvent<MouseEvent | TouchEvent | WheelEvent | undefined> & EventData): void
      (e: 'drag', event:  MapboxEvent<MouseEvent | TouchEvent | undefined> & EventData | MapTouchEvent): void
      (e: 'dragend', event: MapboxEvent<MouseEvent | TouchEvent | undefined> & EventData | MapTouchEvent): void
      (e: 'zoomstart', event: MapboxEvent<MouseEvent | TouchEvent | undefined> & EventData | MapTouchEvent): void
      (e: 'zoom', event: MapboxEvent<MouseEvent | TouchEvent | undefined> & EventData | MapTouchEvent): void
      (e: 'zoomend', event: MapboxEvent<MouseEvent | TouchEvent | undefined> & EventData | MapTouchEvent): void
      (e: 'rotatestart', event: MapboxEvent<MouseEvent | TouchEvent | undefined> & EventData | MapTouchEvent): void
      (e: 'rotate', event: MapboxEvent<MouseEvent | TouchEvent | undefined> & EventData | MapTouchEvent): void
      (e: 'rotateend', event: MapboxEvent<MouseEvent | TouchEvent | undefined> & EventData | MapTouchEvent): void
      (e: 'pitchstart', event: MapboxEvent<MouseEvent | TouchEvent | undefined> & EventData | MapTouchEvent): void
      (e: 'pitch', event: MapboxEvent<MouseEvent | TouchEvent | undefined> & EventData | MapTouchEvent): void
      (e: 'pitchend', event: MapboxEvent<MouseEvent | TouchEvent | undefined> & EventData | MapTouchEvent): void
      (e: 'boxzoomstart', event: MapBoxZoomEvent): void
      (e: 'boxzoomend', event: MapBoxZoomEvent): void
      (e: 'boxzoomcancel', event: MapBoxZoomEvent): void

      (e: 'mousedown', event: MapMouseEvent): void
      (e: 'mouseup', event: MapMouseEvent): void
      (e: 'mouseover', event: MapMouseEvent): void
      (e: 'mousemove', event: MapMouseEvent): void
      (e: 'preclick', event: MapMouseEvent): void
      (e: 'click', event: MapMouseEvent): void
      (e: 'dblclick', event: MapMouseEvent): void
      (e: 'mouseout', event: MapMouseEvent): void
      (e: 'contextmenu', event: MapMouseEvent): void
      (e: 'wheel', event: MapWheelEvent): void
      (e: 'touchstart', event: MapTouchEvent): void
      (e: 'touchend', event: MapTouchEvent): void
      (e: 'touchmove', event: MapTouchEvent): void
      (e: 'touchcancel', event: MapTouchEvent): void

    }>()

    provide('MapID', props.mapId)
    onMounted(() => {
      const map = defineMapboxInstance(props.mapId, {...props.options, container: props.mapId});

      map.value?.on('resize', () => { emit("resize", map.value as Map) })
      map.value?.on('remove', () => { emit("remove", map.value as Map) })

      map.value?.on('load', () => { emit("load", map.value as Map) })
      map.value?.on('render', () => { emit("render", map.value as Map) })
      map.value?.on('idle', () => { emit("idle", map.value as Map) })
      map.value?.on('error', () => { emit("error", map.value as Map) })
      map.value?.on('webglcontextlost', () => { emit("webglcontextlost", map.value as Map) })
      map.value?.on('webglcontextrestored', () => { emit("webglcontextrestored", map.value as Map) })

      map.value?.on('data', (e) => { emit("data", e) })
      map.value?.on('styledata', (e) => { emit("styledata", e) })
      map.value?.on('sourcedata', (e) => { emit("sourcedata", e) })
      map.value?.on('dataloading', (e) => { emit("dataloading", e) })
      map.value?.on('styledataloading', (e) => { emit("styledataloading", e) })
      map.value?.on('sourcedataloading', (e) => { emit("sourcedataloading", e) })
      map.value?.on('styleimagemissing', (e) => { emit("styleimagemissing", e) })
      
      map.value?.on('movestart', (e) => { emit("movestart", e) })
      map.value?.on('move', (e) => { emit("move", e) })
      map.value?.on('moveend', (e) => { emit("moveend", e) })
      map.value?.on('drag', (e) => { emit("drag", e) })
      map.value?.on('dragend', (e) => { emit("dragend", e) })
      map.value?.on('zoomstart', (e) => { emit("zoomstart", e) })
      map.value?.on('zoom', (e) => { emit("zoom", e) })
      map.value?.on('zoomend', (e) => { emit("zoomend", e) })
      map.value?.on('rotatestart', (e) => { emit("rotatestart", e) })
      map.value?.on('rotate', (e) => { emit("rotate", e) })
      map.value?.on('rotateend', (e) => { emit("rotateend", e) })
      map.value?.on('pitchstart', (e) => { emit("pitchstart", e) })
      map.value?.on('pitch', (e) => { emit("pitch", e) })
      map.value?.on('pitchend', (e) => { emit("pitchend", e) })
      map.value?.on('boxzoomstart', (e) => { emit("boxzoomstart", e) })
      map.value?.on('boxzoomend', (e) => { emit("boxzoomend", e) })
      map.value?.on('boxzoomcancel', (e) => { emit("boxzoomcancel", e) })

      map.value?.on('mousedown', (e) => { emit("mousedown", e) })
      map.value?.on('mouseup', (e) => { emit("mouseup", e) })
      map.value?.on('mouseover', (e) => { emit("mouseover", e) })
      map.value?.on('mousemove', (e) => { emit("mousemove", e) })
      map.value?.on('preclick', (e) => { emit("preclick", e) })
      map.value?.on('click', (e) => { emit("click", e) })
      map.value?.on('dblclick', (e) => { emit("dblclick", e) })
      map.value?.on('mouseout', (e) => { emit("mouseout", e) })
      map.value?.on('contextmenu', (e) => { emit("contextmenu", e) })
      map.value?.on('wheel', (e) => { emit("wheel", e) })
      map.value?.on('touchstart', (e) => { emit("touchstart", e) })
      map.value?.on('touchend', (e) => { emit("touchend", e) })
      map.value?.on('touchmove', (e) => { emit("touchmove", e) })
      map.value?.on('touchcancel', (e) => { emit("touchcancel", e) })
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