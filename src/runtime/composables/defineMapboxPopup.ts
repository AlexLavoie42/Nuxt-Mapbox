import { ref, Ref } from 'vue';
import { watch } from 'vue';
import { useNuxtApp } from '#app';
import { Popup, PopupOptions } from "mapbox-gl";
import { inject } from 'vue';
import { useMapbox } from './useMapbox';

/**
 * Create a new Popup instance for a component. Will be automatically added to map if it is nested in MapboxMap
 * 
 * @param popupHTML Optionally pass a template ref to automatically put html inside popup
 * @param mapID Optionally pass the mapID manually. Will be auto injected if component is nested in MapboxMap
 */
export function defineMapboxPopup(popupID: string, options: PopupOptions, popupHTML: Ref<HTMLElement | null> = ref(null), mapID: string = ""): Popup | undefined {
    const mapId = inject<string>('MapID')
    if (!useNuxtApp().$mapboxInitPopup) return; // So we dont run on server.
    
    useNuxtApp().$mapboxInitPopup(popupID, options)
    const popupInstance = useNuxtApp().$mapboxPopupInstances().value[popupID]
    
    useMapbox(mapId || mapID, (map) => {
        popupInstance.addTo(map)
    })

    watch(popupHTML, () => {
        if (popupHTML.value) {
            popupInstance.setHTML(popupHTML.value.innerHTML)
            popupHTML.value.remove()
        }
    })


    return popupInstance;
}