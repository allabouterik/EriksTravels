import { defineStore } from "pinia";

export const useMainStore = defineStore("main", () => {
  const videoLightBoxOpen = ref(false);

  return { videoLightBoxOpen };
});
