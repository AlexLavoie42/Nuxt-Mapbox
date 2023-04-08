import { Map, Control } from 'mapbox-gl';

export function defineMapboxControl(onAdd: (map: Map) => HTMLElement, onRemove: (map: Map) => void): Control {
    const control = new Control();

    control.onAdd = onAdd;
    control.onRemove = onRemove;

    return control;
}