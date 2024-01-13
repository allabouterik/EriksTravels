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
      </div>

      <!-- <div class="videoContainer">
        <iframe
          src="https://player.vimeo.com/video/877457983?badge=0&amp;autopause=0&amp;player_id=0&amp;app_id=58479&autoplay=1&loop=1&muted=0"
          allow="autoplay; fullscreen; picture-in-picture"
          frameborder="0"
          title="Show Reel"
          id="mainVideo"
          class="videoIframe"
          data-not-lazy
        />
      </div> -->

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
  background-image: url("/showreel2.jpg");
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

.videoContainer {
  position: relative;
  height: 100vh;
  overflow-y: hidden;

  @media screen and (min-width: 992px) {
    height: calc(100vh - 148px); // to account for the navbar on desktop
  }
}

.videoIframe {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
}
</style>
