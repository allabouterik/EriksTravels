<template>
  <div
    class="layout pa-0"
    :class="{ 'non-scrollable': !layoutScrollable }"
  >
    <NavbarMobile v-if="showNavBars" />
    <NavbarDesktop :showNavBar="showNavBars" />

    <main>
      <NuxtPage />

      <VideoLightBox
        v-show="store.videoLightBoxOpen"
        :videos="videos"
        :index="videoIndex"
        :disable-scroll="disableVideoLightBoxScroll"
        @close="
          store.videoLightBoxProps.videos = null;
          store.videoLightBoxProps.videoIndex = null;
          store.layoutScrollable = true;
        "
      />

      <!-- Needs to be v-show instead of v-if to prevent re-rendering of the component
      and so the watcher in the component can be triggered -->
      <PageLightBox
        v-show="store.pageLightBoxOpen"
        :componentName="store.pageLightBoxProps.componentName"
        :disableScroll="store.pageLightBoxProps.disableScroll"
        @close="store.layoutScrollable = true"
      />
    </main>

    <BackgroundMusic
      v-if="store.bgMusicAudioFile !== ''"
      :audioFile="store.bgMusicAudioFile"
      :audioFadeInDuration="store.bgMusicFadeDuration"
      :audioFadeOutDuration="store.bgMusicFadeDuration"
    />

    <!-- <div
      v-if="store.bgMusicAudioFile !== ''"
      class="bg-slate-300 w-44 p-4 rounded translate-y-24 fixed top-24 right-7 z-[1100]"
    >
      <p class="text-black font-bold">Volume: {{ audioVolume }}</p>
      <Slider
        :default-value="[100 * store.bgMusicAudioMaxVolume]"
        :model-value="[audioVolume]"
        :min="0"
        :max="100"
        :step="1"
        @update:model-value="onVolumeSliderUpdate"
      />
    </div> -->
  </div>
</template>

<script setup lang="ts">
import { computed, onBeforeMount, watch } from "vue";
import { useMainStore } from "@/stores/mainStore";
import { removeSlashFromEnd } from "@/utils/removeSlashFromEnd";
import { useStorage } from "@vueuse/core";

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
        "A site about the many travels and adventures of Erik Jacobsen, an American record producer, song publisher and artist manager.",
    },
  ],
});

const store = useMainStore();
const route = useRoute();

const showNavBars = computed(
  () =>
    route.path !== "/" && !(store.videoLightBoxOpen || store.pageLightBoxOpen)
);

const visitedFilmFestivals = useStorage("visited-festivals", 0);

// Background music
const updateBgMusic = (routeTrimmed: string) => {
  const directory =
    "https://res.cloudinary.com/all-about-erik/video/upload/Eriks%20Travels/";
  let audioFile = "";
  let maxVolume = 1;
  let fadeDuration = 0;

  if (
    !store.videoLightBoxOpen &&
    store.pageLightBoxOpen &&
    store.pageLightBoxProps.componentName === "ProducerContent"
  ) {
    audioFile = `${directory}The%20Producer/ej-the-producer.mp3`;
    maxVolume = 0.2;
  } else if (!store.videoLightBoxOpen && !store.pageLightBoxOpen) {
    if (routeTrimmed === "/film-festivals") {
      // film festival index page
      audioFile =
        visitedFilmFestivals.value <= 1
          ? `${directory}Film%20Festivals/festivals-audio-with-intro_may2.mp3`
          : `${directory}Film%20Festivals/festivals-audio-no-intro.mp3`;
      fadeDuration = 0;
    } else if (routeTrimmed.includes("film-festivals")) {
      // individual film festival pages
      audioFile = `${directory}Film%20Festivals/festivals-audio-no-intro.mp3`;
      fadeDuration = 0;
    } else if (routeTrimmed === "/home" || routeTrimmed === "/film-portfolio") {
      audioFile = `${directory}eriks-travels-music_volume-edit.mp3`;
      fadeDuration = 3.5;
    }
  }

  store.bgMusicAudioFile = audioFile;
  store.bgMusicAudioMaxVolume = maxVolume;
  store.bgMusicFadeDuration = fadeDuration;
};

onBeforeMount(() => {
  onViewChange(route.path);
});

watch([() => store.pageLightBoxOpen, () => store.videoLightBoxOpen], () => {
  visitedFilmFestivals.value = 0;
  const routeTrimmed = removeSlashFromEnd(route.path);
  updateBgMusic(routeTrimmed);
});

watch(
  () => route.path,
  () => {
    onViewChange(route.path);
  }
);

const onViewChange = (routePath: string) => {
  const routeTrimmed = removeSlashFromEnd(routePath);
  if (routeTrimmed.includes("film-festivals")) {
    visitedFilmFestivals.value += 1;
  } else {
    visitedFilmFestivals.value = 0;
  }
  updateBgMusic(routeTrimmed);
};

const videos = computed(() => {
  return store.videoLightBoxProps.videos;
});

const videoIndex = computed(() => {
  return store.videoLightBoxProps.videoIndex;
});

watch([videos, videoIndex], ([newVideos, newVideoIndex]) => {
  if (newVideos && newVideoIndex !== null) {
    store.layoutScrollable = false;
  }
});

const disableVideoLightBoxScroll = computed(() => {
  return store.videoLightBoxProps.disableScroll;
});

const layoutScrollable = computed(() => {
  return store.layoutScrollable;
});

// slider
// const audioVolume = computed({
//   get: () => store.bgMusicAudioMaxVolume * 100,
//   set: (value: number) => store.bgMusicAudioMaxVolume = value / 100,
// });
// const onVolumeSliderUpdate = (value: number) => {
//   console.log("onVolumeSliderUpdate", value);
//   store.bgMusicAudioMaxVolume = value / 100;
// };
</script>

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

.non-scrollable {
  height: 100vh;
  overflow: hidden;
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
