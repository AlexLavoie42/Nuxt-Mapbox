<!-- eslint-disable vue/multi-word-component-names -->
<script setup lang="ts">
import { AnyLayer, AnySourceData, Layer, MapMouseEvent } from "mapbox-gl";
import { inject, onMounted } from "vue";
import { useMapbox } from "../composables/useMapbox";
import { computed, onUnmounted, watch, getCurrentInstance } from "#imports";

interface Props {
    sourceId?: string;
    source?: AnySourceData;
    layer: AnyLayer;
    beforeLayer?: string
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

if (props.source || props.sourceId) console.warn("source & sourceId props in MapboxLayer are deprecated");

// Vue magic so we can see which events are being listened to
// Mapbox slows down significantly with each event listener, even if we do nothing.
// This may lead to bugs down the line with events getting added to the component after it's mounted.
const vnodeProps = getCurrentInstance()?.vnode.props

onMounted(() => {
    useMapbox(mapId, (map) => {
        const sourceExists = computed(() => {
            return !!map?.getSource(
                (props.layer as Layer).source?.toString() || props.sourceId || ""
            );
        });
        function addLayer() {
            if (!sourceExists.value) {
                watch(sourceExists, addLayer);
                return;
            }
            if (props.beforeLayer && map.getLayer(props.beforeLayer)) {
                map?.addLayer(props.layer, props.beforeLayer);
            } else {
                map?.addLayer(props.layer);
            }
        }
        function addSource() {
            if (props.source && props.sourceId) {
                map?.addSource(props.sourceId, props.source);
            }
        }

        addSource();
        addLayer();
        if (vnodeProps?.onMousedown) {
            map.on("mousedown", props.layer.id, (e) => {
                emit("mousedown", e);
            });
        }
        if (vnodeProps?.onMouseup) {
            map.on("mouseup", props.layer.id, (e) => {
                emit("mouseup", e);
            });
        }
        if (vnodeProps?.onMouseover) {
            map.on("mouseover", props.layer.id, (e) => {
                emit("mouseover", e);
            });
        }
        if (vnodeProps?.onMousemove) {
            map.on("mousemove", props.layer.id, (e) => {
                emit("mousemove", e);
            });
        }
        if (vnodeProps?.onClick) {
            map.on("click", props.layer.id, (e) => {
                emit("click", e);
            });
        }
        if (vnodeProps?.onDblclick) {
            map.on("dblclick", props.layer.id, (e) => {
                emit("dblclick", e);
            });
        }
        if (vnodeProps?.onMouseenter) {
            map.on("mouseenter", props.layer.id, (e) => {
                emit("mouseenter", e);
            });
        }
        if (vnodeProps?.onMouseleave) {
            map.on("mouseleave", props.layer.id, (e) => {
                emit("mouseleave", e);
            });
        }
    });
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
