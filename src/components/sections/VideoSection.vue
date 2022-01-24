<template>
  <VSection
    class="bg-gray-300 h-screen px-8 pb-8 pt-24"
    :class="{ 'no-cursor': !shouldShowCursor }"
  >
    <div class="w-full h-full relative">
      <div class="absolute inset-0 flex items-center justify-center">
        <Loader v-if="!isLoaded" />
      </div>
      <video
        ref="videoContainer"
        class="object-cover w-full h-full"
        :class="[
          { 'animate__animated animate__fadeIn animate__slow': isStarted },
          { 'animate__animated animate__fadeOut animate__faster': shouldLeaveSection }
        ]"
        @ended="videoEnded"
        @loadeddata="isLoaded = true"
      >
        <source
          :src="video"
          type="video/mp4"
        >
      </video>
      <Controls
        :activated="videoActivated"
        :is-playing="isPlaying"
        :title="videoTitle"
        @on-toggle-play="togglePlay"
        @on-cursor-show="shouldShowCursor = true"
        @on-cursor-hide="shouldShowCursor = false"
      />
      <!-- <IconClose
        v-if="shouldShowCursor"
        class="text-white text-2xl absolute top-4 right-8 cursor-pointer transition-colors hover:text-red-500"
        :class="[
          { 'animate__animated animate__fadeIn': shouldShowCursor },
          { 'animate__animated animate__fadeOut': !shouldShowCursor },
        ]"
        @click="emit('section-completed')"
      /> -->
    </div>
  </VSection>
</template>
<script setup>
import { defineProps, toRefs, ref, onMounted, watch, getCurrentInstance, computed } from 'vue';
import Cookies from 'js-cookie'
import { timeout } from '../../helpers';
import Controls from '../Controls.vue';
import VSection from '../VSection.vue';
// import IconClose from '../IconClose.vue';
import Loader from '../Loader.vue';

const PLAY_TIME = 'playtime';

const props = defineProps({
  shouldLeaveSection: {
    type: Boolean,
    default: false,
  },
  titleData: {
    type: Object,
    default: null,
  },
  video: {
    type: String,
    default: ''
  },
});

const { shouldLeaveSection, video, titleData } = toRefs(props);
const { emit } = getCurrentInstance();
const videoContainer = ref(null);
const shouldShowCursor = ref(true);
const isLoaded = ref(false);
const videoActivated = ref(false);

watch(shouldLeaveSection, (newValue) => {
  if (newValue) {
    savePlayTime();
  }
});

const videoTitle = computed(() => {
  if (!titleData.value) return '';
  return `${titleData.value.text} - Video`;
});

const isPlaying = ref(false);
const isStarted = ref(false);

onMounted(async () => {
  isStarted.value = true;
  await timeout(2000);
  isStarted.value = false;
  if (videoContainer.value) {
    const currentTime = await Cookies.get(PLAY_TIME);
    if (currentTime) {
      videoContainer.value.currentTime = currentTime || 0;
    }
    // videoContainer.value.play();
  }
});

const togglePlay = () => {
  videoActivated.value = true;
  if (videoContainer.value.paused) {
    videoContainer.value.play();
    isPlaying.value = true;
  } else {
    videoContainer.value.pause();
    isPlaying.value = false;
  }
};

const videoEnded = () => {
  emit('section-completed');
};

const savePlayTime = () => {
  if (videoContainer.value) {
    Cookies.set(PLAY_TIME, videoContainer.value.currentTime);
  }
};
</script>
