import { Map, IControl } from 'mapbox-gl';

export function defineMapboxControl(onAdd: (map: Map) => HTMLElement, onRemove: (map: Map) => void): IControl {
    class CustomControl implements IControl {
        constructor() {}
        onAdd(map: Map): HTMLElement {
            const html = onAdd(map);
            html.remove();
            return html;
        }
        onRemove(map: Map): void {
            onRemove(map);
        }
    }
    const control = new CustomControl();

    control.onAdd = onAdd;
    control.onRemove = onRemove;

    return control;
}