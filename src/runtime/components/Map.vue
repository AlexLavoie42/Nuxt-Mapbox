<!-- eslint-disable vue/multi-word-component-names -->
<script setup lang="ts">
import {
    type MapEventOf,
    Map
} from "mapbox-gl";
import { provide, onMounted, type StyleValue } from "vue";
import { cleanMapboxInstance, useMapboxRef, onUnmounted, defineMapboxInstance, watch, useMapboxBeforeLoad, ref } from "#imports";
import type { MapboxComponentOptions } from "../../module";
import { useResizeObserver } from "@vueuse/core";

const props = defineProps<{
    mapId: string;
    options?: MapboxComponentOptions;
    
    // Events in props so we can easily check/watch if they exist
    onError?: Function;
    onLoad?: Function;
    onIdle?: Function;
    onRemove?: Function;
    onRender?: Function;
    onResize?: Function;
    onWebglcontextlost?: Function;
    onWebglcontextrestored?: Function;
    onDataloading?: Function;
    onData?: Function;
    onTiledataloading?: Function;
    onSourcedataloading?: Function;
    onStyledataloading?: Function;
    onStyleImageMissing?: Function;
    onStyleload?: Function;
    onStyleimportload?: Function;
    onSourcedata?: Function;
    onStyledata?: Function;
    onBoxzoomcancel?: Function;
    onBoxzoomstart?: Function;
    onBoxzoomend?: Function;
    onTouchcancel?: Function;
    onTouchmove?: Function;
    onTouchend?: Function;
    onTouchstart?: Function;
    onClick?: Function;
    onContextmenu?: Function;
    onDblclick?: Function;
    onMousemove?: Function;
    onMouseup?: Function;
    onMousedown?: Function;
    onMouseout?: Function;
    onMouseover?: Function;
    onMovestart?: Function;
    onMove?: Function;
    onMoveend?: Function;
    onZoomstart?: Function;
    onZoom?: Function;
    onZoomend?: Function;
    onRotatestart?: Function;
    onRotate?: Function;
    onRotateend?: Function;
    onDragstart?: Function;
    onDrag?: Function;
    onDragend?: Function;
    onPitchstart?: Function;
    onPitch?: Function;
    onPitchend?: Function;
    onWheel?: Function;
}>();

const emit = defineEmits<{
    (e: "resize", map: Map): void;
    (e: "remove", map: Map): void;

    (e: "load", map: Map): void;
    (e: "render", map: Map): void;
    (e: "idle", map: Map): void;
    (e: "error", map: Map): void;
    (e: "webglcontextlost", map: Map): void;
    (e: "webglcontextrestored", map: Map): void;

    (e: "data", event: MapEventOf<'data'>): void;
    (e: "styledata", event: MapEventOf<'styledata'>): void;
    (e: "sourcedata", event: MapEventOf<'sourcedata'>): void;
    (e: "dataloading", event: MapEventOf<'dataloading'>): void;
    (e: "styledataloading", event: MapEventOf<'styledataloading'>): void;
    (e: "sourcedataloading", event: MapEventOf<'sourcedataloading'>): void;
    (e: "styleimagemissing", event: MapEventOf<'styleimagemissing'>): void;
    (e: "styleload", event: MapEventOf<'style.load'>): void;
    (e: "styleimportload", event: MapEventOf<'style.import.load'>): void;

    (e: "movestart", event: MapEventOf<'movestart'>): void;
    (e: "move", event: MapEventOf<'move'>): void;
    (e: "moveend", event: MapEventOf<'moveend'>): void;
    (e: "drag", event: MapEventOf<'drag'>): void;
    (e: "dragend", event: MapEventOf<'dragend'>): void;
    (e: "zoomstart", event: MapEventOf<'zoomstart'>): void;
    (e: "zoom", event: MapEventOf<'zoom'>): void;
    (e: "zoomend", event: MapEventOf<'zoomend'>): void;
    (e: "rotatestart", event: MapEventOf<'rotatestart'>): void;
    (e: "rotate", event: MapEventOf<'rotate'>): void;
    (e: "rotateend", event: MapEventOf<'rotateend'>): void;
    (e: "pitchstart", event: MapEventOf<'pitchstart'>): void;
    (e: "pitch", event: MapEventOf<'pitch'>): void;
    (e: "pitchend", event: MapEventOf<'pitchend'>): void;
    (e: "boxzoomstart", event: MapEventOf<'boxzoomstart'>): void;
    (e: "boxzoomend", event: MapEventOf<'boxzoomend'>): void;
    (e: "boxzoomcancel", event: MapEventOf<'boxzoomcancel'>): void;

    (e: "mousedown", event: MapEventOf<'mousedown'>): void;
    (e: "mouseup", event: MapEventOf<'mouseup'>): void;
    (e: "mouseover", event: MapEventOf<'mouseover'>): void;
    (e: "mousemove", event: MapEventOf<'mousemove'>): void;
    (e: "preclick", event: MapEventOf<'preclick'>): void;
    (e: "click", event: MapEventOf<'click'>): void;
    (e: "dblclick", event: MapEventOf<'dblclick'>): void;
    (e: "mouseout", event: MapEventOf<'mouseout'>): void;
    (e: "contextmenu", event: MapEventOf<'contextmenu'>): void;
    (e: "wheel", event: MapEventOf<'wheel'>): void;
    (e: "touchstart", event: MapEventOf<'touchstart'>): void;
    (e: "touchend", event: MapEventOf<'touchend'>): void;
    (e: "touchmove", event: MapEventOf<'touchmove'>): void;
    (e: "touchcancel", event: MapEventOf<'touchcancel'>): void;
}>();

provide("MapID", props.mapId);
watch(() => {
    return Object.entries(props).filter((arr) => arr[0].toString().startsWith('on'))
}, (value) => {
    for (const [key, v] of value) {
        if (v) {
            const passMap = ["resize", "remove", "load", "render", "idle", "error", "webglcontextlost", "webglcontextrestored"];
            const eventName = key.toString().replace('on', '').toLowerCase() as keyof typeof emit;
            let mbEventName = eventName as string;
            if (eventName === 'styleload') mbEventName = 'style.load';
            if (eventName === 'styleimportload') mbEventName = 'style.import.load';
            useMapboxBeforeLoad(props.mapId, (map) => {
                map.on(mbEventName, (e) => {
                    emit(eventName, passMap.includes(eventName) ? map : e);
                })
            })
        }
    }
}, {immediate: true});

watch(() => props.options, (newOptions, oldOptions) => {
    const map = useMapboxRef(props.mapId);
    if (newOptions) {
        if (newOptions.style && oldOptions?.style !== newOptions.style) {
            map.value?.setStyle(newOptions.style);
        }
        if (newOptions.center && oldOptions?.center !== newOptions.center) {
            map.value?.setCenter(newOptions.center);
        }
        if (newOptions.zoom && oldOptions?.zoom !== newOptions.zoom) {
            map.value?.setZoom(newOptions.zoom);
        }
        if (newOptions.projection && oldOptions?.projection !== newOptions.projection) {
            map.value?.setProjection(newOptions.projection);
        }
        if (newOptions.bearing && oldOptions?.bearing !== newOptions.bearing) {
            map.value?.setBearing(newOptions.bearing);
        }
        if (newOptions.pitch && oldOptions?.pitch !== newOptions.pitch) {
            map.value?.setPitch(newOptions.pitch);
        }
        if (newOptions.minZoom && oldOptions?.minZoom !== newOptions.minZoom) {
            map.value?.setMinZoom(newOptions.minZoom);
        }
        if (newOptions.maxZoom && oldOptions?.maxZoom !== newOptions.maxZoom) {
            map.value?.setMaxZoom(newOptions.maxZoom);
        }
        if (newOptions.bounds && oldOptions?.bounds !== newOptions.bounds) {
            map.value?.fitBounds(newOptions.bounds);
        }
    }
});

const mapContainerRef = ref<HTMLElement>();

onMounted(() => {
    let map = useMapboxRef(props.mapId);
    if (!map.value) {
        map = defineMapboxInstance(props.mapId, {
            ...props.options,
            container: mapContainerRef.value || props.mapId,
        });
    }

    useResizeObserver(mapContainerRef, () => {
        setTimeout(() => map.value?.resize(), 0)
    })
});

onUnmounted(() => {
    cleanMapboxInstance(props.mapId);
});
</script>

<template>
  <div
    :id="mapId"
    ref="mapContainerRef"
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
