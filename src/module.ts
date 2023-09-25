import { defineNuxtModule, addPlugin, createResolver, addImportsDir, addComponentsDir } from '@nuxt/kit'
import { AppConfig } from '@nuxt/schema'
// Module options TypeScript inteface definition
export interface NuxtMapboxOptions {
  accessToken: string
  baseApiUrl?: string
  workerUrl?: string
  workerCount?: number
  prewarm?: boolean,
}
export interface InternalOptions {
  persistent?: boolean
}

type ModuleOptions = NuxtMapboxOptions & InternalOptions;

export type ExtendedAppConfig = AppConfig & { _MAPBOX_CONFIG: NuxtMapboxOptions }

export type MapboxComponentOptions = Omit<mapboxgl.MapboxOptions, "container">;

export interface MapboxInstancesObject {
  [key: string]: { map: mapboxgl.Map, loaded: boolean }
}
export interface MapboxPopupsObject {
[key: string]: mapboxgl.Popup
}
export interface MapboxMarkerObject {
[key: string]: mapboxgl.Marker
}

export default defineNuxtModule<ModuleOptions>({
  meta: {
    name: 'nuxt-mapbox',
    configKey: 'mapbox'
  },
  // Default configuration options of the Nuxt module
  defaults: {
    accessToken: '',
    persistent: true,
  },
  setup (options, nuxt) {
    const resolver = createResolver(import.meta.url)

    // nuxt.options.css.push('mapbox-gl/dist/mapbox-gl.css')
    // nuxt.options.app.head.link?.push({rel: 'stylesheet', href: 'https://api.mapbox.com/mapbox-gl-js/plugins/mapbox-gl-geocoder/v5.0.0/mapbox-gl-geocoder.css', type: 'text/css'})
    // nuxt.options.app.head.script?.push({ src: 'https://api.mapbox.com/mapbox-gl-js/v2.12.0/mapbox-gl.js' })
    // nuxt.options.app.head.script?.push({ src: 'https://api.mapbox.com/mapbox-gl-js/plugins/mapbox-gl-geocoder/v5.0.0/mapbox-gl-geocoder.min.js' })
    if (options.persistent) nuxt.options.app.keepalive = true;

    // Fixes #2 (https://github.com/AlexLavoie42/Nuxt-Mapbox/issues/2)
    // Might be related? (https://github.com/nuxt/nuxt/issues/19426)
    nuxt.options.alias['mapbox-gl'] = 'mapbox-gl'
    
    const appConfig = nuxt.options.appConfig as ExtendedAppConfig
    appConfig._MAPBOX_CONFIG = {
      accessToken: options.accessToken,
      baseApiUrl: options.baseApiUrl,
      workerUrl: options.workerUrl,
      workerCount: options.workerCount,
      prewarm: options.prewarm
    }

    // Do not add the extension since the `.ts` will be transpiled to `.mjs` after `npm run prepack`
    addImportsDir(resolver.resolve('./runtime/composables'))
    addComponentsDir({
      path: resolver.resolve('./runtime/components'),
      prefix: 'mapbox'
    })
    
  }
})
