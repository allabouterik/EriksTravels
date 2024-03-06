import { defineStore } from "pinia";

export const useMainStore = defineStore("main", () => {
  const pageLightBoxProps = ref({
    componentName: "",
    disableScroll: false,
  });
  function openPageLightBox(componentName, disableScroll) {
    pageLightBoxProps.value.componentName = componentName;
    pageLightBoxProps.value.disableScroll = disableScroll;
  }
  function closePageLightBox() {
    pageLightBoxProps.value.componentName = "";
    pageLightBoxProps.value.disableScroll = false;
  }
  const pageLightBoxOpen = computed(() => {
    return pageLightBoxProps.value.componentName !== "";
  });

  const videoLightBoxOpen = ref(false);
  const videoLightBoxProps = ref({
    videos: null,
    videoIndex: null,
    disableScroll: false,
  });

  const layoutScrollable = ref(true);

  // Background Music
  const bgMusicAudioFile = ref("");
  const bgMusicAudioPlaying = ref(false);
  const bgMusicAudioMuted = ref(true);
  const bgMusicAudioMaxVolume = ref(1);
  const bgMusicTooltipText = computed(() => {
    if (bgMusicAudioPlaying.value && !bgMusicAudioMuted.value) {
      return "Mute background music";
    } else if (bgMusicAudioPlaying.value && bgMusicAudioMuted.value) {
      return "Unmute background music";
    }
    return "Play background music";
  });
  function playBgMusic() {
    bgMusicAudioPlaying.value = true;
    bgMusicAudioMuted.value = false;
  }
  function muteBgMusic() {
    bgMusicAudioMuted.value = true;
  }
  function toggleBgMusic() {
    if (bgMusicAudioPlaying.value) {
      bgMusicAudioMuted.value = !bgMusicAudioMuted.value;
    } else {
      playBgMusic();
    }
  }

  return {
    pageLightBoxProps,
    pageLightBoxOpen,
    openPageLightBox,
    closePageLightBox,
    videoLightBoxOpen,
    videoLightBoxProps,
    layoutScrollable,
    bgMusicAudioFile,
    bgMusicAudioPlaying,
    bgMusicAudioMuted,
    bgMusicAudioMaxVolume,
    bgMusicTooltipText,
    playBgMusic,
    muteBgMusic,
    toggleBgMusic,
  };
});
