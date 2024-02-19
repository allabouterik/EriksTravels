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
              height="calc(100vh - 148px)"
              maxImgHeight="calc(100vh - 148px)"
              :scaleImgToContainer="true"
              imageObjectFit="cover"
            />

            <!-- SLIDESHOW OVERLAY -->
            <div class="slideshowOverlay mb-4">
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
    };
  },

  async mounted() {
    this.producerPgContent = await queryContent("producer").findOne();
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
};
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
  font-family: "NeueHaasGroteskText Pro55";
  font-feature-settings: "liga";
  font-size: 1.375rem;
  font-weight: 400;
  line-height: 2.0625rem;
  letter-spacing: 2px;
  text-align: center;
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

/* Responsive breakpoints ref: https://getbootstrap.com/docs/4.3/layout/overview/ */

@media only screen and (max-width: 1199.98px) {
  .slideshowText {
    font-size: calc(
      1rem + 6 * (100vw - 300px) / (1200 - 300)
    ); /* varies between 16px (1rem) at 300px vw and 22px (1.375rem) at 1200px vw */
    line-height: calc(
      1.0625rem + 16 * (100vw - 300px) / (1200 - 300)
    ); /* varies between 17px (1.0625rem) at 300px vw and 33px (2.0625rem) at 1200px vw */
  }
}

/* Extra small devices (portrait phones, less than 576px) */
@media only screen and (max-width: 575.98px) and (orientation: landscape) {
  .slideshowText {
    font-size: 14.5px;
  }
  .slideshowOverlay {
    padding-bottom: 0px;
    margin-bottom: 8px !important;
  }
}

/* Small devices (landscape phones, 576px and up) */
@media only screen and (min-width: 576px) and (max-width: 767.98px) and (orientation: landscape) {
  .slideshowText {
    font-size: 16px;
  }
  .slideshowOverlay {
    padding-bottom: 4px;
  }
}

/* Medium devices (tablets, 768px and up) */
@media only screen and (min-width: 768px) and (max-width: 991.98px) and (orientation: landscape) {
  .slideshowText {
    font-size: 18px;
  }
  .slideshowOverlay {
    padding-bottom: 4px;
  }
}
</style>
