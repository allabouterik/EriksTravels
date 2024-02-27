<template>
  <audio
    v-if="props.audioFile !== ''"
    controls
    ref="audioEl"
    style="display: none"
  >
    <source
      :src="props.audioFile"
      type="audio/mpeg"
    />
    Your browser does not support the audio element.
  </audio>
</template>

<script setup lang="ts">
import { onMounted, ref } from "vue";
import { useMainStore } from "@/stores/mainStore";

const store = useMainStore();

// export type BackgroundMusicProps = {
//   audioFile: string;
//   audioDuration: number;
//   audioFadeInDuration: number;
//   audioFadeOutDuration: number;
//   maxVolume: number;
//   playMusic: boolean;
// };

const props = defineProps({
  audioFile: {
    type: String,
    required: true,
  },
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

store.bgMusicAudioFile = props.audioFile;

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

  audioEl.value.volume = 1;
  audioEl.value.play();
  audioPlaying.value = !audioEl.value.paused;
  store.bgMusicAudioPlaying = !audioEl.value.paused;

  audioEl.value.muted = false;
  audioMuted.value = false;
  store.bgMusicAudioMuted = false;

  audioEl.value.animate([{ volume: 0 }, { volume: 1 }], {
    duration: 1000,
    easing: "ease-in",
  });

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
  if (props.audioFile !== "" && props.playMusic) {
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
