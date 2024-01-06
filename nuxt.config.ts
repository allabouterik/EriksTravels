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
  css: ["@/assets/styles.css", "@/assets/custom.scss"],
  modules: [
    "@nuxt/content",
    // this adds the vuetify vite plugin
    async (options, nuxt) => {
      nuxt.hooks.hook("vite:extendConfig", (config) =>
        config.plugins.push(vuetify())
      );
    },
    "nuxt-lazy-load",
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
});
