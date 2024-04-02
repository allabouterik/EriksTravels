<template>
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
              class="titleImg mb-1 mb-lg-2 mb-xl-4"
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
                v-if="!isSmScreenAndUp"
                v-for="(_, rIndex) in 3"
                no-gutters
                class="d-flex justify-center"
              >
                <v-col
                  v-for="poster in posters.slice(
                    rIndex * 2,
                    rIndex * 2 + 2 + Math.max(0, rIndex - 1)
                  )"
                  cols="4"
                  sm="3"
                  md="3"
                  lg="3"
                  :key="poster.img"
                  class="pb-1"
                >
                  <router-link
                    :to="poster.link"
                    class="posterLink"
                  >
                    <img
                      :src="poster.img"
                      :alt="`Film festival poster - ${poster.title}`"
                      class="posterLinkImg"
                    />
                  </router-link>
                </v-col>
              </v-row>

              <v-row
                v-if="isSmScreenAndUp"
                v-for="(_, rIndex) in 2"
                no-gutters
                class="d-flex justify-center"
              >
                <v-col
                  v-for="poster in posters.slice(
                    rIndex * 3,
                    rIndex * 3 + 3 + rIndex
                  )"
                  cols="3"
                  sm="3"
                  md="3"
                  lg="3"
                  :key="poster.img"
                  class="pb-1"
                >
                  <router-link
                    :to="poster.link"
                    class="posterLink"
                  >
                    <img
                      :src="poster.img"
                      alt="Film festival poster"
                      class="posterLinkImg"
                    />
                  </router-link>
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

const isSmScreenAndUp = useMediaQuery("(min-width: 576px)");
</script>

<style scoped lang="scss">
.main-col {
  max-width: 100%;
  min-height: 600px;
  position: fixed;
  z-index: 0;
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
    top: 5%;
  }
}

.mainContent {
  bottom: 0;
  max-width: fit-content;
  padding: 0.75rem 0.5rem 0.5rem;
  text-align: center;
  background-color: rgba(#ffffff, 0.85);
  z-index: 20;
}

.titleImg {
  width: 100%;
  height: auto;
  margin: auto;
  max-width: 240px;

  @include media-breakpoint-up(sm) {
    max-width: 323px;
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
    font-size: 1.75rem;
  }

  @include media-breakpoint-up(xl) {
    font-size: 1.875rem;
  }
}

.posterLink {
  display: flex;
  position: relative;
  justify-content: center;
  margin: 0 0.25rem;

  .posterLinkImg {
    --rows: 3;
    --cols: 3;

    max-height: calc(
      (90vh - 0.75rem - 51px - 1rem - 75px - 2rem - 0.75rem) / var(--rows)
    );
    max-width: calc(
      (100vw - 1rem - ((var(--cols) - 1) * 0.5rem)) / var(--cols)
    );

    @include media-breakpoint-up(sm) {
      --rows: 2;
      --cols: 4;
    }
  }

  // &:hover {
  //   .linkImg {
  //     visibility: hidden;

  //     &.hover {
  //       visibility: visible;
  //     }
  //   }
  // }
}

.bgVideo {
  position: fixed;
  right: 0;
  bottom: 0;
  min-width: 100%;
  min-height: 100%;
  // opacity: 0.22;
  z-index: -1;
}
</style>
