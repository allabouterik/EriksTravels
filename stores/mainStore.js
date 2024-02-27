import { defineStore } from "pinia";

export const useMainStore = defineStore("main", () => {
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
    videoLightBoxOpen,
    videoLightBoxProps,
    layoutScrollable,
    bgMusicAudioFile,
    bgMusicAudioPlaying,
    bgMusicAudioMuted,
    bgMusicTooltipText,
    playBgMusic,
    muteBgMusic,
    toggleBgMusic,
  };
});
