<template>
  <audio
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
import { onMounted, onUpdated, ref } from "vue";
import { useMainStore } from "@/stores/mainStore";

const store = useMainStore();

const props = defineProps({
  audioDuration: Number,
  audioFile: {
    type: String,
    required: true,
  },
  audioFadeInDuration: {
    type: Number,
    default: 5,
  },
  audioFadeOutDuration: {
    type: Number,
    default: 5,
  },
  // maxVolume: {
  //   type: Number,
  //   default: 1.0,
  // },
  playMusic: {
    type: Boolean,
    default: true,
  },
});

const maxVolume = computed(() => store.bgMusicAudioMaxVolume);
watch(
  () => maxVolume.value,
  (newVal) => {
    if (audioEl.value) {
      audioEl.value.volume = newVal;
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
  if (!audioEl.value) return;

  audioEl.value.volume = 0;

  audioEl.value.src = props.audioFile;

  audioEl.value.play();

  audioPlaying.value = !audioEl.value.paused;
  store.bgMusicAudioPlaying = !audioEl.value.paused;

  audioEl.value.muted = false;
  audioMuted.value = false;
  store.bgMusicAudioMuted = false;

  const intervalTime = 100; // 100ms
  const intervalSteps = (props.audioFadeInDuration * 1000) / intervalTime;
  function intervalCallback() {
    // if (audioEl.value) {
    //   audioEl.value.volume = Math.min(
    //     props.maxVolume,
    //     audioEl.value.volume + props.maxVolume / intervalSteps
    //   );
    // }
    if (audioEl.value) {
      audioEl.value.volume = Math.min(
        maxVolume.value,
        audioEl.value.volume + maxVolume.value / intervalSteps
      );
    }
  }
  const interval = setInterval(intervalCallback, intervalTime);

  // clear interval after fade in duration
  setTimeout(() => {
    clearInterval(interval);
    if (audioEl.value) {
      // audioEl.value.volume = props.maxVolume;
      audioEl.value.volume = maxVolume.value;
    }
  }, props.audioFadeInDuration * 1000);
};

onMounted(() => {
  if (props.audioFile !== "" && props.playMusic) {
    playAndFadeAudio();
  }
});

onUpdated(() => {
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
