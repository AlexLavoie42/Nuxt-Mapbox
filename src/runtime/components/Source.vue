<!-- eslint-disable vue/multi-word-component-names -->
<script setup lang="ts">
import { type SourceSpecification, GeoJSONSource, type VectorTileSource, ImageSource, Map, RasterTileSource } from "mapbox-gl";
import { inject, onUnmounted, watch, useMapbox, computed, useMapboxInstance, triggerRef, _useMapboxInstances } from "#imports";

interface Props {
    sourceId: string;
    source: SourceSpecification;
}
const props = defineProps<Props>();

const mapId = inject<string>("MapID");
if (!mapId) throw "Mapbox Source must be placed inside a Map component";

const mapRef = useMapboxInstance(mapId);
const sourceExists = computed(() => {
    return !!mapRef.value?.getSource(props.sourceId);
});

const mapbox_instances = _useMapboxInstances();
useMapbox(mapId, (map: Map) => {
    function addSource() {
        if (!sourceExists.value) {
            map?.addSource(props.sourceId, props.source);
        }
    }
    addSource();
    map.on('style.load', () => {
        addSource();
    })
});

onUnmounted(() => {
    mapRef.value?.removeSource(props.sourceId);
});

watch(() => props.source, () => {
    const source = mapRef.value?.getSource(props.sourceId);
    if (!source) return;

    props.source.type === 'geojson'
    if (props.source.type === 'geojson' && props.source.data) {
        (source as GeoJSONSource).setData(props.source.data);
    }
    if (props.source.type === 'vector' && (props.source.tiles || props.source.url)) {
        if (props.source.tiles) {
            (source as VectorTileSource).setTiles(props.source.tiles);
        }
        if (props.source.url) {
            (source as VectorTileSource).setUrl(props.source.url);
        }
        (source as VectorTileSource).reload();
    }
    if (props.source.type === 'image' && props.source.url) {
        (source as ImageSource).updateImage(props.source as typeof props.source & {url: string});
    }
    if (props.source.type === 'raster' && (props.source.url || props.source.tiles)) {
        if (props.source.url) {
            (source as RasterTileSource).setUrl(props.source.url);
        }
        if(props.source.tiles) {
            (source as RasterTileSource).setTiles(props.source.tiles);
        }
        (source as RasterTileSource).reload();
    }
})
</script>

<template>
  <div>
    <slot />
  </div>
</template>
