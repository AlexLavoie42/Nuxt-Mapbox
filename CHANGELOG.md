# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

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