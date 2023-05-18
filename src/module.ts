import { defineNuxtModule, addPlugin, createResolver, addImportsDir, addComponentsDir } from '@nuxt/kit'
import { AppConfig } from '@nuxt/schema'
// Module options TypeScript inteface definition
export interface MapboxOptions {
  accessToken: string
  baseApiUrl?: string
  workerUrl?: string
  workerCount?: number
  prewarm?: boolean,
}
export interface InternalOptions {
  persistent?: boolean
}

type ModuleOptions = MapboxOptions & InternalOptions;

export type ExtendedAppConfig = AppConfig & { _MAPBOX_CONFIG: MapboxOptions }

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

    nuxt.options.css.push('mapbox-gl/dist/mapbox-gl.css')
    nuxt.options.app.head.link?.push({rel: 'stylesheet', href: 'https://api.mapbox.com/mapbox-gl-js/plugins/mapbox-gl-geocoder/v5.0.0/mapbox-gl-geocoder.css', type: 'text/css'})
    nuxt.options.app.head.script?.push({ src: 'https://api.mapbox.com/mapbox-gl-js/v2.12.0/mapbox-gl.js' })
    nuxt.options.app.head.script?.push({ src: 'https://api.mapbox.com/mapbox-gl-js/plugins/mapbox-gl-geocoder/v5.0.0/mapbox-gl-geocoder.min.js' })
    if (options.persistent) nuxt.options.app.keepalive = true;
    
    const appConfig = nuxt.options.appConfig as ExtendedAppConfig
    appConfig._MAPBOX_CONFIG = {
      accessToken: options.accessToken,
      baseApiUrl: options.baseApiUrl,
      workerUrl: options.workerUrl,
      workerCount: options.workerCount,
      prewarm: options.prewarm
    }

    // Do not add the extension since the `.ts` will be transpiled to `.mjs` after `npm run prepack`
    addPlugin(resolver.resolve('./runtime/plugin.client'))
    addImportsDir(resolver.resolve('./runtime/composables'))
    addComponentsDir({
      path: resolver.resolve('./runtime/components'),
      prefix: 'mapbox'
    })
    
  }
})
