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
      to: "/film-festivals",
    },
    {
      img: "contact-credits_menu.png",
      altText: "Contact and Credits",
      to: "/contact",
    },
  ]);

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
  const videoLightBoxProps = ref({
    videos: [],
    videoIndex: -1,
    disableScroll: false,
    windowPercentage: 0.8,
  });
  function openVideoLightBox(
    videos,
    videoIndex,
    disableScroll,
    windowPercentage = 0.8
  ) {
    videoLightBoxProps.value.videos = videos;
    videoLightBoxProps.value.videoIndex = videoIndex;
    videoLightBoxProps.value.disableScroll = disableScroll;
    videoLightBoxProps.value.windowPercentage = windowPercentage;
  }
  function closeVideoLightBox() {
    videoLightBoxProps.value.videos = [];
    videoLightBoxProps.value.videoIndex = -1;
    videoLightBoxProps.value.disableScroll = false;
  }
  const videoLightBoxOpen = computed(
    () =>
      videoLightBoxProps.value.videos &&
      videoLightBoxProps.value.videoIndex >= 0
  );

  // Image Lightbox
  const imageLightBoxOpen = ref(false);

  const layoutScrollable = computed(
    () =>
      !(
        (pageLightBoxOpen && pageLightBoxProps.value.disableScroll) ||
        (videoLightBoxOpen && videoLightBoxProps.value.disableScroll) ||
        imageLightBoxOpen.value
      )
  );

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

    videoLightBoxProps,
    videoLightBoxOpen,
    openVideoLightBox,
    closeVideoLightBox,

    imageLightBoxOpen,

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
