import { defineStore } from "pinia";

export const useMainStore = defineStore("main", () => {
  const navMenuItems = ref([
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
      componentName: "FilmFestivalsContent",
    },
    {
      img: "contact-credits_menu.png",
      altText: "Contact and Credits",
      to: "/contact",
    },
  ]);

  const layoutScrollable = ref(true);

  // Page Lightbox
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
  const pageLightBoxOpen = computed(
    () => pageLightBoxProps.value.componentName !== ""
  );

  // Video Lightbox
  const videoLightBoxOpen = ref(false);
  const videoLightBoxProps = ref({
    videos: null,
    videoIndex: null,
    disableScroll: false,
  });

  // Background Music
  const bgMusicAudioFile = ref("");
  const bgMusicAudioPlaying = ref(false);
  const bgMusicAudioMuted = ref(true);
  const bgMusicAudioMaxVolume = ref(1);
  const bgMusicFadeDuration = ref(0); // in seconds
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
    navMenuItems,
    layoutScrollable,
    pageLightBoxProps,
    pageLightBoxOpen,
    openPageLightBox,
    closePageLightBox,
    videoLightBoxOpen,
    videoLightBoxProps,
    bgMusicAudioFile,
    bgMusicAudioPlaying,
    bgMusicAudioMuted,
    bgMusicAudioMaxVolume,
    bgMusicFadeDuration,
    bgMusicTooltipText,
    playBgMusic,
    muteBgMusic,
    toggleBgMusic,
  };
});
