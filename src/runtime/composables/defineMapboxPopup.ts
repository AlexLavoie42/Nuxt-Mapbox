import { ref, Ref } from 'vue';
import { Popup, PopupOptions } from "mapbox-gl";
import { isRef, watch, useNuxtApp, inject, useMapbox } from '#imports';
import { useMutationObserver } from '@vueuse/core';
import { useState } from '#imports';
import { MapboxPopupsObject } from '../../module';

/**
 * Create a new Popup instance for a component. Will be automatically added to map if it is nested in MapboxMap
 * 
 * @param popupHTML Optionally pass a template ref to automatically put html inside popup
 * @param mapID Optionally pass the mapID manually. Will be auto injected if component is nested in MapboxMap
 */
export function defineMapboxPopup(popupID: string, options: PopupOptions | Ref<PopupOptions>, popupHTML: Ref<HTMLElement | null> = ref(null), mapID: string = ""): Popup | undefined {
    const mapId = inject<string>('MapID')
    if (process.server) return;
    
    const popupInstances = useState<MapboxPopupsObject>('mapbox_popup_instances', () => {return {}});
    if (isRef(options)) {
        popupInstances.value[popupID] = new Popup(options.value);
        watch(options, () => {
            popupInstance.remove();
            delete popupInstances.value[popupID];
            popupInstances.value[popupID] = new Popup(options.value);
        })
    } else {
        popupInstances.value[popupID] = new Popup(options);
    }
    const popupInstance = popupInstances.value[popupID]
    
    useMapbox(mapId || mapID, (map) => {
        popupInstance.addTo(map)
    })
    if (popupHTML.value) {
        popupInstance.setHTML(popupHTML.value.innerHTML)
        popupHTML.value.hidden = true;
        
        useMutationObserver(popupHTML, () => {
            if (popupHTML.value) popupInstance.setHTML(popupHTML.value.innerHTML)
        }, { childList: true, subtree: true, characterData: true })
    }
    
    watch(popupHTML, () => {
        if (popupHTML.value) {
            popupInstance.setHTML(popupHTML.value.innerHTML)
            popupHTML.value.hidden = true;

            useMutationObserver(popupHTML, () => {
                if (popupHTML.value) popupInstance.setHTML(popupHTML.value.innerHTML)
            }, { childList: true, subtree: true, characterData: true })
        }
    })

    return popupInstance;
}