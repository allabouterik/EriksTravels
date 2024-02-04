import { defineStore } from "pinia";

export const useMainStore = defineStore("main", () => {
  const videoLightBoxOpen = ref(false);

  const videoLightBoxProps = ref({
    videos: null,
    videoIndex: null,
    disableScroll: false,
  });

  const layoutScrollable = ref(true);

  return {
    videoLightBoxOpen,
    videoLightBoxProps,
    layoutScrollable,
  };
});
