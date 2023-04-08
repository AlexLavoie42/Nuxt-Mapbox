export default defineNuxtConfig({
  modules: ['../src/module', '@nuxt/devtools'],
  app: {
    keepalive: true
  },
  mapbox: {
    accessToken: 'pk.eyJ1IjoiYWxleGxhdm9pZSIsImEiOiJja3RhZmpqZmoxbGlzMndvOGtueDFxYTU3In0.nyGbO7RFkmwC_kYseOZ4Dw'
  }
})
