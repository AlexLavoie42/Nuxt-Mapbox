export function mapboxInit(key: string, options: mapboxgl.MapboxOptions = {container: key}) {
    const initFunc = useNuxtApp().$mapboxInit
    return initFunc ? initFunc(key, options) : null
}