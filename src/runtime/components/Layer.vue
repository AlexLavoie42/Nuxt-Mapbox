<!-- eslint-disable vue/multi-word-component-names -->
<script setup lang="ts">
import {type AnyLayer, type Layer, MapMouseEvent } from "mapbox-gl";
import { inject } from "vue";
import { computed, onUnmounted, watch, useMapboxInstance, useMapbox, useMapboxBeforeLoad, useAttrs, useMapboxRef, onMounted, _useMapboxInstanceWithLoaded } from "#imports";
import { whenever } from "@vueuse/core";

interface Props {
    layer: AnyLayer;
    beforeLayer?: string;

    onMousedown?: Function;
    onMouseup?: Function;
    onMouseover?: Function;
    onMousemove?: Function;
    onClick?: Function;
    onDblclick?: Function;
    onMouseenter?: Function;
    onMouseleave?: Function;
}
const props = defineProps<Props>();

const emit = defineEmits<{
    (e: "mousedown", event: MapMouseEvent): void;
    (e: "mouseup", event: MapMouseEvent): void;
    (e: "mouseover", event: MapMouseEvent): void;
    (e: "mousemove", event: MapMouseEvent): void;
    (e: "click", event: MapMouseEvent): void;
    (e: "dblclick", event: MapMouseEvent): void;
    (e: "mouseenter", event: MapMouseEvent): void;
    (e: "mouseleave", event: MapMouseEvent): void;
}>();

const mapId = inject<string>("MapID");
if (!mapId) throw "Mapbox Controls must be placed inside a Map component";

const attrs = useAttrs();
if (attrs.source || attrs.sourceId) throw "source & sourceId props in MapboxLayer are deprecated";

watch(() => {
    return Object.entries(props).filter((arr) => arr[0].toString().startsWith('on'))
}, (value) => {
    for (const [key, v] of value) {
        if (v) {
            const eventName = key.toString().replace('on', '').toLowerCase();
            useMapboxBeforeLoad(mapId, (map) => {
                map.on(eventName as keyof typeof emit, props.layer.id, (e) => {
                    emit(eventName as keyof typeof emit, e);
                })
            })
        }
    }
}, {immediate: true});

const mapRef = useMapboxRef(mapId);
const sourceExists = computed(() => {
    return !!mapRef.value?.getSource(
        (props.layer as Layer).source?.toString() || ""
    );
});
const layerExists = computed(() => {
    return !!mapRef.value?.getLayer(props.layer.id);
})

useMapbox(mapId, (map) => {
    function addLayer() {
        if (!sourceExists.value) {
            return;
        }
        if (map.getLayer(props.layer.id)) {
            console.warn(`Mapbox layer with id '${props.layer.id}' was initialized multiple times. This can cause unexpected behaviour.`);
            return;
        }
        if (props.beforeLayer && map.getLayer(props.beforeLayer)) {
            map?.addLayer(props.layer, props.beforeLayer);
        } else {
            if (props.beforeLayer) {
                watch(() => map.getLayer(props.beforeLayer || ''), () => {
                    map?.moveLayer(props.layer.id, props.beforeLayer);
                })
            }
            map?.addLayer(props.layer);
        }
    }

    addLayer();
    // This causes layer to be reloaded whenever the source is.
    whenever(sourceExists, addLayer);
    watch(layerExists, () => {
        if (!layerExists.value && sourceExists.value) {
            addLayer();
        }
    })
});

watch(() => props.layer, (newLayer, oldLayer) => {
    const map = useMapboxRef(mapId);
    if (newLayer) {
        if ((newLayer as Layer).minzoom) {
            map.value?.setLayerZoomRange(newLayer.id, (newLayer as Layer).minzoom || 0, (newLayer as Layer).maxzoom || 0);
        }

        if ((newLayer as Layer).maxzoom) {
            map.value?.setLayerZoomRange(newLayer.id, (newLayer as Layer).minzoom || 0, (newLayer as Layer).maxzoom || 0);
        }

        if ((newLayer as Layer).paint) {
            for (const prop of Object.keys((newLayer as Layer).paint || {})) {
                map.value?.setPaintProperty(newLayer.id, prop, (newLayer as Layer).paint?.[prop as keyof Layer["paint"]]);
            }
        }

        if ((newLayer as Layer).layout) {
            for (const prop of Object.keys((newLayer as Layer).layout || {})) {
                map.value?.setLayoutProperty(newLayer.id, prop, (newLayer as Layer).layout?.[prop as keyof Layer["layout"]]);
            }
        }

        if ((newLayer as Layer).filter) {
            map.value?.setFilter(newLayer.id, (newLayer as Layer).filter)
        }
    }
}, {deep: true});

onUnmounted(() => {
    useMapbox(mapId, (map) => {
        if (map.getLayer(props.layer.id)) {
            map?.removeLayer(props.layer.id);
        }
    });
});
</script>

<template>
  <div>
    <slot />
  </div>
</template>
