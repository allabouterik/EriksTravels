// https://nuxt.com/docs/api/configuration/nuxt-config
import vuetify from "vite-plugin-vuetify";

export default defineNuxtConfig({
  ssr: true,
  // // ref: https://github.com/nuxt/framework/pull/6980
  // router: {
  //   options: {
  //     hashMode: true,
  //   },
  // },
  app: {
    head: {
      script: [{ src: "https://cdn.jsdelivr.net/npm/vue-scrollto" }],
    },
    pageTransition: { name: "page", mode: "default" },
  },
  css: [
    "@/assets/styles.css",
    "@/assets/custom.scss",
    "simplebar-vue/dist/simplebar.min.css",
  ],
  modules: [
    "@nuxt/content",
    "@nuxtjs/seo",
    // this adds the vuetify vite plugin
    async (options, nuxt) => {
      nuxt.hooks.hook("vite:extendConfig", (config) =>
        config.plugins.push(vuetify())
      );
    },
    "nuxt-lazy-load",
    "@pinia/nuxt",
  ],
  // devtools: {
  //   // Enable devtools (default: true)
  //   enabled: false,
  //   // VS Code Server options
  //   vscode: {},
  //   // ...other options
  // },
  build: {
    transpile: ["vuetify"],
  },
  vite: {
    define: {
      "process.env.DEBUG": false,
    },
    build: {
      sourcemap: true,
    },
    css: {
      preprocessorOptions: {
        scss: {
          additionalData: '@use "@/assets/_breakpoints.scss" as *;',
        },
      },
    },
  },
  content: {
    markdown: {
      anchorLinks: false,
    },
  },
  lazyLoad: {
    // These are the default values for nuxt-lazy-load
    images: false,
    videos: true,
    audios: false,
    iframes: true,
    native: false,
    directiveOnly: false,
  },
  site: {
    // Nuxt SEO site config (https://nuxtseo.com/nuxt-seo/guides/configuring-modules)
    url: "https://erikstravels.com",
    name: "Erik's Travels",
    description:
      "A site about the many travels and adventures of Erik Jacobsen, an American record producer, song publisher and artist manager.",
    defaultLocale: "en", // not needed if you have @nuxtjs/i18n installed
    trailingSlash: false,
  },
  sitemap: {
    include: ["/"],
  },
  ogImage: {
    // https://nuxtseo.com/nuxt-seo/guides/using-the-modules#disabling-modules
    enabled: false,
  },
  schemaOrg: {
    // https://nuxtseo.com/schema-org/guides/quick-setup
    identity: {
      type: "Person",
      name: "Erik Jacobsen",
      url: "https://erikstravels.com",
      // logo: 'https://example.com/logo.png'
    },
  },
  seo: {
    redirectToCanonicalSiteUrl: true,
  },
});
