<!-- eslint-disable vue/multi-word-component-names -->
<script setup lang="ts">
import {type AnyLayer, type Layer, MapMouseEvent } from "mapbox-gl";
import { inject } from "vue";
import { computed, onUnmounted, watch, useMapboxInstance, useMapbox, useMapboxBeforeLoad, useAttrs } from "#imports";
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

const mapRef = useMapboxInstance(mapId);
const sourceExists = computed(() => {
    return !!mapRef.value?.getSource(
        (props.layer as Layer).source?.toString() || ""
    );
});

useMapbox(mapId, (map) => {
    function addLayer() {
        if (!sourceExists.value) {
            // This causes layer to be reloaded whenever the source is.
            whenever(sourceExists, addLayer);
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

    if ((props.layer as Layer).minzoom) {
        watch((props.layer as Layer).minzoom, (value) => {
            map?.setLayerZoomRange(props.layer.id, value, (props.layer as Layer).maxzoom)
        });
    }

    if ((props.layer as Layer).maxzoom) {
        watch((props.layer as Layer).maxzoom, (value) => {
            map?.setLayerZoomRange(props.layer.id, (props.layer as Layer).minzoom, value)
        });
    }

    if ((props.layer as Layer).paint) {
        watch((props.layer as Layer).paint, (value) => {
            for (const prop of Object.keys(value)) {
                map?.setPaintProperty(props.layer.id, prop, value[prop])
            }
        }, { deep: true });
    }

    if ((props.layer as Layer).layout) {
        watch((props.layer as Layer).layout, (value) => {
            for (const prop of Object.keys(value)) {
                map?.setLayoutProperty(props.layer.id, prop, value[prop])
            }
        }, { deep: true });
    }

    if ((props.layer as Layer).filter) {
        watch((props.layer as Layer).filter, (value) => {
            map?.setFilter(props.layer.id, value)
        }, { deep: true });
    }
});


onUnmounted(() => {
    useMapbox(mapId, (map) => {
        map?.removeLayer(props.layer.id);
    });
});
</script>

<template>
  <div>
    <slot />
  </div>
</template>
