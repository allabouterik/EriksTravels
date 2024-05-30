<template>
  <div class="posterLink-carousel">
    <swiper-container
      :key="swiperKey"
      effect="coverflow"
      :slides-per-view="1.5"
      :space-between="0"
      :centered-slides="true"
      :loop="true"
      :autoplay="{
        delay: 5000,
      }"
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
        768: {
          slidesPerView: 3,
        },
        1400: {
          slidesPerView: 5,
        },
      }"
      :keyboard="{
        enabled: true,
        onlyInViewport: true,
      }"
      @swiperslidechange="onSlideChange"
    >
      <swiper-slide
        v-for="(poster, posterIndex) in posterLinks"
        :key="posterIndex"
        class="swiper-slide"
      >
        <Tooltip
          text="See trailer and info"
          location="top"
          theme="light"
        >
          <a
            :href="poster.link"
            class="posterLink-carousel__link"
            :class="{ active: posterIndex === clickedPosterIndex }"
            @click="onPosterLinkClick(posterIndex)"
          >
            <img
              :alt="`Click to go to ${poster.title}`"
              :src="poster.img"
              class="posterLinkImg"
              :class="{
                prevOrNextSlide: isNextOrPrevSlide(posterIndex),
                backSlide: isBackSlide(posterIndex),
              }"
            />
            <img
              :alt="`Play icon - click to go to ${poster.title}`"
              src="~/assets/images/playarrowcircle-rough.png"
              class="playImg"
            /> </a></Tooltip
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
import { computed, ref, watch } from "vue";
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
const is1400ScreenAndUp = useMediaQuery("(min-width: 1400px)");

const stretchAmount = computed(() =>
  isMdScreenAndUp.value ? 50 : isSmScreenAndUp.value ? 100 : 150
);

const swiperKey = ref(0);

watch([isSmScreenAndUp, isMdScreenAndUp, is1400ScreenAndUp], () => {
  swiperKey.value += 1; // force swiper to re-render
});

const realIndex = ref(null);
const maxIndex = computed(() => props.posterLinks.length - 1);

const isNextOrPrevSlide = (index) => {
  if (realIndex.value === 0) {
    return index === maxIndex.value || index === realIndex.value + 1;
  } else if (realIndex.value === maxIndex.value) {
    return index === realIndex.value - 1 || index === 0;
  }
  return index === realIndex.value - 1 || index === realIndex.value + 1;
};

const isBackSlide = (index) => {
  if (realIndex.value === 0) {
    return index === maxIndex.value - 1 || index === realIndex.value + 2;
  } else if (realIndex.value === maxIndex.value) {
    return index === realIndex.value - 2 || index === 1;
  }
  return index === realIndex.value - 2 || index === realIndex.value + 2;
};

const onSlideChange = (e) => {
  const [swiper] = e.detail;
  realIndex.value = swiper.realIndex;
};

const clickedPosterIndex = ref(null);
const onPosterLinkClick = (index) => (clickedPosterIndex.value = index);
</script>

<style lang="scss" scoped>
.posterLink-carousel {
  --swiper-pagination-color: #e5d052;
  --playImgOpacity: 0.5;

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
    filter: drop-shadow(0px 4px 4px rgba(0, 0, 0, 0.75));
    opacity: 0;

    &:hover {
      opacity: var(--playImgOpacity);
    }

    @media (hover: none) {
      opacity: var(--playImgOpacity);
    }
  }

  &__link {
    display: block;
    background-color: #000;
    width: 100%;
    height: 100%;
    object-fit: contain;
    box-shadow: 0px 4px 4px 0px rgba(0, 0, 0, 0.25);
    z-index: -1;

    &:active,
    &.active {
      .playImg {
        opacity: 1 !important;
      }
    }
  }

  .posterLinkImg {
    width: 100%;
    height: 100%;
    object-fit: contain;

    &:hover {
      + .playImg {
        opacity: var(--playImgOpacity);
      }
    }

    &.prevOrNextSlide {
      opacity: 0.9;
    }

    &.backSlide {
      opacity: 0.8;
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
    width: 30px;
    outline: none;
    z-index: 1002;
    cursor: pointer;

    @include media-breakpoint-up(sm) {
      width: 40px;
    }
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

// Not sure why these aren't coming from the swiper styles
.swiper-slide {
  visibility: hidden;
}

.swiper-slide-visible,
.swiper-slide-fully-visible {
  visibility: visible;
}
</style>
