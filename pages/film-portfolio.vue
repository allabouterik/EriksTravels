<template>
  <router-view v-slot="{ route }">
    <div :key="route.fullPath">
      <Head>
        <Title>{{ pageTitle }}</Title>
      </Head>

      <div>
        <v-container
          fluid
          class="mainContainer px-1"
        >
          <!-- VIDEOS -->
          <div class="videosContainer">
            <div
              v-for="(video, index) in travelVideos"
              @click="
                videoIndex = index;
                store.layoutScrollable = false;
              "
              class="videosContainerItem"
            >
              <VideoThumbnailFilmPortfolio :video="video" />
            </div>
          </div>
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
      pageTitle: "Film Portfolio",
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
</script>

<style scoped lang="scss">
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

.videosContainer {
  display: flex;
  flex-wrap: wrap;
  justify-content: flex-start;
  align-items: center;
  margin-top: 1rem;
  gap: 1rem;

  @include media-breakpoint-up(sm) {
    justify-content: center;
  }
}

.videosContainerItem {
  width: 100%;

  @include media-breakpoint-up(sm) {
    width: unset;
  }
}
</style>
