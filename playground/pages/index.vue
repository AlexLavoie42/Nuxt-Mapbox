<template>
  <div>
    <MapboxMap
      v-if="showMap"
      map-id="map2"
      style="top: 80px"
      :options="{
        style, // style URL
        center: [100.0, 0.0], // starting position [lng, lat]
        zoom: 3, // starting zoom
      }"
      :style="{
        height: `${height}px`
      }"
      @styleload="() => { console.log('style loaded') }"
    >
      <MapboxLayer
        v-if="enabled"
        :layer="layerRef"
        @click="showAlert"
      />
      <MapboxSource 
        v-if="enabled"
        source-id="geojson"
        :source="source"
      />
      <MapboxDefaultMarker
        marker-id="customHTMLMarker"
        :lnglat="{ lng: 87, lat: 12 }"
        :options="{
          draggable: true
        }"
      >
        <template #marker>
          <button @click="showAlert">Map Button!</button>
        </template>
      </MapboxDefaultMarker>
      <MapboxDefaultMarker 
        v-model:lnglat="lnglat"
        marker-id="marker1"
        :options="{
          draggable: true
        }"
        @dragend="() => { console.log('dragend') }"
      >
        <MapboxDefaultPopup
          popup-id="popup1"
          :lnglat="[0, 0]"
          :options="{
            closeOnClick: false
          }"
        >
          <h1 class="test">
            Hello World! {{ lnglat }}
            <button @click="showAlert">
              Click Me!
            </button>
          </h1>
        </MapboxDefaultPopup>
      </MapboxDefaultMarker>
      <TestMarker 
        marker-id="marker2"
        :options="{
          lnglat
        }"
      />
      <TestControl />
      <MapboxGeocoder
        ref="geocoderRef"
        v-model="geocoderRes"
        position="top-left"
        @result="(result) => { console.log(result) }"
      />
    </MapboxMap>
    <NuxtLink to="/test">
      TEST
    </NuxtLink>
    <button @click="enabled = !enabled">
      Toggle Data
    </button>
    <button @click="changeData">
      Change Data
    </button>
    <button @click="changeColor">
      Change Color
    </button>
    <button @click="changeLngLat">
      Move Marker
    </button>
    <button @click="changeStyle">
      Random Style
    </button>
    <button @click="changeHeight">
      Resize Map
    </button>
    <button @click="toggleMap">
      Toggle Map
    </button>
  </div>
</template>

<script setup lang="ts">
import {computed, ref, useMapboxMarkerRef, useMapboxPopup, useMapboxPopupRef, useMapboxRef} from "#imports"
import { MapboxGeocoder } from '#components'
import type { FillLayer } from "mapbox-gl"
function showAlert() {
  alert("Wow")
}

const source = ref({
  type: 'geojson',
  data: '/test.geojson'
});

const showMap = ref(true);

function toggleMap() {
    showMap.value = !showMap.value;
}

const enabled = ref(true);

const mapRef = useMapboxRef('map2');

const mapStyle = computed(() => {
  return mapRef.value?.getStyle();
});

const marker = useMapboxMarkerRef('');
const popup = useMapboxPopupRef('');

const markerLatLng = computed(() => {
  return marker.value?.getLngLat();
});


function changeData() {
  source.value = {
    type: 'geojson',
    data: {
      'type': 'Feature',
      'geometry': {
        'type': 'Polygon',
        // These coordinates outline Maine.
        'coordinates': [
          [
            [-67.13734, 45.13745],
            [-66.96466, 44.8097],
            [-68.03252, 44.3252],
            [-69.06, 43.98],
            [-70.11617, 43.68405],
            [-70.64573, 43.09008],
            [-70.75102, 43.08003],
            [-70.79761, 43.21973],
            [-70.98176, 43.36789],
            [-70.94416, 43.46633],
            [-71.08482, 45.30524],
            [-70.66002, 45.46022],
            [-70.30495, 45.91479],
            [-70.00014, 46.69317],
            [-69.23708, 47.44777],
            [-68.90478, 47.18479],
            [-68.2343, 47.35462],
            [-67.79035, 47.06624],
            [-67.79141, 45.70258],
            [-67.13734, 45.13745]
          ]
        ]
      }
    }
  }
}

const lnglat = ref([90, 0] as [number, number]);
function changeLngLat() {
  lnglat.value = [lnglat.value[0] + 1, lnglat.value[1] + 1];
}

const style = ref('mapbox://styles/mapbox/standard');
function changeStyle() {
    const styles = ['satellite-streets-v12', 'light-v11', 'dark-v11', 'streets-v12'];
    const randStyle = styles[Math.floor(Math.random() * styles.length)];
    style.value = `mapbox://styles/mapbox/${randStyle}`;
}

const height = ref(800);

function changeHeight() {
  height.value = height.value - 100;
}

const geocoderRef = ref<InstanceType<typeof MapboxGeocoder>>()
const geocoder = computed(() => geocoderRef.value?.geocoder);

const geocoderRes = ref();

const layerRef = ref<FillLayer>({
  source: "geojson",
  id: "geojson-layer",
  type: "fill",
  paint: {
    "fill-color": "rgb(0,0,0)",
  },
});

function changeColor() {
  const r = Math.floor(Math.random() * 256);
  const g = Math.floor(Math.random() * 256);
  const b = Math.floor(Math.random() * 256);
  layerRef.value.paint!["fill-color"] = `rgb(${r}, ${g}, ${b})`;
}
</script>
