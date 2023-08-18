import { Popup } from "mapbox-gl";
import { watch, useMapboxPopupRef } from "#imports";

export function useMapboxPopup(popupID: string, callback: (popup: Popup) => void) {
    let callbackDone = false;
    const popup = useMapboxPopupRef(popupID);
    if (!popup.value) {
        const killWatch = watch(() => popup.value, () => {
            if (popup.value?.getElement?.()) {
                if (!callbackDone) {
                    callback(popup.value);
                    callbackDone = true;
                    killWatch();
                }
            }
        }, { deep: true });
    } else {
        if (!callbackDone) {
            callback(popup.value);
            callbackDone = true;
        }
    }
}