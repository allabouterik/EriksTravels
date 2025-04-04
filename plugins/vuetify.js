import { createVuetify } from "vuetify";

export default defineNuxtPlugin((nuxtApp) => {
  const vuetify = createVuetify({
    display: {
      mobileBreakpoint: "md",
      thresholds: {
        xs: 0,
        sm: 576,
        md: 768,
        lg: 992,
        xl: 1200,
        xxl: 1500,
      },
    },
  });

  nuxtApp.vueApp.use(vuetify);
});
