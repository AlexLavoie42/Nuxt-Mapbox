<!-- eslint-disable vue/multi-word-component-names -->
<script setup lang="ts">
import { AnySourceData, GeoJSONSource, VectorSourceImpl, ImageSource, RasterSource, Map } from "mapbox-gl";
import { inject, onMounted, onUnmounted, watch, useMapbox, computed, useMapboxInstance } from "#imports";

interface Props {
    sourceId: string;
    source: AnySourceData;
}
const props = defineProps<Props>();

const mapId = inject<string>("MapID");
if (!mapId) throw "Mapbox Source must be placed inside a Map component";

const mapRef = useMapboxInstance(mapId);
const sourceExists = computed(() => {
    return !!mapRef.value?.getSource(props.sourceId);
});


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
        // @ts-ignore TODO: Figure out how to type this. Seems like mapbox issue
        (source as GeoJSONSource).setData(props.source.data);
    }
    if (props.source.type === 'vector' && (props.source.tiles || props.source.url)) {
        if (props.source.tiles) {
            (source as VectorSourceImpl).setTiles(props.source.tiles);
        }
        if (props.source.url) {
            (source as VectorSourceImpl).setUrl(props.source.url);
        }
        // @ts-ignore TODO: Not even the reload function?
        (source as VectorSourceImpl).reload();
    }
    if (props.source.type === 'image' && props.source.url) {
        (source as ImageSource).updateImage(props.source);
    }
    if (props.source.type === 'raster' && (props.source.url || props.source.tiles)) {
        if (props.source.url) {
            // @ts-ignore TODO: Types broken once again
            (source as RasterSource).setUrl(props.source.url);
        }
        if(props.source.tiles) {
            // @ts-ignore TODO: Types broken once again
            (source as RasterSource).setTiles(props.source.tiles);
        }
        // @ts-ignore TODO: Not even the reload function?
        (source as RasterSource).reload();
    }
})
</script>

<template>
  <div>
    <slot />
  </div>
</template>
