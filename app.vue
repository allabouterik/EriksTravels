<template>
  <div
    :class="{
      layout: true,
      'pa-0': applyZeroLayoutPadding,
    }"
  >
    <NavbarMobile />
    <NavbarDesktop />
    <main>
      <NuxtPage />
    </main>
  </div>
</template>

<script setup>
import { computed, onMounted, ref } from "vue";

useHead({
  titleTemplate: (titleChunk) => {
    return titleChunk ? `${titleChunk} | Erik's Travels` : "Erik's Travels";
  },
  link: [
    {
      rel: "preconnect",
      href: "https://res.cloudinary.com/",
    },
    {
      rel: "dns-prefetch",
      href: "https://res.cloudinary.com/",
    },
    {
      rel: "preconnect",
      href: "https://fonts.googleapis.com",
    },
    {
      rel: "dns-prefetch",
      href: "https://fonts.googleapis.com",
    },
    {
      rel: "preconnect",
      href: "https://fonts.gstatic.com",
    },
    {
      rel: "dns-prefetch",
      href: "https://fonts.gstatic.com",
    },
    {
      rel: "preconnect",
      href: "https://cdn.jsdelivr.net",
    },
    {
      rel: "dns-prefetch",
      href: "https://cdn.jsdelivr.net",
    },
  ],
  htmlAttrs: {
    lang: "en",
  },
  meta: [
    {
      name: "description",
      content:
        "A site all about the life and career of Erik Jacobsen, an American record producer, song publisher and artist manager. " +
        "He is best known for his work in the 1960s with Tim Hardin, the Lovin' Spoonful, the Charlatans, and Sopwith Camel, " +
        "and later with Norman Greenbaum, Tazmanian Devils and Chris Isaak.",
    },
  ],
});

const applyZeroLayoutPadding = ref(false);

const urlsForZeroPadding = ["/travels"];

const path = computed(() => {
  const route = useRoute();
  return route.path;
});

const applyPageLayoutStyling = (currentPath) => {
  applyZeroLayoutPadding.value = false;
  urlsForZeroPadding.forEach((url) => {
    if (currentPath.includes(url)) {
      applyZeroLayoutPadding.value = true;
    }
  });
  if (currentPath === "/") {
    // for homepage
    applyZeroLayoutPadding.value = true;
  }
};

onMounted(() => {
  applyPageLayoutStyling(path.value);
});

watch(path, (newPath) => {
  applyPageLayoutStyling(newPath);
});
</script>

<script type="text/javascript"></script>

<style lang="scss">
@import url("https://fonts.googleapis.com/css?family=Lato:100,400&display=swap");
@import url("https://fonts.googleapis.com/css?family=Ubuntu+Condensed&display=swap");

body {
  font-family: Arial, "Helvetica Neue", Helvetica, sans-serif;
  margin: 0;
  padding: 0;
}

.layout {
  max-width: 100%;
  margin: 0 auto;
  padding-left: 1.25rem;
  padding-right: 1.25rem;
}

/* Transition styles on router-view for fading the page */
.page-enter-active {
  transition-duration: 5.5s;
  transition-property: opacity;
  transition-timing-function: ease-in-out;
}
.page-leave-active {
  transition-duration: 1.5s;
  transition-property: opacity;
  transition-timing-function: ease-in-out;
}
.page-enter-from,
.page-leave-to {
  opacity: 0;
}

/* Responsive breakpoints ref: https://getbootstrap.com/docs/4.3/layout/overview/ */

/* Extra small devices (portrait phones, less than 576px) */
@media only screen and (max-width: 575.98px) {
  .layout {
    &--zero-padding-mbl {
      padding: 0;
    }
  }
}
</style>
