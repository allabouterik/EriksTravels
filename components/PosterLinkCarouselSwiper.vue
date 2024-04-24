<template>
  <div class="posterLink-carousel">
    <swiper-container
      effect="coverflow"
      :slides-per-view="1"
      :space-between="0"
      :centered-slides="true"
      :loop="true"
      :navigation="{
        prevEl: '.posterLink-carousel__prev',
        nextEl: '.posterLink-carousel__next',
      }"
      :pagination="true"
      :coverflow-effect-rotate="0"
      :coverflow-effect-stretch="stretchAmount"
      :coverflow-effect-depth="300"
      :coverflow-effect-modifier="1"
      :coverflow-effect-scale="1"
      :coverflow-effect-slide-shadows="false"
      :breakpoints="{
        576: {
          slidesPerView: 2,
        },
        1400: {
          slidesPerView: 3,
        },
      }"
      :keyboard="{
        enabled: true,
        onlyInViewport: true,
      }"
      @swiperprogress="onProgress"
      @swiperslidechange="onSlideChange"
      @swiperinit="onSwiperInit"
    >
      <swiper-slide
        v-for="(posterLink, posterLinkIndex) in posterLinks"
        :key="posterLinkIndex"
      >
        <a
          :href="posterLink.link"
          :title="posterLink.title"
        >
          <img
            :alt="`Click to go to ${posterLink.title}`"
            :src="posterLink.img"
            class="posterLinkImg"
          />
          <img
            :alt="`Play icon - click to go to ${posterLink.title}`"
            src="~/assets/images/playarrowcircle-rough.png"
            class="playImg"
          /> </a
      ></swiper-slide>
    </swiper-container>

    <div id="leftArrowContainer">
      <img
        alt="Left arrow, click for previous video"
        src="../assets/images/left-arrow-black.png"
        id="prevVideoImg"
        class="posterLink-carousel__prev arrowImg"
      />
      <img
        alt="Left arrow, click for previous video"
        src="../assets/images/left-arrow-yellow.png"
        id="prevVideoImg-hover"
        class="posterLink-carousel__prev arrowImg"
      />
    </div>

    <div id="rightArrowContainer">
      <img
        alt="Right arrow, click for next video"
        src="../assets/images/right-arrow-black.png"
        id="nextVideoImg"
        class="posterLink-carousel__next arrowImg"
      />
      <img
        alt="Right arrow, click for next video"
        src="../assets/images/right-arrow-yellow.png"
        id="nextVideoImg-hover"
        class="posterLink-carousel__next arrowImg"
      />
    </div>
  </div>
</template>

<script setup>
// import { ref } from "vue";
import { useMediaQuery } from "@vueuse/core";
import { register } from "swiper/element/bundle";

const props = defineProps({
  posterLinks: {
    type: Array,
    default: () => [{ title: "", img: "", link: "" }],
  },
});

register();

const isSmScreenAndUp = useMediaQuery("(min-width: 576px)");
const isMdScreenAndUp = useMediaQuery("(min-width: 768px)");
const stretchAmount = isMdScreenAndUp.value
  ? 50
  : isSmScreenAndUp.value
  ? 100
  : 150;

// const swiper = ref(null);

const onSwiperInit = (e) => {
  // swiper.value = Array.isArray(e.detail) ? e.detail[0] : e.detail;
};

const onProgress = (e) => {
  // const [swiper, progress] = e.detail;
  // console.log({ swiper, progress });
};

const onSlideChange = (e) => {
  // console.log("slide changed");
};
</script>

<style lang="scss" scoped>
.posterLink-carousel {
  --swiper-pagination-color: #e5d052;

  --navHeight: 0px;
  --titleHeight: 42px;
  // --textHeight: 40px;
  --topPosition: 11vh;
  --imgTopMargin: 1rem;
  --mainContentWidth: 100vw;
  --mainContentPadding: 1rem;
  --mainContentBtmMargin: 1rem;
  --arrowImgWidth: 30px;
  --arrowImgPadding: 0.5rem;
  --swiperBtmPadding: 3rem;

  --posterAspectRatio: calc(2 / 3);
  --posterWidth: calc(100vw - 32px - 80px - 32px);
  --posterMaxWidth: calc(
    var(--mainContentWidth) - 2 * var(--arrowImgWidth) - 4 *
      var(--arrowImgPadding) - 2 * var(--mainContentPadding)
  );
  --posterActualWidth: calc(min(var(--posterWidth), var(--posterMaxWidth)));
  // --posterHeight: calc(
  //   100vh - var(--navHeight) - var(--titleHeight) - var(--textHeight) -
  //     var(--topPosition) - 2 * var(--mainContentPadding) - var(--imgTopMargin) -
  //     var(--swiperBtmPadding) - var(--mainContentBtmMargin)
  // );
  --posterHeight: calc(
    100vh - var(--navHeight) - var(--titleHeight) - var(--topPosition) - 2 *
      var(--mainContentPadding) - var(--imgTopMargin) - var(--swiperBtmPadding) -
      var(--mainContentBtmMargin)
  );
  --posterMaxHeight: calc(var(--posterMaxWidth) / var(--posterAspectRatio));
  --posterActualHeight: calc(min(var(--posterHeight), var(--posterMaxHeight)));

  @include media-breakpoint-up(sm) {
    --mainContentWidth: 520px;
    // --textHeight: 50px;
    --arrowImgWidth: 40px;
    --arrowImgPadding: 1rem;
  }

  @include media-breakpoint-up(md) {
    --mainContentWidth: 650px;
    // --textHeight: 60px;
    --titleHeight: 48px;
  }

  @include media-breakpoint-up(lg) {
    --navHeight: 148px;
    --titleHeight: 0px;
    --topPosition: 3vh;
  }

  @include media-breakpoint-up(xl) {
    --mainContentWidth: 750px;
    // --textHeight: 70px;
  }

  // https://swiperjs.com/element#parts
  swiper-container::part(container) {
    padding-bottom: 3rem;
  }

  .playImg {
    position: absolute;
    top: 50%;
    left: 50%;
    width: 32.8%;
    transform: translate3d(-50%, -50%, 0);
    transition: opacity 0.25s ease-in-out;
    opacity: 0;

    &:hover {
      opacity: 0.3;
    }

    @media (hover: none) {
      opacity: 0.3;
    }
  }

  .posterLinkImg {
    width: var(--posterActualWidth);
    height: var(--posterActualHeight);
    max-width: 100%;
    max-height: 100%;
    object-fit: contain;

    &:hover {
      + .playImg {
        opacity: 0.3;
      }
    }
  }

  &__content {
    position: fixed;
    left: 0;
    height: 100%;
    width: 100%;
    white-space: nowrap;
    padding: 0;
    margin: 0;
  }
  &__container {
    display: block;
    width: 100%;
    text-align: center;
  }
  &__list-item {
    display: inline-table;
    position: relative;
    width: 100%;
    transition: left 0.4s ease, transform 0.4s ease, -webkit-transform 0.4s ease;
  }
  &__poster-container {
    display: inline-block;
    position: relative;
    width: 100vw;
    max-height: 100vh;
    margin: 0 auto;
  }

  .arrowImg {
    position: absolute;
    width: var(--arrowImgWidth);
    outline: none;
    z-index: 1002;
    cursor: pointer;
  }
  &__next {
    transform: translate(calc(-50% + 100px), -100%);
  }
  &__prev {
    transform: translate(calc(-50% - 100px), -100%);
  }

  #prevVideoImg-hover,
  #leftArrowContainer:hover #prevVideoImg {
    display: none;
  }
  #leftArrowContainer:hover #prevVideoImg-hover {
    display: inline;
  }

  #nextVideoImg-hover,
  #rightArrowContainer:hover #nextVideoImg {
    display: none;
  }
  #rightArrowContainer:hover #nextVideoImg-hover {
    display: inline;
  }
}
</style>
