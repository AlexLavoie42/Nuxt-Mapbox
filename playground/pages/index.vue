<template>
  <div>
    <MapboxMap
      map-id="map2"
      style="position: absolute; top: 0; bottom: 0; width: 100%;"
      :options="{
        style: 'mapbox://styles/mapbox/streets-v12', // style URL
        center: [100.0, 0.0], // starting position [lng, lat]
        zoom: 3, // starting zoom
      }"
    >
      <MapboxLayer
        source-id="geojson"
        :source="{
          type: 'geojson',
          data: '/test.geojson'
        }"
        :layer="{
          source: 'geojson',
          id: 'geojson-layer',
          type: 'fill'
        }"
      />
    </MapboxMap>
  </div>
</template>
  
  <script setup>

  </script>
  