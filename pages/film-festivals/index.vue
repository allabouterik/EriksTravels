<template>
  <router-view v-slot="{ route }">
    <div :key="route.fullPath">
      <Head>
        <Title>Film Festivals</Title>
      </Head>

      <v-container
        fluid
        class="main-col ma-0 pa-0"
      >
        <v-row
          no-gutters
          class="mb-1"
        >
          <v-col class="slideshowCol">
            <div style="height: 100vh"></div>

            <div class="slideshowOverlay">
              <div class="mainContent mx-auto">
                <img
                  alt="Erik Jacobsen title image"
                  :src="titleImg"
                  class="titleImg mb-1 mb-lg-2 mb-xl-4 lg:hidden"
                  data-testid="title-img"
                />
                <div>
                  <p class="slideshowText mb-0">
                    I entered some film festivals, and won awards.
                    <br />Preview the entries below.
                  </p>
                </div>

                <div class="flex flex-col mt-3 mt-sm-4">
                  <v-row
                    no-gutters
                    class="d-flex justify-center"
                  >
                    <v-col class="carouselContainer">
                      <PosterLinkCarouselSwiper
                        v-if="posters && posters.length > 0"
                        :posterLinks="posters"
                      />
                    </v-col>
                  </v-row>
                </div>
              </div>
            </div>
          </v-col>
        </v-row>

        <!-- BACKGROUND VIDEO -->
        <video
          v-if="bgVideo"
          autoplay
          loop
          muted
          class="bgVideo"
        >
          <!-- <source
        :src="bgVideo.videoSrcWebm"
        type="video/webm"
      /> -->
          <source
            :src="bgVideo.videoSrcMP4"
            type="video/mp4"
          />
        </video>
      </v-container>
    </div>
  </router-view>
</template>

<script setup>
import { onBeforeMount, ref } from "vue";
import { useMediaQuery } from "@vueuse/core";

const posters = ref([]);

onBeforeMount(async () => {
  const filmFestivalsContent = await queryContent("film-festivals").findOne();
  posters.value = filmFestivalsContent.festivals.map((festival) => ({
    title: festival.title,
    img: festival.posterImg,
    link: `/film-festivals/${festival.slug}`,
  }));
});

const bgVideo = ref({
  videoSrcMP4:
    "https://res.cloudinary.com/all-about-erik/video/upload/ac_none,q_auto:eco/Eriks%20Travels/Film%20Festivals/film-festivals-background-vid.mp4",
  // videoSrcWebm:
  //   "https://res.cloudinary.com/all-about-erik/video/upload/ac_none,q_auto:eco/Eriks%20Travels/Film%20Festivals/film-festivals-background-vid-webm.webm",
});

const titleImg = ref("/film-festivals/film-festivals_title.png");
</script>

<style scoped lang="scss">
.main-col {
  --navHeight: 0px;

  max-width: 100%;
  min-height: 600px;
  position: fixed;
  z-index: 0;

  @include media-breakpoint-up(lg) {
    --navHeight: 148px;
  }

  .slideshowCol {
    position: relative;
    width: auto;
    text-align: center;
    overflow-x: hidden;
    overflow-y: hidden;
  }

  .slideshowOverlay {
    position: absolute;
    width: 100%;
    top: 11%;
    z-index: 10;

    @include media-breakpoint-up(lg) {
      top: 3%;
    }
  }

  .mainContent {
    width: 100%;
    text-align: center;
    background-color: rgba(#ffffff, 0.95);
    padding: 0.75rem;

    @include media-breakpoint-up(sm) {
      width: 90vw;
      max-width: 1660px;
    }
  }

  .titleImg {
    width: 240px;
    height: auto;
    margin: auto;

    @include media-breakpoint-up(sm) {
      width: 260px;
    }

    @include media-breakpoint-up(md) {
      width: 280px;
    }

    @include media-breakpoint-up(lg) {
      width: 300px;
    }

    @include media-breakpoint-up(xl) {
      width: 320px;
    }
  }

  .slideshowText {
    color: #000000;
    font-family: "Libre Baskerville", serif;
    font-size: 1rem;
    font-weight: 600;
    line-height: 1.25;
    letter-spacing: 2px;
    text-align: center;
    text-wrap: wrap;

    @include media-breakpoint-up(sm) {
      font-size: 1.25rem;
    }

    @include media-breakpoint-up(md) {
      font-size: 1.5rem;
    }

    @include media-breakpoint-up(lg) {
      font-size: 1.5rem;
    }

    @include media-breakpoint-up(xl) {
      font-size: 1.75rem;
    }
  }

  .bgVideo {
    position: fixed;
    top: 0;
    width: 100vw;
    height: 100vh;
    object-fit: cover;
    z-index: -1;

    @include media-breakpoint-up(lg) {
      top: var(--navHeight);
      height: calc(100vh - var(--navHeight));
    }
  }
}
</style>
