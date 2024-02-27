<template>
  <audio
    v-if="store.bgMusicAudioFile !== ''"
    controls
    ref="audioEl"
    style="display: none"
  >
    <source
      :src="store.bgMusicAudioFile"
      type="audio/mpeg"
    />
    Your browser does not support the audio element.
  </audio>
</template>

<script setup lang="ts">
import { onMounted, ref } from "vue";
import { useMainStore } from "@/stores/mainStore";

const store = useMainStore();

const props = defineProps({
  audioDuration: Number,
  audioFadeInDuration: {
    type: Number,
    default: 5,
  },
  audioFadeOutDuration: {
    type: Number,
    default: 5,
  },
  maxVolume: {
    type: Number,
    default: 1.0,
  },
  playMusic: {
    type: Boolean,
    default: true,
  },
});

watch(
  () => store.bgMusicAudioFile,
  (newVal) => {
    if (newVal !== "") {
      audioEl.value!.src = newVal;
      if (store.bgMusicAudioPlaying) {
        playAndFadeAudio();
      }
    }
  }
);

const audioEl = ref<HTMLAudioElement | null>(null);
const audioPlaying = ref(false);
const audioMuted = ref(true);
// const audioFinished = ref(false);
// const leavingPage = ref(false);
// const pageFadeOutDuration = ref(1.4); // secs
// const audioTimeAtStartPageLeave = ref(0); // secs

const playAndFadeAudio = () => {
  console.log("playAndFadeAudio");
  console.log("audioEl.value", audioEl.value);
  if (!audioEl.value) return;

  audioEl.value.volume = props.maxVolume;
  audioEl.value.play();
  audioPlaying.value = !audioEl.value.paused;
  store.bgMusicAudioPlaying = !audioEl.value.paused;

  audioEl.value.muted = false;
  audioMuted.value = false;
  store.bgMusicAudioMuted = false;

  // audioEl.value.animate([{ volume: 0 }, { volume: 1 }], {
  //   duration: 1000,
  //   easing: "ease-in",
  // });

  function intervalCallback() {
    if (audioEl.value) {
      // console log the current volume
      console.log("audioEl.value.volume", audioEl.value.volume);
    }
  }
  const interval = setInterval(intervalCallback, 100);

  // clear interval after 2 seconds
  setTimeout(() => {
    clearInterval(interval);
  }, 2000);
};

onMounted(() => {
  if (store.bgMusicAudioFile !== "" && props.playMusic) {
    playAndFadeAudio();
  }
});

watch(
  () => store.bgMusicAudioPlaying,
  (newVal) => {
    if (newVal) {
      playAndFadeAudio();
    } else {
      audioEl.value!.pause();
      audioPlaying.value = false;
    }
  }
);

watch(
  () => store.bgMusicAudioMuted,
  (newVal) => {
    if (audioEl.value) {
      audioEl.value.muted = newVal;
      audioMuted.value = newVal;
    }
  }
);

watch(
  () => store.videoLightBoxOpen,
  (newVal) => {
    if (newVal) {
      audioEl.value!.pause();
      audioPlaying.value = false;
      store.bgMusicAudioPlaying = false;
    }
  }
);
</script>
