export default defineAppConfig({
  docus: {
    title: 'Nuxt Mapbox',
    description: 'Elegant Mapbox GL JS integration with Nuxt',
    image: 'https://cdn.icon-icons.com/icons2/2699/PNG/512/mapbox_logo_icon_169974.png',
    github: {
      dir: '.starters/default/content',
      branch: 'main',
      repo: 'docus',
      owner: 'nuxt-themes',
      edit: true
    },
    aside: {
      level: 0,
      collapsed: false,
      exclude: []
    },
    main: {
      padded: true,
      fluid: true
    },
    header: {
      logo: true,
      showLinkIcon: true,
      exclude: [],
      fluid: true
    }
  }
})
