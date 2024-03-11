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
          :defaultImgOpacity="1"
        />

        <!-- SLIDESHOW OVERLAY -->
        <div
          class="slideshowOverlay"
          :class="{ hide: hideOverlay }"
        >
          <div class="mainContent mx-auto py-0">
            <img
              alt="Erik Jacobsen title image"
              :src="titleImg"
              class="titleImg mb-md-1 mb-lg-2 mb-xl-4"
              data-testid="title-img"
            />
            <div>
              <p class="slideshowText">
                Award-winning record producer, music publisher, videographer,
                writer, narrator.
              </p>
            </div>
            <div class="linksContainer">
              <a
                href="https://en.wikipedia.org/wiki/Erik_Jacobsen"
                target="_blank"
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
                target="_blank"
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

const intervalTimer = ref(null);
const timer = ref(0);
const hideOverlay = ref(false);
const titleImg = ref("");
const slides = ref([]);

onMounted(async () => {
  const producerPgContent = await queryContent("producer").findOne();
  titleImg.value = producerPgContent.titleImg;
  slides.value = producerPgContent.slides;

  startTimer();
  document.addEventListener("mousemove", () => {
    if (hideOverlay.value) {
      hideOverlay.value = false;
      startTimer();
    } else {
      timer.value = 0;
    }
  });
});

onBeforeUnmount(() => {
  window.removeEventListener("resize", onResize);
});

watch(timer, (val) => {
  if (val >= 20) {
    hideOverlay.value = true;
    clearInterval(intervalTimer.value);
  }
});

function startTimer() {
  timer.value = 0;
  intervalTimer.value = setInterval(() => {
    timer.value += 1;
  }, 1000);
}
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
  opacity: 1;
  transition: opacity 2s ease-in-out;
  z-index: 10;

  &.hide {
    opacity: 0;
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
