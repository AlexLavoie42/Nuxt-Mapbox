# Nuxt-Mapbox
## Elegant Mapbox integration with Nuxt
### Now With Persistent Maps!
![](persistent_demo.gif)


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
# Using pnpm
pnpm add -D nuxt-mapbox mapbox-gl

# Using yarn
yarn add --dev nuxt-mapbox mapbox-gl

# Using npm
npm install --save-dev nuxt-mapbox mapbox-gl
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

### Persistent Map Instances
For map instances to be persistent across routes, `keepalive` must be set to `true` in [nuxt.config.ts](https://nuxt.com/docs/guide/directory-structure/pages#keepalive).
This is done by default, but you can disable it by setting `keepalive` to `false`

### Events

All Map events are accessible directly through the component (With full Typescript support!)

View a list of events in the [Mapbox Docs](https://docs.mapbox.com/mapbox-gl-js/api/map/#map-events)

Example:

```html
    <MapboxMap
      ...
      @load="exampleFunction"
      @click="exampleFunction"
      @resize="exampleFunction"
    >
```

You can access [events directly on layers](https://docs.mapbox.com/mapbox-gl-js/api/map/#map.event:click) as well

Example:

```html
    <MapboxLayer
      ...
      @click="exampleFunction"
    >
```


### Linking Popups & Markers
You can have a popup linked to a marker by simply nesting the popup component inside the marker.
Example:

```html
    <MapboxDefaultMarker 
      marker-id="marker1"
      :options="{}"
      :lnglat="[110, 5]"
    >
      <MapboxDefaultPopup
        popup-id="popup1"
        :lnglat="[100, 0]"
        :options="{
          closeOnClick: false
        }"
      >
        <h1 class="test">
          Hello World!
        </h1>
      </MapboxDefaultPopup>
    </MapboxDefaultMarker>
```

### Map Instance

You can access the map instance with the useMapbox composable. You must provide the map id.

The map instance will not be available until the page is fully loaded, so you must access it through a callback

```js
    useMapbox(mapId, (map) => {
      // Do whatever with map here
    })
```

You can access the map instance ref directly with useMapboxInstance

**NOTE: The map instance will be null until is initialized so you cannot access it directly on setup. Use a watcher as shown or useMapbox instead:**

```js
    const map = useMapboxInstance(mapId)
    watch(map, () => {
      if (map.value)
        // Do whatever with map
    })
```


## Custom Components
While it is recommended to use the default components, making your own is easy with the built in composables!


### Custom Popups & Markers

You can use ```defineMapboxPopup``` & ```defineMapboxMarker``` for custom marker & popup components
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

### Custom Controls

You can make your own control with the defineMapboxControl composable.

Example:
```js
    useMapbox(mapID, (map) => {
        if (htmlRef.value) {
            const control = defineMapboxControl((_map) => {
                return htmlRef.value as HTMLElement;
            }, (map) => {})
            map.addControl(control);
        }
    })
```


### Custom Map Component

If you would like to make your own map component, you can use ```defineMapboxInstance```

Example:
```js
    // NOTE: Map instance will be null on server & until it is loaded on client
    const map = defineMapboxInstance(MAP_DIV_ID, options);
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
