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
- 📖 &nbsp;Supports many map instances across routes

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

Example:
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
    </MapboxMap>
```

You can access the map instance with the useMapbox composable. You must provide the map id.

**NOTE: The map instance will be null until is initialized so you cannot access it directly on setup. Use a watcher as shown:**
```js
    const map = useMapbox(mapId)
    watch(map, () => {
      if (map.value)
        // Do whatever with map
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
