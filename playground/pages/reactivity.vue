<template>
  <!-- <div>
      <button @click="showAlert">click me!</button>
    </div> -->
  <div>
    <MapboxMap
      map-id="map2"
      style="top: 80px"
      :options="{
        style: 'mapbox://styles/mapbox/streets-v12', // style URL
        center: [100.0, 0.0], // starting position [lng, lat]
        zoom: 3, // starting zoom
      }"
      @load="showAlert"
    >
      <MapboxLayer
        v-if="enabled"
        :layer="{
          source: 'geojson',
          id: 'geojson-layer',
          type: 'fill',
        }"
        @click="showAlert"
      />
      <MapboxSource
        v-if="enabled"
        source-id="geojson"
        :source="source"
      />
      <MapboxDefaultMarker
        marker-id="marker1"
        :options="{}"
        :lnglat="lnglat"
      >
        <MapboxDefaultPopup
          popup-id="popup1"
          :lnglat="[0, 0]"
          :options="{
            closeOnClick: false,
          }"
        >
          <div>
            <button @click="showAlert">
              click me!
            </button>
          </div>
          <h1 class="test">
            Hello World!
          </h1>
        </MapboxDefaultPopup>
      </MapboxDefaultMarker>
      <TestMarker
        marker-id="marker2"
        :options="{}"
      />
      <TestControl />
      <MapboxGeolocateControl position="top-left" />
    </MapboxMap>
    <NuxtLink to="/test">
      TEST
    </NuxtLink>
    <a @click="enabled = !enabled">Toggle Data</a>
    <a @click="changeData">Change Data</a>
    <a @click="changeLngLat">Move Marker</a>
  </div>
</template>
  
  <script setup>
  import { ref } from '#imports';
  function showAlert() {
    alert('Wow');
  }
  
  const source = ref({
    type: 'geojson',
    data: '/test.geojson',
  });
  
  const enabled = ref(true);
  
  function changeData() {
    source.value = {
      type: 'geojson',
      data: {
        type: 'Feature',
        geometry: {
          type: 'Polygon',
          // These coordinates outline Maine.
          coordinates: [
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
              [-67.13734, 45.13745],
            ],
          ],
        },
      },
    };
  }
  
  const lnglat = ref([90, 0]);
  function changeLngLat() {
    lnglat.value = [lnglat.value[0] + 1, lnglat.value[1] + 1];
  }
  </script>
  