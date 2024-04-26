<template>
  <NuxtLink
    to="/home"
    class="logoLink"
  >
    <img
      alt="Home page"
      :src="`/header/eriks-travels-logo-${
        removeSlashFromEnd($route.path) === '/home' ? 'yellow' : 'white'
      }.png`"
      height="80"
      class="menuImg" />
    <img
      alt="Home page"
      src="/header/eriks-travels-logo-yellow.png"
      height="80"
      class="menuImg hover"
  /></NuxtLink>

  <div
    class="nav-items"
    :class="{ navRightMargin: bgMusicIconHidden }"
  >
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
          :src="`/header/${
            removeSlashFromEnd($route.path) === menuItem.to ? 'yellow' : 'white'
          }_${menuItem.img}`"
          :height="menuItem.to === '/shorts' ? 27 : 58"
          class="menuImg"
        />
        <img
          :alt="menuItem.altText"
          :src="`/header/yellow_${menuItem.img}`"
          :height="menuItem.to === '/shorts' ? 27 : 58"
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
          height="58"
          class="menuImg"
        />
        <img
          :alt="menuItem.altText"
          :src="`/header/yellow_${menuItem.img}`"
          height="58"
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

    <BackgroundMusicIcons v-if="!isXlScreenAndUp" />
  </div>
  <BackgroundMusicIcons v-if="isXlScreenAndUp" />
</template>

<script setup>
import { ref, watch } from "vue";
import { useMainStore } from "@/stores/mainStore";
import { useMediaQuery } from "@vueuse/core";
import { removeSlashFromEnd } from "@/utils/removeSlashFromEnd";

const isXlScreenAndUp = useMediaQuery("(min-width: 1200px)");

const store = useMainStore();
const bgMusicIconHidden = ref(() => store.bgMusicAudioFile === "");

watch([store], () => {
  bgMusicIconHidden.value = store.bgMusicAudioFile === "";
});
</script>

<script>
import { mapActions, mapState, mapWritableState } from "pinia";
import { useMainStore } from "@/stores/mainStore";

export default {
  computed: {
    ...mapState(useMainStore, ["navMenuItems"]),
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
  padding: 10px 16px 10px 0;

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

  @include media-breakpoint-up(xxl) {
    justify-content: center;
  }

  &.navRightMargin {
    @include media-breakpoint-up(xl) {
      --logo-width: 177px;
      margin-right: var(--logo-width);
    }
  }
}

.menuLink {
  position: relative;
  height: 100%;
  width: inherit;

  @include media-breakpoint-up(xxl) {
    max-width: 200px;
  }

  .menuImg {
    position: absolute;
    top: 50%;
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
