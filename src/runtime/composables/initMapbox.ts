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
    mapboxgl.accessToken = runtimeConfig._MAPBOX_CONFIG.accessToken;
    if (runtimeConfig._MAPBOX_CONFIG.baseApiUrl) mapboxgl.baseApiUrl = runtimeConfig._MAPBOX_CONFIG.baseApiUrl;
    //@ts-ignore
    if (runtimeConfig._MAPBOX_CONFIG.workerUrl) mapboxgl.workerUrl = runtimeConfig._MAPBOX_CONFIG.workerUrl;
    if (runtimeConfig._MAPBOX_CONFIG.workerCount) mapboxgl.workerCount = runtimeConfig._MAPBOX_CONFIG.workerCount;
    if (runtimeConfig._MAPBOX_CONFIG.prewarm) mapboxgl.prewarm();
    if (runtimeConfig._MAPBOX_CONFIG.RTLTextPlugin) {
        const defaultPlugin = 'https://api.mapbox.com/mapbox-gl-js/plugins/mapbox-gl-rtl-text/v0.2.3/mapbox-gl-rtl-text.js';
        if (typeof runtimeConfig._MAPBOX_CONFIG.RTLTextPlugin === 'boolean') runtimeConfig._MAPBOX_CONFIG.RTLTextPlugin = {
            pluginURL: defaultPlugin,
            lazy: false
        };
        // TODO: Callback?
        mapboxgl.setRTLTextPlugin(runtimeConfig._MAPBOX_CONFIG.RTLTextPlugin.pluginURL || defaultPlugin, () => {}, runtimeConfig._MAPBOX_CONFIG.RTLTextPlugin.lazy || false);
    }
}