# Nuxt-Mapbox
## Elegant Mapbox integration with Nuxt

[![npm version][npm-version-src]][npm-version-href]
[![npm downloads][npm-downloads-src]][npm-downloads-href]
[![License][license-src]][license-href]

> 

- [✨ &nbsp;Release Notes](/CHANGELOG.md)
<!-- - [📖 &nbsp;Documentation](https://example.com) -->

## Features

<!-- Highlight some of the features your module provide here -->
- 🏗 &nbsp;Easily add Mapbox to your Nuxt app with Vue components
- 🌎 &nbsp;useMapbox Composable for easy access
- 👷 &nbsp;defineMapboxMarker & defineMapboxPopup for making custom components
- 📖 &nbsp;Supports many map instances across routes

### TODO

- [x] ~~Popup~~
- [x] ~~Marker~~
- [ ] Add rest of global properties to config
- [ ] Event Listeners
- [ ] Unit tests
- [ ] Custom Control Component?

## Quick Setup

1. Add `nuxt-mapbox` dependency to your project

```bash
# Using pnpm
pnpm add -D nuxt-mapbox

# Using yarn
yarn add --dev nuxt-mapbox

# Using npm
npm install --save-dev nuxt-mapbox
```

2. Add `nuxt-mapbox` to the `modules` section of `nuxt.config.ts`

```js
export default defineNuxtConfig({
  modules: [
    'nuxt-mapbox'
  ]
})
```

## Usage
View the [Mapbox GL JS Docs](https://docs.mapbox.com/mapbox-gl-js/guides/) for reference.

Map instances are created with components. You can provide all the options through component props

Example:
```html
    <MapboxMap
      map-id="{ID}"
      style="position: absolute; top: 0; bottom: 0; left: 250px; width: 500px;"
      :options="{
        style: 'mapbox://styles/mapbox/light-v11', // style URL
        center: [-68.137343, 45.137451], // starting position
        zoom: 5 // starting zoom
      }"
    >
```

You can add Layers & Controls by nesting their components inside the Map

Examples:

```html
    <MapboxMap>
      <MapboxSource 
        source-id="geojson"
        :source="{
          type: 'geojson',
          data: '/test.geojson'
        }"
      />
      <MapboxLayer
        source-id="geojson"
        :layer="{
          source: 'geojson',
          id: 'geojson-layer',
          type: 'fill'
        }"
      />
    </MapboxMap>
```

```html
    <MapboxMap>
      <MapboxLayer
        source-id="{ID}"
        :source="{
          type: 'geojson',
          data: '/test.geojson'
        }"
        :layer="{
          source: '{ID}',
          id: 'geojson-layer',
          type: 'fill'
        }"
      />
      <MapboxFullscreenControl />
    </MapboxMap>
```

You can access the map instance with the useMapbox composable. You must provide the map id.

The map instance will not be available until the page is fully loaded, so you must access it through a callback

```js
    useMapbox(mapId, (map) => {
      // Do whatever with map here
    })
```

You can access the map instance ref directly with _useMapboxInstance

**NOTE: The map instance will be null until is initialized so you cannot access it directly on setup. Use a watcher as shown or useMapbox instead:**

```js
    const map = _useMapboxInstance(mapId)
    watch(map, () => {
      if (map.value)
        // Do whatever with map
    })
```

### Custom Popups & Markers

While it is recommended to use the default popup & marker components, making your own is easy using defineMapboxMarker & defineMapboxPopup.

By passing a [template ref](https://vuejs.org/guide/essentials/template-refs.html) you can put custom html directly into your component

Examples:
```js
      const popup = defineMapboxPopup(popupId, options, templateRef)
      popup?.setLngLat(lnglat)
```

**NOTE: Because of the way markers are implemented in Mapbox, if passing a template ref to defineMapboxPopup you have to define properties in a callback like so:**
```js
    const markerRef = defineMapboxMarker(markerId, options, templateRef, (marker) => {
        marker.setLngLat([110, 6])
    })
```

## Development

```bash
# Install dependencies
npm install

# Generate type stubs
npm run dev:prepare

# Develop with the playground
npm run dev

# Build the playground
npm run dev:build

# Run ESLint
npm run lint

# Run Vitest
npm run test
npm run test:watch

# Release new version
npm run release
```

<!-- Badges -->
[npm-version-src]: https://img.shields.io/npm/v/nuxt-mapbox/latest.svg?style=flat&colorA=18181B&colorB=28CF8D
[npm-version-href]: https://npmjs.com/package/nuxt-mapbox

[npm-downloads-src]: https://img.shields.io/npm/dm/nuxt-mapbox.svg?style=flat&colorA=18181B&colorB=28CF8D
[npm-downloads-href]: https://npmjs.com/package/nuxt-mapbox

[license-src]: https://img.shields.io/npm/l/nuxt-mapbox.svg?style=flat&colorA=18181B&colorB=28CF8D
[license-href]: https://npmjs.com/package/nuxt-mapbox
