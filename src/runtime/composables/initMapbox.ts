import { useState } from '#app';
import {default as mapboxgl} from 'mapbox-gl'
import 'mapbox-gl/dist/mapbox-gl.css';
import { ExtendedAppConfig } from '../../module';
import { useAppConfig } from '#imports'

export function initMapbox() {
    if (process.server) return;

    const init = useState('mapbox_init', () => false);
    if (init.value) return;
    init.value = true;

    const appConfig = useAppConfig() as ExtendedAppConfig
    //@ts-ignore
    mapboxgl.accessToken = appConfig._MAPBOX_CONFIG.accessToken;
    //@ts-ignore
    if (appConfig._MAPBOX_CONFIG.baseApiUrl) mapboxgl.baseApiUrl = appConfig._MAPBOX_CONFIG.baseApiUrl;
    //@ts-ignore
    if (appConfig._MAPBOX_CONFIG.workerUrl) mapboxgl.workerUrl = appConfig._MAPBOX_CONFIG.workerUrl;
    //@ts-ignore
    if (appConfig._MAPBOX_CONFIG.workerCount) mapboxgl.workerCount = appConfig._MAPBOX_CONFIG.workerCount;
    //@ts-ignore
    if (appConfig._MAPBOX_CONFIG.prewarm) mapboxgl.prewarm();
}