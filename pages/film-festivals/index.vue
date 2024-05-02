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
            <div class="slideshowOverlay">
              <div class="mainContent mx-auto">
                <div class="flex flex-col">
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
          playsinline
          class="bgVideo"
        >
          <source
            :src="bgVideo.videoSrcMP4"
            type="video/mp4"
          />
          <source
            :src="bgVideo.videoSrcWebm"
            type="video/webm"
          />
        </video>
      </v-container>
    </div>
  </router-view>
</template>

<script setup>
import { onBeforeMount, ref } from "vue";

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
    "https://res.cloudinary.com/all-about-erik/video/upload/ac_none,q_auto:eco/Eriks%20Travels/Film%20Festivals/film-festivals-background-vid-revA_compressed.mp4",
  videoSrcWebm:
    "https://res.cloudinary.com/all-about-erik/video/upload/ac_none,q_auto:eco/Eriks%20Travels/Film%20Festivals/film-festivals-background-vid-webm-revA_compressed.webm",
});
</script>

<style scoped lang="scss">
.main-col {
  --navHeight: 0px;

  max-width: 100%;
  min-height: 600px;
  position: fixed;
  background-color: #ffffff;
  z-index: 0;

  @include media-breakpoint-up(lg) {
    --navHeight: 100px;
  }

  .slideshowCol {
    position: relative;
    width: auto;
    height: calc(100vh - var(--navHeight));
    text-align: center;
    overflow-x: hidden;
    overflow-y: hidden;
  }

  .slideshowOverlay {
    position: relative;
    width: 100%;
    height: 100%;
    z-index: 10;
    display: flex;
    align-items: center;
  }

  .mainContent {
    --carouselSlidesPerView: 1.5;
    --paddingHeight: 0rem;
    --carouselBtmPadding: 3rem;
    --posterMaxHeight: calc(
      100vh - var(--navHeight) - 2 * var(--paddingHeight) - 2 *
        var(--carouselBtmPadding)
    );
    --posterAspectRatio: calc(800 / 1185);
    --containerWidth: calc(
      min(
        var(--carouselSlidesPerView) * var(--posterAspectRatio) *
          var(--posterMaxHeight),
        100vw
      )
    );

    width: var(--containerWidth);
    transform: translateX(
      calc(-0.5 * (max(100vw, var(--containerWidth)) - 100vw))
    );
    padding: var(--paddingHeight) 0;
    text-align: center;

    @include media-breakpoint-up(sm) {
      --carouselSlidesPerView: 2;
    }

    @include media-breakpoint-up(md) {
      --carouselSlideOverlap: 50px;
      --carouselSlidesPerView: 3;
      --carouselOverlapMultiplier: 2; // based on slides per view
      --containerWidth: calc(
        min(
          var(--carouselSlidesPerView) * var(--posterAspectRatio) *
            var(--posterMaxHeight),
          (
            var(--carouselSlidesPerView) / (1 + 2 * 0.8) *
              (
                100vw +
                  (
                    var(--carouselOverlapMultiplier) *
                      var(--carouselSlideOverlap)
                  )
              )
          )
        )
      );
    }

    @media (min-width: 1400px) {
      --carouselSlidesPerView: 5;
      --carouselOverlapMultiplier: 6; // based on slides per view
      --containerWidth: calc(
        min(
          var(--carouselSlidesPerView) * var(--posterAspectRatio) *
            var(--posterMaxHeight),
          (
            var(--carouselSlidesPerView) / (1 + 2 * 0.8 + 2 * 0.667) *
              (
                100vw +
                  (
                    var(--carouselOverlapMultiplier) *
                      var(--carouselSlideOverlap)
                  )
              )
          )
        )
      );
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
