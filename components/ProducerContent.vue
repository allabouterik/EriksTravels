<template>
  <v-container
    fluid
    class="main-col ma-0, pa-0"
  >
    <v-row
      no-gutters
      class="mb-1"
    >
      <v-col class="slideshowCol">
        <SlideshowKenBurnsSmall
          :slides="slides"
          height="100vh"
          maxImgHeight="100vh"
          :scaleImgToContainer="true"
          imageObjectFit="cover"
        />

        <!-- SLIDESHOW OVERLAY -->
        <div class="slideshowOverlay">
          <div class="mainContent mx-auto py-0">
            <img
              alt="Erik Jacobsen title image"
              :src="titleImg"
              class="titleImg mb-md-1 mb-lg-2 mb-xl-4"
              :class="{ hide: hideOverlay }"
              data-testid="title-img"
            />
            <p
              class="slideshowText"
              :class="{ hide: hideOverlay }"
            >
              Award-winning record producer, music publisher, videographer,
              writer, narrator.
            </p>
            <div class="linksContainer">
              <a
                href="https://en.wikipedia.org/wiki/Erik_Jacobsen"
                class="link"
              >
                <img
                  alt="Wikipedia"
                  src="/the-producer/wiki-biography.png"
                  class="linkImg"
                />
                <img
                  alt="Wikipedia"
                  src="/the-producer/wiki-biography-yellow.png"
                  class="linkImg hover"
                />
              </a>
              <a
                href="https://allabouterik.com"
                class="link"
              >
                <img
                  alt="All About Erik"
                  src="/the-producer/allabouterik.png"
                  class="linkImg"
                />
                <img
                  alt="All About Erik"
                  src="/the-producer/allabouterik-yellow.png"
                  class="linkImg hover"
                />
              </a>
            </div>
          </div>
        </div>
      </v-col>
    </v-row>
  </v-container>
</template>

<script setup>
import { ref, onMounted, onBeforeUnmount, watch } from "vue";
import SlideshowKenBurnsSmall from "@/components/SlideshowKenBurnsSmall.vue";

// const windowWidth = ref(0);
const intervalTimer = ref(null);
const timer = ref(0);
const hideOverlay = ref(false);
const titleImg = ref("");
const slides = ref([]);

onMounted(async () => {
  const producerPgContent = await queryContent("producer").findOne();
  titleImg.value = producerPgContent.titleImg;
  slides.value = producerPgContent.slides;

  // onResize();
  // window.addEventListener("resize", onResize);

  startTimer();
  // document.addEventListener("mousemove", () => {
  //   if (hideOverlay.value) {
  //     hideOverlay.value = false;
  //     startTimer();
  //   } else {
  //     timer.value = 0;
  //   }
  // });
});

// function onResize() {
//   windowWidth.value = window.innerWidth;
// }

// onBeforeUnmount(() => {
//   window.removeEventListener("resize", onResize);
// });

function startTimer() {
  timer.value = 0;
  intervalTimer.value = setInterval(() => {
    timer.value += 1;
  }, 1000);
}

watch(timer, (val) => {
  if (val >= 15) {
    // fade out overlay after 15 seconds
    hideOverlay.value = true;
    clearInterval(intervalTimer.value);
    timer.value = 0;
  }
});
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
  top: 75%;
  transform: translateY(-50%);
  z-index: 10;

  * {
    opacity: 1;
    transition: opacity 2s ease-in-out;

    &.hide {
      opacity: 0;
    }
  }
}

.mainContent {
  bottom: 0;
  max-width: 900px;
  padding-left: 5%;
  padding-right: 5%;
  text-align: center;
  z-index: 20;
}

.titleImg {
  width: 100%;
  height: auto;
  margin: auto;
  padding-bottom: 15px;
}

.slideshowText {
  color: #ffffff;
  font-family: "Libre Baskerville", serif;
  font-size: 1rem;
  font-weight: 400;
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

.linksContainer {
  display: flex;
  margin-top: 2rem;
}

.link {
  display: flex;
  position: relative;
  justify-content: center;

  .linkImg {
    position: absolute;
    display: block;
    width: 80%;
    height: 100%;

    @include media-breakpoint-up(sm) {
      width: 70%;
    }

    @include media-breakpoint-up(md) {
      width: 65%;
    }

    &.hover {
      position: relative;
      visibility: hidden;
    }
  }

  &:hover {
    .linkImg {
      visibility: hidden;

      &.hover {
        visibility: visible;
      }
    }
  }
}
</style>
