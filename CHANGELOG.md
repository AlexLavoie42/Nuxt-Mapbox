# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

# v1.4.0
## Added
- Old `useMapbox` now named `useMapboxBeforeLoad` for people using v1.3.4
- `defineMapboxMarker` & `defineMapboxPopup` now accept `options` as a ref, providing full reactivity.
- `useMapboxMarker` & `useMapboxPopup` composables
- Popup HTML is now reactive to changes
- Auto map resizing
- Better named `useMapboxRef` function instead of `useMapboxInstance`
## Fixed
- Marker `dragend` fix
- Fixed layer & source reloading
- Removed `script` import from CDN using `as default` and dynamic imports

# v1.3.9
## Fixed
- Fixed bug when `source` is removed before `layer`
- Removed unnecessary `mapboxgl` from geocoder options

# v1.3.8
## Added
- beforeLayer prop for layers so you can ensure proper layer order
## Fixed
- Fixed markers getting added with no latlng
- Fixed useMapbox not getting called while sources/layers are loading
- Fixed performance issues with many layers
    - (Only adding map event listeners when events are actually being used)

# v1.3.7
## Fixed
- useMapbox always fires properly

# v1.3.6
## Fixed
- Custom geocoder import
- Fixed controls not loading

# v1.3.5
## Added
- Custom geocoder (Lets you use your own inputs outside of a map)
- Allowed geocoder to be placed outside map
## Fixed
- Deleting sources & controls when component is removed
- Reacting to prop changes for Popups & Markers

# v1.3.4
## Added
- Updated Nuxt to 3.5.0
- Added `persistent` option so `keepalive` can properly be disabled

# v1.3.3
## Added
- Made `source-id` in layer optional

# v1.3.2
## Fixed
- Fixed bug with style url

# v1.3.1
## Added
- Setting `keepalive` to true so persistent maps is enabled by default.

# v1.3.0
## Added
- Persistent Map Instances
- Ability to attach Popup to Marker with slot
- Position prop for controls
- defineMapboxControl for custom controls

# v1.2.3
## Fixed
- Fixed bug with map instances not being cleaned up.
- Made sure map controls & layers only get added on mount (probably unnecessary with useMapbox).

## v1.2.2
## Added
- Popup & Marker events

## Changed
- Passed Map instance to certain Map events so you dont need useMapbox
- Default 'options' prop so you dont need to pass empty object

## v1.2.1
## Added
- Events directly on layer components


## v1.2.0
## Changed
- BREAKING: `apiKey` renamed to `accessToken` to match mapbox
- Renamed _useMapboxInstance to useMapboxInstance

## Added
- Extended config options
- Component events from mapbox
- Exposed defineMapboxInstance for custom map components

## v1.1.7
## Fixed
- Fixed `Map markers are disabled.` with geocoder

## v1.1.6
## Fixed
- Import fix

## v1.1.0
### Added

- Default Popup & Marker components
- defineMapboxMarker & defineMapboxPopup for easily making custom components

### v1.0.1
### Added

- New syntax for useMapbox with callback

### Added

- Added Geocoder Control