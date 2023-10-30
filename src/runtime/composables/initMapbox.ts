import { useState } from '#app';
import {default as mapboxgl} from 'mapbox-gl'
import 'mapbox-gl/dist/mapbox-gl.css';
import type { ExtendedRuntimeConfig } from '../../module';
import { useRuntimeConfig } from '#imports'

export function initMapbox() {
    if (process.server) return;

    const init = useState('mapbox_init', () => false);
    if (init.value) return;
    init.value = true;

    const runtimeConfig = useRuntimeConfig() as ExtendedRuntimeConfig;
    mapboxgl.accessToken = runtimeConfig.public.mapbox.accessToken;
    if (runtimeConfig.public.mapbox.baseApiUrl) mapboxgl.baseApiUrl = runtimeConfig.public.mapbox.baseApiUrl;
    //@ts-ignore
    if (runtimeConfig.public.mapbox.workerUrl) mapboxgl.workerUrl = runtimeConfig.public.mapbox.workerUrl;
    if (runtimeConfig.public.mapbox.workerCount) mapboxgl.workerCount = runtimeConfig.public.mapbox.workerCount;
    if (runtimeConfig.public.mapbox.prewarm) mapboxgl.prewarm();
    if (runtimeConfig.public.mapbox.RTLTextPlugin) {
        const defaultPlugin = 'https://api.mapbox.com/mapbox-gl-js/plugins/mapbox-gl-rtl-text/v0.2.3/mapbox-gl-rtl-text.js';
        if (typeof runtimeConfig.public.mapbox.RTLTextPlugin === 'boolean') runtimeConfig.public.mapbox.RTLTextPlugin = {
            pluginURL: defaultPlugin,
            lazy: false
        };
        // TODO: Callback?
        mapboxgl.setRTLTextPlugin(runtimeConfig.public.mapbox.RTLTextPlugin.pluginURL || defaultPlugin, () => {}, runtimeConfig.public.mapbox.RTLTextPlugin.lazy || false);
    }
}