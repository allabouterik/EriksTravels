<template>
  <NuxtLink
    to="/home"
    class="logoLink"
  >
    <img
      alt="Home page"
      :src="`/header/eriks-travels-logo-${
        $route.path === '/home' ? 'yellow' : 'white'
      }.png`"
      height="100"
      class="menuImg" />
    <img
      alt="Home page"
      src="/header/eriks-travels-logo-yellow.png"
      height="100"
      class="menuImg hover"
  /></NuxtLink>

  <div class="nav-items">
    <template
      v-for="menuItem in navMenuItems"
      :key="menuItem.text"
    >
      <NuxtLink
        v-if="menuItem.to"
        :to="menuItem.to"
        class="menuLink"
      >
        <img
          :alt="menuItem.altText"
          :src="`/header/${$route.path === menuItem.to ? 'yellow' : 'white'}_${
            menuItem.img
          }`"
          height="60"
          class="menuImg"
        />
        <img
          :alt="menuItem.altText"
          :src="`/header/yellow_${menuItem.img}`"
          height="60"
          class="menuImg hover"
        />
      </NuxtLink>
      <button
        v-else-if="menuItem.video"
        class="menuLink"
        @click="openVideoLightBox([menuItem.video], 0)"
      >
        <img
          :alt="menuItem.altText"
          :src="`/header/white_${menuItem.img}`"
          height="60"
          class="menuImg"
        />
        <img
          :alt="menuItem.altText"
          :src="`/header/yellow_${menuItem.img}`"
          height="60"
          class="menuImg hover"
        />
      </button>
      <button
        v-else-if="menuItem.componentName"
        class="menuLink"
        @click="openPageLightBox(menuItem.componentName, true)"
      >
        <img
          :alt="menuItem.altText"
          :src="`/header/white_${menuItem.img}`"
          height="60"
          class="menuImg"
        />
        <img
          :alt="menuItem.altText"
          :src="`/header/yellow_${menuItem.img}`"
          height="60"
          class="menuImg hover"
        />
      </button>
    </template>

    <BackgroundMusicIcons />
  </div>
</template>

<script>
import { mapActions, mapWritableState } from "pinia";
import { useMainStore } from "@/stores/mainStore";

export default {
  data() {
    return {
      navMenuItems: [
        {
          img: "show-reel_menu.png",
          altText: "Show Reel",
          video: {
            title: "Show Reel",
            url: "https://player.vimeo.com/video/877457983",
          },
        },
        {
          img: "film-portfolio_menu.png",
          altText: "Film Portfolio",
          to: "/film-portfolio",
        },
        {
          img: "the-producer_menu.png",
          altText: "The Producer",
          componentName: "ProducerContent",
        },
        {
          img: "film-festivals_menu.png",
          altText: "Film Festivals",
          to: "/film-festivals",
        },
        {
          img: "contact-credits_menu.png",
          altText: "Contact and Credits",
          to: "/contact",
        },
      ],
    };
  },
  computed: {
    ...mapWritableState(useMainStore, ["videoLightBoxProps"]),
  },
  methods: {
    ...mapActions(useMainStore, ["openPageLightBox"]),

    openVideoLightBox(videos, videoIndex) {
      this.videoLightBoxProps = {
        videos,
        videoIndex,
        disableScroll: true,
      };
    },
  },
};
</script>

<style lang="scss" scoped>
.logoLink {
  position: relative;
  padding: 8px 16px 8px 0;

  .menuImg {
    position: absolute;
    top: 50%;
    left: 0;
    transform: translate3d(0%, -50%, 0);

    &.hover {
      position: relative;
      visibility: hidden;
    }
  }

  &:hover {
    .menuImg {
      visibility: hidden;

      &.hover {
        visibility: visible;
      }
    }
  }
}

.nav-items {
  display: flex;
  width: 100%;
  justify-content: space-around;
  align-items: center;
}

.menuLink {
  position: relative;
  height: 100%;
  width: inherit;

  .menuImg {
    position: absolute;
    top: 50%;
    left: 0;
    left: 50%;
    transform: translate3d(-50%, -50%, 0);

    &.hover {
      visibility: hidden;
    }
  }

  &:hover {
    .menuImg {
      visibility: hidden;

      &.hover {
        visibility: visible;
      }
    }
  }
}
</style>
