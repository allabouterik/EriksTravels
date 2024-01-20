<template>
  <router-view v-slot="{ route }">
    <div :key="route.fullPath">
      <Head>
        <Title>{{ pageTitle }}</Title>
      </Head>

      <div class="outerContainer">
        <v-container
          fluid
          class="mainContainer px-1"
        >
          <!-- VIDEOS -->
          <div class="videosContainer">
            <div
              v-for="(video, index) in travelVideos"
              @click="videoIndex = index"
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
        @close="videoIndex = null"
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
  // max-height: 100vh;
  // overflow-y: hidden;
}

.mainContainer {
  width: 100%;
  padding: 0;
  text-align: center;
}

.videosContainer {
  display: flex;
  flex-wrap: wrap;
  justify-content: left;
  align-items: center;
  margin-top: 1rem;
  gap: 1rem;
}
</style>
