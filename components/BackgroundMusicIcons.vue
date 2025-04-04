<template>
  <ClientOnly>
    <div
      v-if="store.bgMusicAudioFile !== ''"
      class="soundIconContainer"
    >
      <Tooltip
        :text="store.bgMusicTooltipText"
        location="bottom"
        theme="dark"
      >
        <img
          v-if="soundPlaying"
          :alt="store.bgMusicTooltipText"
          src="../assets/images/sound-playing.png"
          class="audioIcon"
          :style="iconStyles"
          @click="onAudioIconClick()"
        />
        <img
          v-else
          :alt="store.bgMusicTooltipText"
          src="../assets/images/sound-muted.png"
          class="audioIcon"
          :style="iconStyles"
          @click="onAudioIconClick()"
        />
      </Tooltip>
    </div>
  </ClientOnly>
</template>

<script setup lang="ts">
import { computed } from "vue";
import { useMainStore } from "@/stores/mainStore";

const store = useMainStore();

const soundPlaying = computed(
  () => store.bgMusicAudioPlaying && !store.bgMusicAudioMuted
);

const onAudioIconClick = () => {
  store.toggleBgMusic();
};

const props = defineProps({
  translateX: {
    type: String,
    default: "-50%",
  },
});

const iconStyles = computed(() => {
  return {
    "--translateX": props.translateX,
  };
});
</script>

<style lang="scss" scoped>
.soundIconContainer {
  position: relative;
  top: 0;
  right: 0;
  width: inherit;
  height: inherit;
  z-index: 1000;
  max-width: 180px;

  @include media-breakpoint-up(lg) {
    --logo-width: 177px;
    max-width: var(--logo-width);
  }
}

.audioIcon {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate3d(var(--translateX), -50%, 0);
  max-width: 52px;
  height: auto;

  @include media-breakpoint-up(sm) {
    max-width: 57px;
  }

  @include media-breakpoint-up(md) {
    max-width: 62px;
  }

  @include media-breakpoint-up(lg) {
    max-width: 67px;
  }

  @include media-breakpoint-up(xl) {
    max-width: 72px;
  }
}
</style>
