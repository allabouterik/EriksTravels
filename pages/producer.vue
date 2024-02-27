<template>
  <router-view v-slot="{ route }">
    <div :key="route.fullPath">
      <Head>
        <Title>{{ pageTitle }}</Title>
      </Head>

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
              :height="windowWidth < 992 ? '100vh' : 'calc(100vh - 148px)'"
              :maxImgHeight="
                windowWidth < 992 ? '100vh' : 'calc(100vh - 148px)'
              "
              :scaleImgToContainer="true"
              imageObjectFit="cover"
            />

            <!-- SLIDESHOW OVERLAY -->
            <div class="slideshowOverlay">
              <div class="mainContent mx-auto py-0">
                <img
                  alt="Erik Jacobsen title image"
                  src="/the-producer/erik-jacobsen-title.png"
                  class="titleImg mb-md-1 mb-lg-2 mb-xl-4"
                  data-testid="title-img"
                />
                <div>
                  <p class="slideshowText">
                    Award-winning record producer, music publisher,
                    videographer, writer, narrator.
                  </p>
                  <p class="slideshowText">
                    As a boy growing up in Chicago, I dreamed of someday
                    travelling to exotic faraway lands.
                    <br />Luckily I got the chance.
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
    </div>
  </router-view>
</template>

<script>
export default {
  data() {
    return {
      producerPgContent: {},
      windowWidth: 0,
    };
  },

  async mounted() {
    this.producerPgContent = await queryContent("producer").findOne();

    this.onResize();
    window.addEventListener("resize", this.onResize);
  },

  beforeDestroy() {
    window.removeEventListener("resize", this.onResize);
  },

  computed: {
    pageTitle() {
      return this.producerPgContent.pageTitle;
    },
    titleImg() {
      return this.producerPgContent.titleImg;
    },
    slides() {
      return this.producerPgContent.slides;
    },
  },

  methods: {
    onResize() {
      this.windowWidth = window.innerWidth;
    },
  },
};
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
  top: 50%;
  transform: translateY(-50%);
  z-index: 10;

  @include media-breakpoint-up(lg) {
    top: calc(50% - (0.5 * 148px));
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
