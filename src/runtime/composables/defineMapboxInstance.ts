import { useNuxtApp, useMapboxInstance } from "#imports"

export function defineMapboxInstance(key: string, options: mapboxgl.MapboxOptions = {container: key}) {
    const initFunc = useNuxtApp().$mapboxInit
    initFunc ? initFunc(key, options) : null
    return useMapboxInstance(key)
}