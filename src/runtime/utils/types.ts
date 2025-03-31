import type { RuntimeConfig, AppConfig } from '@nuxt/schema';
import type { MapOptions, Map, Popup, Marker } from 'mapbox-gl';

// Module options TypeScript inteface definition
export interface NuxtMapboxOptions {
  accessToken: string
  baseApiUrl?: string
  workerUrl?: string
  workerCount?: number
  prewarm?: boolean,
  RTLTextPlugin?: boolean | {
    pluginURL: string,
    lazy?: boolean
  }
}
export interface InternalOptions {
  persistent?: boolean
}

export type ExtendedAppConfig = AppConfig & { _MAPBOX_CONFIG: NuxtMapboxOptions }
export type ExtendedRuntimeConfig = RuntimeConfig & { public: { mapbox: NuxtMapboxOptions } }

export type MapboxComponentOptions = Omit<MapOptions, "container">;

export interface MapboxInstancesObject {
  [key: string]: { map: Map, loaded: boolean }
}
export interface MapboxPopupsObject {
[key: string]: Popup
}
export interface MapboxMarkerObject {
[key: string]: Marker
}