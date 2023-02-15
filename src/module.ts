import { defineNuxtModule, addPlugin, createResolver, addImportsDir, addComponentsDir } from '@nuxt/kit'
import { AppConfig } from 'vue'
// Module options TypeScript inteface definition
export interface ModuleOptions {
  accessToken: string
  baseApiUrl?: string
  workerUrl?: string
  workerCount?: number
  prewarm?: boolean
}

export type ExtendedAppConfig = AppConfig & { _MAPBOX_CONFIG: ModuleOptions }

export default defineNuxtModule<ModuleOptions>({
  meta: {
    name: 'nuxt-mapbox',
    configKey: 'mapbox'
  },
  // Default configuration options of the Nuxt module
  defaults: {
    accessToken: '',
  },
  setup (options, nuxt) {
    const resolver = createResolver(import.meta.url)

    nuxt.options.css.push('mapbox-gl/dist/mapbox-gl.css')
    nuxt.options.app.head.link?.push({rel: 'stylesheet', href: 'https:/api.mapbox.com/mapbox-gl-js/plugins/mapbox-gl-geocoder/v5.0.0/mapbox-gl-geocoder.css', type: 'text/css'})
    nuxt.options.app.head.script?.push({ src: 'https://api.mapbox.com/mapbox-gl-js/v2.12.0/mapbox-gl.js' })
    nuxt.options.app.head.script?.push({ src: 'https://api.mapbox.com/mapbox-gl-js/plugins/mapbox-gl-geocoder/v5.0.0/mapbox-gl-geocoder.min.js' })

    const appConfig = nuxt.options.appConfig
    appConfig._MAPBOX_CONFIG = options;

    // Do not add the extension since the `.ts` will be transpiled to `.mjs` after `npm run prepack`
    addPlugin(resolver.resolve('./runtime/plugin.client'))
    addImportsDir(resolver.resolve('./runtime/composables'))
    addComponentsDir({
      path: resolver.resolve('./runtime/components'),
      prefix: 'mapbox'
    })
    
  }
})
