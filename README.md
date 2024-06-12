# Nuxt-Mapbox
## Elegant Mapbox integration with Nuxt

### [📖 Check out the new docs!](https://alexlavoie42.github.io/Nuxt-Mapbox/)

----------------------------------------------------------------

[![npm version][npm-version-src]][npm-version-href]
[![npm downloads][npm-downloads-src]][npm-downloads-href]
[![License][license-src]][license-href]

> 

- [✨ &nbsp;Release Notes](https://github.com/AlexLavoie42/Nuxt-Mapbox/blob/main/CHANGELOG.md)
- [🏀 &nbsp;Online playground](https://stackblitz.com/github/AlexLavoie42/Nuxt-Mapbox?file=playground%2Fpages%2Findex.vue)
<!-- - [📖 &nbsp;Documentation](https://example.com) -->

## Features

<!-- Highlight some of the features your module provide here -->
- 🏗 &nbsp;Easily add Mapbox to your Nuxt app with Vue components
- 🌎 &nbsp;useMapbox Composable for easy access
- 👷 &nbsp;defineMapboxMarker & defineMapboxPopup for making custom components
- 🎛️ &nbsp;defineMapboxControl for creating your own controls
- 📖 &nbsp;Persistent map instances across routes

## Quick Setup

1. Add `nuxt-mapbox` & `mapbox-gl` dependencies to your project

```bash
npx nuxi@latest module add nuxt-mapbox
npm install --save-dev mapbox-gl
```

2. Add `nuxt-mapbox` to the `modules` section of `nuxt.config.ts`

```js
export default defineNuxtConfig({
  modules: [
    'nuxt-mapbox'
  ]
})
```

3. Add your Mapbox API key to the `mapbox` section of `nuxt.config.ts`

```js
export default defineNuxtConfig({
  modules: [
    'nuxt-mapbox'
  ],
  mapbox: {
    accessToken: '{API_KEY}'
  }
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
    />
```

You can add Layers, Sources & Controls by nesting their respective components inside the Map

Examples:

```html
    <MapboxMap
      ...
    >
      <MapboxSource 
        source-id="{ID}"
        :source="{
          type: 'geojson',
          data: '/test.geojson'
        }"
      />
      <MapboxLayer
        :layer="{
          source: '{ID}',
          id: 'geojson-layer',
          type: 'fill'
        }"
      />
      <MapboxGeolocateControl position="top-left" />
    </MapboxMap>
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
