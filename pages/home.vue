<template>
  <router-view v-slot="{ route }">
    <div :key="route.fullPath">
      <Head>
        <Title>{{ pageTitle }}</Title>
      </Head>

      <div class="outerContainer">
        <v-container
          v-for="i in 2"
          fluid
          class="mainContainer mb-2 px-1"
          :class="{ scroll: layoutScrollable }"
        >
          <!-- VIDEOS -->
          <v-row
            justify="center"
            id="videos"
            class="mt-0"
          >
            <v-col
              cols="12"
              sm="6"
              md="6"
              lg="4"
              v-for="(video, index) in travelVideos"
              :key="video.title"
              class="mb-2 px-2 px-sm-1 py-0"
              @click="
                videoIndex = index;
                store.layoutScrollable = false;
              "
              data-testid="video-container"
            >
              <VideoThumbnailTravels :video="video" />
            </v-col>
          </v-row>
        </v-container>
      </div>

      <VideoLightBox
        :videos="travelVideos"
        :index="videoIndex"
        :disable-scroll="true"
        @close="
          videoIndex = null;
          store.layoutScrollable = true;
        "
      />
    </div>
  </router-view>
</template>

<script>
export default {
  data() {
    return {
      pageTitle: "",
      travelsPgContent: {},
      videoIndex: null,
    };
  },

  computed: {
    travelVideos() {
      return this.travelsPgContent.videos;
    },
  },

  async mounted() {
    const travelsPgContent = await queryContent("travels").findOne();
    this.travelsPgContent = travelsPgContent;
  },
};
</script>

<script setup>
import { useMainStore } from "@/stores/mainStore";

useHead({
  link: [
    {
      rel: "preconnect",
      href: "https://player.vimeo.com/",
    },
    {
      rel: "dns-prefetch",
      href: "https://player.vimeo.com/",
    },
  ],
});

const store = useMainStore();
const layoutScrollable = computed(() => {
  return store.layoutScrollable;
});
</script>

<style scoped lang="scss">
@font-face {
  font-family: NeueHaasGroteskText Pro65;
  src: url("../assets/fonts/nhaasgrotesktxpro-65md.eot"); /* IE9 Compat Modes */
  src: url("../assets/fonts/nhaasgrotesktxpro-65md.eot?#iefix")
      format("embedded-opentype"),
    /* IE6-IE8 */ url("../assets/fonts/nhaasgrotesktxpro-65md.woff")
      format("woff"),
    /* Pretty Modern Browsers */
      url("../assets/fonts/nhaasgrotesktxpro-65md.svg#NHaasGroteskTXPro-55Rg")
      format("svg"); /* Legacy iOS */
  font-weight: normal;
}

#header {
  background-image: var(--headerBgImg);
  background-position: center;
  background-color: rgba(0, 0, 0, 0.32);
  background-repeat: no-repeat;
  background-size: cover;
  text-align: center;
  padding-top: 12.5px;
  padding-bottom: 12.5px;
}

.outerContainer {
  /* max-height: 100vh; */
  /* overflow-y: hidden; */
}

.mainContainer {
  width: 100%;
  padding: 0;
  text-align: center;
}

.scroll {
  animation: scrollAnimation infinite linear;
  animation-duration: 540s;
}

@media screen and (min-width: 600px) and (max-width: 1280px) {
  .scroll {
    animation-duration: 360s;
  }
}

@media screen and (min-width: 1280px) {
  .scroll {
    animation-duration: 180s;
  }
}

@keyframes scrollAnimation {
  from {
    transform: translateY(0%);
  }
  to {
    transform: translateY(-100%);
  }
}
// Reverse Scroll:
// @keyframes scrollAnimation {
//   from {
//     transform: translateY(-100%);
//   }
//   to {
//     transform: translateY(0%);
//   }
// }
</style>
