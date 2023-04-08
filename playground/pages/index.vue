<template>
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
        source-id="geojson"
        :layer="{
          source: 'geojson',
          id: 'geojson-layer',
          type: 'fill'
        }"
        @click="showAlert"
      />
      <MapboxSource 
        source-id="geojson"
        :source="{
          type: 'geojson',
          data: '/test.geojson'
        }"
      />
      <MapboxDefaultMarker 
        marker-id="marker1"
        :options="{}"
        :lnglat="[90, 0]"
      >
        <MapboxDefaultPopup
          popup-id="popup1"
          :lnglat="[0, 0]"
          :options="{
            closeOnClick: false
          }"
        >
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
    <NuxtLink to="/test">TEST</NuxtLink>
  </div>
</template>

<script setup>
  function showAlert() {
    alert("Wow")
  }
</script>