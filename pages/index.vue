<template>
  <router-view v-slot="{ route }">
    <div :key="route.fullPath">
      <Head>
        <Title>Show Reel</Title>
      </Head>

      <div class="showreel">
        <div class="siteLogo">
          <img
            alt="Site logo"
            src="/header/eriks-travels-logo-white.png"
            height="150"
          />
        </div>

        <div
          class="playImgContainer"
          @click="videoIndex = 0"
        >
          <!-- <h2 class="title">
            Watch a snippet of the sights and sounds from Erik's Travels
          </h2> -->
          <img
            src="~/assets/images/playarrowcircle-black.png"
            class="playImg"
          />
          <img
            src="~/assets/images/playarrowcircle-hover.png"
            class="playImg hover"
          />
        </div>

        <div class="skipTextContainer">
          <a
            href="/home"
            class="skipText"
            >Skip to Menu</a
          >
        </div>
      </div>

      <VideoLightBox
        :videos="videos"
        :index="videoIndex"
        :autoplay="true"
        :disable-scroll="true"
        :windowPercentage="1"
        @close="onVideoClose"
      />
    </div>
  </router-view>
</template>

<script setup>
import { reactive, ref } from "vue";

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

const videos = reactive([
  {
    // title: "Show Reel"˚,
    url: "https://player.vimeo.com/video/877457983",
  },
]);

const videoIndex = ref(null);

const onVideoClose = () => {
  videoIndex.value = null;
  setTimeout(async () => {
    await navigateTo("/home");
  }, 1000);
};
</script>

<style lang="scss" scoped>
@font-face {
  font-family: NeueHaasGroteskText Pro55;
  src: url("../assets/fonts/nhaasgrotesktxpro-55rg.eot"); /* IE9 Compat Modes */
  src: url("../assets/fonts/nhaasgrotesktxpro-55rg.eot?#iefix")
      format("embedded-opentype"),
    /* IE6-IE8 */ url("../assets/fonts/nhaasgrotesktxpro-55rg.woff")
      format("woff"),
    /* Pretty Modern Browsers */
      url("../assets/fonts/nhaasgrotesktxpro-55rg.svg#NHaasGroteskTXPro-55Rg")
      format("svg"); /* Legacy iOS */
}

.siteLogo {
  display: flex;
  justify-content: center;
  padding-top: 2rem;
  img {
    max-height: 120px;

    @media screen and (min-width: 768px) {
      max-height: 150px;
    }
  }
}

.showreel {
  position: relative;
  height: 100vh;
  width: 100vw;
  background-image: url("/showreel.jpg");
  background-size: cover;

  .playImgContainer {
    position: absolute;
    top: 50%;
    left: 50%;
    width: 500px;
    max-width: 90%;
    height: 300px;
    color: black;
    text-align: center;
    transform: translate3d(-50%, -50%, 0);
    cursor: pointer;

    .title {
      font-size: 1.5rem;
      font-weight: 600;

      @media screen and (min-width: 768px) {
        font-size: 2rem;
      }
    }

    .playImg {
      position: absolute;
      top: 50%;
      left: 50%;
      width: 100px;
      transform: translate3d(-50%, -50%, 0);

      &.hover {
        visibility: hidden;
      }
    }

    &:hover {
      color: #bbd72d;

      .playImg {
        visibility: hidden;

        &.hover {
          visibility: visible;
        }
      }
    }
  }
}

.skipTextContainer {
  position: absolute;
  bottom: 10%;
  left: 50%;
  transform: translate3d(-50%, 100%, 0);
}

.skipText {
  display: block;
  color: white;
  font-family: "NeueHaasGroteskText Pro55", sans-serif;
  font-size: 1.5rem;
  font-weight: 600;
  letter-spacing: 0.8px;
  text-align: center;
  text-transform: uppercase;
  text-shadow: 2px 2px 5px rgba(0, 0, 0, 0.65);
  cursor: pointer;
  z-index: 10;

  &:hover {
    color: #bbd72d;
  }

  @media screen and (min-width: 768px) {
    font-size: 2rem;
  }
}
</style>
