<!-- eslint-disable vue/multi-word-component-names -->
<script setup lang="ts">
import {
    EventData,
    MapboxEvent,
    MapBoxZoomEvent,
    MapDataEvent,
    MapMouseEvent,
    MapTouchEvent,
    MapWheelEvent,
    Map
} from "mapbox-gl";
import { provide, onMounted, StyleValue } from "vue";
import { cleanMapboxInstance, useMapboxRef, onUnmounted, defineMapboxInstance, watch, useMapboxBeforeLoad } from "#imports";
import { MapboxComponentOptions } from "../../module";

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

    (e: "data", event: MapDataEvent): void;
    (e: "styledata", event: MapDataEvent): void;
    (e: "sourcedata", event: MapDataEvent): void;
    (e: "dataloading", event: MapDataEvent): void;
    (e: "styledataloading", event: MapDataEvent): void;
    (e: "sourcedataloading", event: MapDataEvent): void;
    (e: "styleimagemissing", event: MapDataEvent): void;

    (
        e: "movestart",
        event: MapboxEvent<MouseEvent | TouchEvent | WheelEvent | undefined> & EventData
    ): void;
    (
        e: "move",
        event: MapboxEvent<MouseEvent | TouchEvent | WheelEvent | undefined> & EventData
    ): void;
    (
        e: "moveend",
        event: MapboxEvent<MouseEvent | TouchEvent | WheelEvent | undefined> & EventData
    ): void;
    (
        e: "drag",
        event:
            | (MapboxEvent<MouseEvent | TouchEvent | undefined> & EventData)
            | MapTouchEvent
    ): void;
    (
        e: "dragend",
        event:
            | (MapboxEvent<MouseEvent | TouchEvent | undefined> & EventData)
            | MapTouchEvent
    ): void;
    (
        e: "zoomstart",
        event:
            | (MapboxEvent<MouseEvent | TouchEvent | undefined> & EventData)
            | MapTouchEvent
    ): void;
    (
        e: "zoom",
        event:
            | (MapboxEvent<MouseEvent | TouchEvent | undefined> & EventData)
            | MapTouchEvent
    ): void;
    (
        e: "zoomend",
        event:
            | (MapboxEvent<MouseEvent | TouchEvent | undefined> & EventData)
            | MapTouchEvent
    ): void;
    (
        e: "rotatestart",
        event:
            | (MapboxEvent<MouseEvent | TouchEvent | undefined> & EventData)
            | MapTouchEvent
    ): void;
    (
        e: "rotate",
        event:
            | (MapboxEvent<MouseEvent | TouchEvent | undefined> & EventData)
            | MapTouchEvent
    ): void;
    (
        e: "rotateend",
        event:
            | (MapboxEvent<MouseEvent | TouchEvent | undefined> & EventData)
            | MapTouchEvent
    ): void;
    (
        e: "pitchstart",
        event:
            | (MapboxEvent<MouseEvent | TouchEvent | undefined> & EventData)
            | MapTouchEvent
    ): void;
    (
        e: "pitch",
        event:
            | (MapboxEvent<MouseEvent | TouchEvent | undefined> & EventData)
            | MapTouchEvent
    ): void;
    (
        e: "pitchend",
        event:
            | (MapboxEvent<MouseEvent | TouchEvent | undefined> & EventData)
            | MapTouchEvent
    ): void;
    (e: "boxzoomstart", event: MapBoxZoomEvent): void;
    (e: "boxzoomend", event: MapBoxZoomEvent): void;
    (e: "boxzoomcancel", event: MapBoxZoomEvent): void;

    (e: "mousedown", event: MapMouseEvent): void;
    (e: "mouseup", event: MapMouseEvent): void;
    (e: "mouseover", event: MapMouseEvent): void;
    (e: "mousemove", event: MapMouseEvent): void;
    (e: "preclick", event: MapMouseEvent): void;
    (e: "click", event: MapMouseEvent): void;
    (e: "dblclick", event: MapMouseEvent): void;
    (e: "mouseout", event: MapMouseEvent): void;
    (e: "contextmenu", event: MapMouseEvent): void;
    (e: "wheel", event: MapWheelEvent): void;
    (e: "touchstart", event: MapTouchEvent): void;
    (e: "touchend", event: MapTouchEvent): void;
    (e: "touchmove", event: MapTouchEvent): void;
    (e: "touchcancel", event: MapTouchEvent): void;
}>();

provide("MapID", props.mapId);
watch(() => {
    return Object.entries(props).filter((arr) => arr[0].toString().startsWith('on'))
}, (value) => {
    for (const [key, v] of value) {
        if (v) {
            const passMap = ["resize", "remove", "load", "render", "idle", "error", "webglcontextlost", "webglcontextrestored"];
            const eventName = key.toString().replace('on', '').toLowerCase();
            useMapboxBeforeLoad(props.mapId, (map) => {
                map.on(eventName, (e) => {
                    emit(eventName as keyof typeof emit, passMap.includes(eventName) ? map : e);
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

onMounted(() => {
    let map = useMapboxRef(props.mapId);
    if (!map.value) {
        map = defineMapboxInstance(props.mapId, {
            ...props.options,
            container: props.mapId,
        });
    }
});

onUnmounted(() => {
    cleanMapboxInstance(props.mapId);
});
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
