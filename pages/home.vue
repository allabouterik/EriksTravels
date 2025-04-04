<template>
  <router-view v-slot="{ route }">
    <div :key="route.fullPath">
      <Head>
        <Title>{{ pageTitle }}</Title>
      </Head>

      <div>
        <v-container
          v-for="i in 2"
          fluid
          class="mainContainer mb-2 px-1"
          :class="{
            scroll: mounted,
            paused: !layoutScrollable,
          }"
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
              @click="openVideo(index)"
              data-testid="video-container"
            >
              <VideoThumbnailTravels :video="video" />
            </v-col>
          </v-row>
        </v-container>
      </div>
    </div>
  </router-view>
</template>

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
const { layoutScrollable } = storeToRefs(store);

const pageTitle = "Home";
const travelVideos = ref([]);
const mounted = ref(false);

onMounted(async () => {
  const travelsPgContent = await queryContent("travels").findOne();
  travelVideos.value = travelsPgContent.videos;
  mounted.value = true;
});

const openVideo = (videoIndex) => {
  store.openVideoLightBox(travelVideos.value, videoIndex, true);
};
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

.mainContainer {
  width: 100%;
  padding: 0;
  text-align: center;
}

.scroll {
  animation: scrollAnimation infinite linear;
  animation-delay: 0.03s; // needed for iOS
  animation-duration: 540s;
  animation-play-state: running;

  @media screen and (min-width: 600px) and (max-width: 1280px) {
    animation-duration: 360s;
  }

  @media screen and (min-width: 1280px) {
    animation-duration: 180s;
  }

  &.paused {
    animation-play-state: paused;
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
