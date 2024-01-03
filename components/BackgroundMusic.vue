<template>
  <div
    v-if="audioFile"
    class="soundIconContainer"
  >
    <Tooltip
      :text="tooltipText"
      location="bottom"
      theme="dark"
    >
      <img
        v-if="audioPlaying && !audioMuted"
        alt="Mute background music"
        src="../assets/images/sound-playing.png"
        class="audioIcon"
        @click="clickAudioIcon()"
      />
      <img
        v-else
        alt="Play background music"
        src="../assets/images/sound-muted.png"
        class="audioIcon"
        @click="clickAudioIcon()"
      />
    </Tooltip>

    <audio
      controls
      ref="audioEl"
      style="display: none"
    >
      <source
        :src="this.audioFile"
        type="audio/mpeg"
      />
      Your browser does not support the audio element.
    </audio>
  </div>
</template>

<script>
import { EventBus } from '../composables/event-bus';

export default {
  name: 'BackgroundMusic',

  props: {
    audioFile: {
      type: String,
    },
    audioDuration: {
      type: Number,
    },
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
  },

  data() {
    return {
      audio: null,
      audioPlaying: false,
      audioMuted: true,
      audioFinished: false,
      leavingPage: false,
      pageFadeOutDuration: 1.4, // secs
      audioTimeAtStartPageLeave: 0, // secs
    };
  },

  computed: {
    tooltipText() {
      if (this.audioPlaying && !this.audioMuted) {
        return 'Mute background music';
      } else if (this.audioPlaying && this.audioMuted) {
        return 'Unmute background music';
      }
      return 'Play background music';
    },
  },

  watch: {
    audio(val) {
      if (val && this.playMusic && !this.audioPlaying) {
        // play audio with fade in/out
        this.playAndFadeAudio();
      }
    },
    audioFinished(val) {
      if (val) {
        // play audio again with fade in/out
        this.playAndFadeAudio();
      }
    },
    audioMuted(val) {
      if (!val && this.audioPlaying) {
        EventBus.$emit('backgroundMusicPlaying');
      }
    },
    audioPlaying(val) {
      if (val && !this.audioMuted) {
        EventBus.$emit('backgroundMusicPlaying');
      }
    },
  },

  mounted() {
    this.getAudioElement();

    EventBus.$on('audioPlaying', this.eventBusListener);
    EventBus.$on('lightboxMediaLoaded', this.eventBusListener);
  },

  updated() {
    this.getAudioElement();
  },

  beforeUnmount() {
    // set data for fading out audio
    this.leavingPage = true;
    this.audioTimeAtStartPageLeave = this.audio.currentTime;

    EventBus.$off('audioPlaying', this.eventBusListener);
    EventBus.$off('lightboxMediaLoaded', this.eventBusListener);
  },

  methods: {
    getAudioElement() {
      this.audio = this.$refs.audioEl;
    },
    clickAudioIcon() {
      if (!this.audio) return;

      if (!this.audioPlaying) {
        this.playAndFadeAudio();
      } else {
        this.audio.muted = !this.audio.muted;
        this.audioMuted = !this.audioMuted;
      }
    },
    playAndFadeAudio() {
      if (!this.audio) return;

      let promise = this.audio.play();
      if (promise !== undefined) {
        promise
          .then((_) => {
            this.audioPlaying = true;
            this.audioMuted = false;
            this.getSoundAndFadeAudio();
          })
          .catch((error) => {
            console.error(error);
            this.audioPlaying = false;
            this.audioMuted = false;
            console.log('Error playing background audio');
          });
      } else {
        this.audioPlaying = false;
        this.audioMuted = false;
      }
    },
    getSoundAndFadeAudio() {
      if (!this.audio) return;

      if (this.audioPlaying) {
        this.audio.volume = 0.0;
        this.audio.currentTime = 0;

        // Fade In
        let fadeAudioIn = setInterval(
          function () {
            if (
              this.audio.currentTime < this.audioFadeInDuration &&
              this.audio.volume != this.maxVolume
            ) {
              this.audio.volume = Math.min(
                (this.audio.currentTime / this.audioFadeInDuration) *
                  this.maxVolume,
                this.maxVolume
              );
            }
            if (
              this.audio.currentTime >= this.audioFadeInDuration ||
              this.audio.volume >= this.maxVolume
            ) {
              clearInterval(fadeAudioIn);
              this.audio.volume = this.maxVolume;
            }
          }.bind(this),
          200
        );

        // Fade Out
        let fadeOutPoint = this.audioDuration - this.audioFadeOutDuration;
        let fadeAudioOut = setInterval(
          function () {
            this.audioFinished = false;
            if (
              this.audio.currentTime >= fadeOutPoint &&
              this.audio.volume != 0.0
            ) {
              this.audio.volume = Math.max(
                0.0,
                Math.min(
                  this.maxVolume,
                  (this.audioDuration - this.audio.currentTime) /
                    this.audioFadeOutDuration
                )
              );
            } else if (this.leavingPage) {
              this.audio.volume = Math.max(
                0.0,
                Math.min(
                  this.maxVolume,
                  (this.audioTimeAtStartPageLeave +
                    this.pageFadeOutDuration -
                    this.audio.currentTime) /
                    this.pageFadeOutDuration
                )
              );
            }

            if (this.audio.volume < 0.05 && this.audio.currentTime > 1) {
              if (!this.audioMuted && !this.leavingPage) {
                this.audioPlaying = false;
                this.audioFinished = true;
                clearInterval(fadeAudioOut);
              } else if (this.leavingPage) {
                this.audioPlaying = false;
                this.audioFinished = false;
                this.audio.pause();
                this.audio.currentTime = 0.0;
                clearInterval(fadeAudioOut);
              }
            }
          }.bind(this),
          200
        );
      }
    },

    eventBusListener() {
      if (this.audio != null && this.audioPlaying && !this.audioMuted) {
        this.audio.muted = true;
        this.audioMuted = true;
      }
    },
  },
};
</script>

<style scoped>
.soundIconContainer {
  position: fixed;
  top: 52px;
  right: 7.3%;
  z-index: 1000;
}

.audioIcon {
  max-width: 72px;
  height: auto;
}

/* Responsive breakpoints ref: https://getbootstrap.com/docs/4.3/layout/overview/ */

/* Extra small devices (portrait phones, less than 576px) */
@media only screen and (max-width: 575.98px) {
  .soundIconContainer {
    top: 25px;
    right: 22px;
  }
  .audioIcon {
    max-width: 52px;
  }
}

/* Small devices (landscape phones, 576px and up) */
@media only screen and (min-width: 576px) and (max-width: 767.98px) {
  .soundIconContainer {
    top: 32px;
    right: 35px;
  }
  .audioIcon {
    max-width: 57px;
  }
}

/* Medium devices (tablets, 768px and up) */
@media only screen and (min-width: 768px) and (max-width: 991.98px) {
  .soundIconContainer {
    top: 35px;
    right: 46px;
  }
  .audioIcon {
    max-width: 62px;
  }
}

/* Large devices (desktops, 992px and up) */
@media only screen and (min-width: 992px) and (max-width: 1199.98px) {
  .soundIconContainer {
    top: 39px;
    right: 44px;
  }
  .audioIcon {
    max-width: 67px;
  }
}
</style>
