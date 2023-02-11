import { useNuxtApp } from "#app"

export function _mapboxInit(key: string, options: mapboxgl.MapboxOptions = {container: key}) {
    const initFunc = useNuxtApp().$mapboxInit
    return initFunc ? initFunc(key, options) : null
}