import { useState } from '#app';
import {default as mapboxgl} from 'mapbox-gl'
import 'mapbox-gl/dist/mapbox-gl.css';
import { ExtendedAppConfig } from '../../module';
import { useAppConfig, defu } from '#imports'

export function initMapbox() {
    if (process.server) return;

    const init = useState('mapbox_init', () => false);
    if (init.value) return;
    init.value = true;

    const appConfig = useAppConfig() as ExtendedAppConfig
    mapboxgl.accessToken = appConfig._MAPBOX_CONFIG.accessToken;
    if (appConfig._MAPBOX_CONFIG.baseApiUrl) mapboxgl.baseApiUrl = appConfig._MAPBOX_CONFIG.baseApiUrl;
    //@ts-ignore
    if (appConfig._MAPBOX_CONFIG.workerUrl) mapboxgl.workerUrl = appConfig._MAPBOX_CONFIG.workerUrl;
    if (appConfig._MAPBOX_CONFIG.workerCount) mapboxgl.workerCount = appConfig._MAPBOX_CONFIG.workerCount;
    if (appConfig._MAPBOX_CONFIG.prewarm) mapboxgl.prewarm();
    if (appConfig._MAPBOX_CONFIG.RTLTextPlugin) {
        const defaultPlugin = 'https://api.mapbox.com/mapbox-gl-js/plugins/mapbox-gl-rtl-text/v0.2.3/mapbox-gl-rtl-text.js';
        if (typeof appConfig._MAPBOX_CONFIG.RTLTextPlugin === 'boolean') appConfig._MAPBOX_CONFIG.RTLTextPlugin = {
            pluginURL: defaultPlugin,
            lazy: false
        };
        // TODO: Callback?
        mapboxgl.setRTLTextPlugin(appConfig._MAPBOX_CONFIG.RTLTextPlugin.pluginURL || defaultPlugin, () => {}, appConfig._MAPBOX_CONFIG.RTLTextPlugin.lazy || false);
    }
}