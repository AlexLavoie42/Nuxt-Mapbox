import { defineNuxtModule, addPlugin, createResolver, addImportsDir, addComponentsDir } from '@nuxt/kit'
import { AppConfig } from 'vue'
// Module options TypeScript inteface definition
export interface ModuleOptions {
  apiKey: string
}

export type ExtendedAppConfig = AppConfig & { _MAPBOX_API_KEY: string }

export default defineNuxtModule<ModuleOptions>({
  meta: {
    name: 'nuxt-mapbox',
    configKey: 'mapbox'
  },
  // Default configuration options of the Nuxt module
  defaults: {
    apiKey: ''
  },
  setup (options, nuxt) {
    const resolver = createResolver(import.meta.url)

    nuxt.options.css.push('mapbox-gl/dist/mapbox-gl.css')
    const appConfig = nuxt.options.appConfig as ExtendedAppConfig
    appConfig._MAPBOX_API_KEY = options.apiKey;

    // Do not add the extension since the `.ts` will be transpiled to `.mjs` after `npm run prepack`
    addPlugin(resolver.resolve('./runtime/plugin.client'))
    addImportsDir(resolver.resolve('./runtime/composables'))
    addComponentsDir({
      path: resolver.resolve('./runtime/components'),
      prefix: 'mapbox'
    })
    
  }
})
