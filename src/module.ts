import { defineNuxtModule, createResolver, addImportsDir, addComponentsDir } from '@nuxt/kit'
import { defu } from 'defu'
import type { ExtendedAppConfig, InternalOptions, NuxtMapboxOptions } from './runtime/utils/types';

type ModuleOptions = NuxtMapboxOptions & InternalOptions;

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
      prewarm: options.prewarm,
      RTLTextPlugin: options.RTLTextPlugin
    }

    nuxt.options.runtimeConfig.public.mapbox = defu(nuxt.options.runtimeConfig.public.mapbox as Record<string, any>, options)

    // Do not add the extension since the `.ts` will be transpiled to `.mjs` after `npm run prepack`
    addImportsDir(resolver.resolve('./runtime/composables'))
    addComponentsDir({
      path: resolver.resolve('./runtime/components'),
      prefix: 'mapbox'
    })
    
  }
})
