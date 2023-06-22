import { Ref, computed } from 'vue';
import { Popup } from "mapbox-gl";
import { useNuxtApp, watch, useMapboxPopupRef } from "#imports";

export function useMapboxPopup(popupID: string, callback: (popup: Popup) => void) {
    const popup = useMapboxPopupRef(popupID);
    if (!popup.value) {
        watch(popup, () => {
            if (popup.value) {
                callback(popup.value);
            }
        })
    } else {
        callback(popup.value);
    }
}