import { Popup, type PopupOptions } from "mapbox-gl";
import { isRef, watch, inject, useMapbox, useMapboxPopupRef, onUnmounted } from '#imports';
import { whenever } from '@vueuse/core';
import { useState, ref, type Ref } from '#imports';
import { type MapboxPopupsObject } from '../../module';

/**
 * Create a new Popup instance for a component. Will be automatically added to map if it is nested in MapboxMap
 * 
 * @param popupHTML Optionally pass a template ref to automatically put html inside popup
 * @param mapID Optionally pass the mapID manually. Will be auto injected if component is nested in MapboxMap
 */
export function defineMapboxPopup(popupID: string, options: PopupOptions | Ref<PopupOptions>, popupHTML: Ref<HTMLElement | null> = ref(null), mapID: string = ""): Popup | undefined {
    const mapId = inject<string>('MapID')
    if (import.meta.server) return;

    if (useMapboxPopupRef(popupID).value) {
        console.warn(`Mapbox marker with ID '${popupID}' was initialized multiple times. This can cause unexpected behaviour.`);
        return useMapboxPopupRef(popupID).value;
    }
    
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
    
    whenever(popupHTML, () => {
        if (popupHTML.value) {
            popupHTML.value.hidden = false;
            popupInstance.setDOMContent(popupHTML.value);
        }
    }, { immediate: true })

    onUnmounted(() => {
        const currentPopup = useMapboxPopupRef(popupID);
        if (currentPopup.value) {
            currentPopup.value.remove();
            const mapbox_popup_instances: Ref<MapboxPopupsObject> = useState('mapbox_popup_instances', () => {return {}});
            delete mapbox_popup_instances.value[popupID];
        }
    })

    return popupInstance;
}