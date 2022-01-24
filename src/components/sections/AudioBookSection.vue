<template>
  <VSection class="bg-gray-300 relative">
    <audio
      ref="audioElement"
      :src="audio"
      preload
      @loadedmetadata="onMetadataLoaded"
      @loadeddata="onAudioReady"
      @pause="onPaused"
      @play="onPlay"
      @waiting="onWaiting"
      @timeupdate="onTimeUpdated"
      @ended="onAudioEnded"
    />
    <div class="w-full h-screen flex flex-col justify-between bg-gradient-to-b from-transparent via-blue-400 to-transparent">
      <div class="mt-24" />
      <div class="w-full flex flex-col items-center justify-center text-white">
        <div class="text-3xl tracking-widest font-caligula">
          {{ title }}
        </div>
        <div class="text-2xl tracking-widest font-caligula italic mt-4">
          {{ subtitle }}
        </div>
      </div>
      <div class="w-full flex items-center mb-24 px-24 z-10">
        <transition
          mode="out-in"
          enter-active-class="animate__animated animate__fadeIn animate__faster animate-faster"
          leave-active-class="animate__animated animate__fadeOut animate__faster animate-faster"
        >
          <component
            :is="playbackIcon"
            class="text-white w-16 h-16 cursor-pointer transition-transform transform hover:scale-150"
            @click="togglePlayback"
          />
        </transition>
        <span class="ml-10 text-white whitespace-nowrap">Listen</span>
        <span class="ml-2 text-white whitespace-nowrap">{{ audioDuration }}</span>
        <span class="w-full h-px ml-10 bg-gradient-to-r from-transparent via-white to-transparent" />
      </div>
    </div>
    <div class="absolute right-0 bottom-0 h-2/3">
      <img
        class="w-full h-full backdrop-filter backdrop-blur-md"
        src="../../assets/img/audio-section/antho-audio-image1.png"
      >
    </div>
  </VSection>
</template>

<script setup>
import { defineProps, toRefs, ref, computed, markRaw } from 'vue';
import { useRoute } from 'vue-router';
import VSection from '../VSection.vue';
import { titles } from '../../data/index';
import IconPlay from '../IconPlay.vue';
import IconPause from '../IconPause.vue';

const props = defineProps({
  audio: {
    type: String,
    default: ''
  },
});

const { audio } = toRefs(props);
const route = useRoute();
const iconPlay = markRaw(IconPlay);
const iconPause = markRaw(IconPause);
const isAudioReady = ref(false);
const audioDuration = ref('0:00');
const audioElement = ref(null);
const playbackIcon = ref(iconPlay);

const title = computed(() => {
  return titles.find(title => title.name === route.name).text;
});
const subtitle = computed(() => {
  return titles.find(title => title.name === route.name).subtitle;
});
const calculateDuration = ((currentTime) => {
  if (!audioElement.value) return '0:00';
  const durationInSeconds = currentTime
    ? audioElement.value.duration - currentTime
    : audioElement.value.duration;
  const durationMinutes = Math.floor(durationInSeconds / 60);
  const durationSeconds = Math.ceil(durationInSeconds % 60);
  const preZero = `${durationSeconds}`.length === 1 ? '0' : '';
  return `${durationMinutes}:${preZero}${durationSeconds}`;
});
const onMetadataLoaded = () => {
  audioDuration.value = calculateDuration();
};
const onAudioReady = () => {
  isAudioReady.value = true;
  playbackIcon.value = iconPlay;
};
const onPaused = () => {
  playbackIcon.value = iconPlay;
};
const onPlay = () => {
  playbackIcon.value = iconPause;
};
const onWaiting = () => {
  // Set icon to waiting and remove line below
  audioElement.value.pause();
  console.log('waiting...');
};
const onAudioEnded = () => {
  audioElement.value.currentTime = 0;
};
const onTimeUpdated = () => {
  audioDuration.value = calculateDuration(audioElement.value.currentTime);
};
const togglePlayback = () => {
  if (audioElement.value.paused) {
    audioElement.value.play();
  } else {
    audioElement.value.pause();
  }
};
</script>

<style lang="scss" scoped>
.animate-faster {
  --animate-duration: 0.2s;
}
</style>
