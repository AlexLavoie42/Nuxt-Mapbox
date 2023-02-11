import { useNuxtApp } from '#app';
import { Popup, PopupOptions } from "mapbox-gl";
import { inject } from 'vue';

/**
 * @param mapID Optionally pass the mapID manually. Will be auto injected if component is nested in MapboxMap
 */
export function defineMapboxPopup(popupID: string, options: PopupOptions, mapID: string = ""): Popup {
    const mapId = inject<string>('MapID')

    useNuxtApp().$mapboxInitPopup()
    const popup = useNuxtApp().$mapboxPopupInstances().value[]
    return popup;
}