<template>
  <VSection :class="{ 'no-cursor': !shouldShowCursor }">
    <div
      class="w-full h-screen flex justify-center items-center bg-black relative"
      :class="[
        { 'animate__animated animate__fadeIn animate__slow': true },
        { 'animate__animated animate__fadeOut animate__faster': shouldLeaveSection }
      ]"
    >
      <Loader v-if="isLoading" />
      <audio
        ref="audioElement"
        :src="audio"
        @ended="onAudioEnded"
      />
      <Controls
        :is-playing="isPlaying"
        :show-controls="true"
        @on-toggle-play="togglePlay"
        @on-cursor-show="shouldShowCursor = true"
        @on-cursor-hide="shouldShowCursor = false"
      />
      <div
        v-if="!isLoading"
        class="h-full w-full flex items-center justify-center"
      >
        <div
          v-for="(banner, index) in currentBannersSet"
          :key="index"
          class="banner-element"
          style="height: 80%;"
          :class="[
            { 'bg-black': banner.type === 'img' },
            { 'flex items-center justify-center': banner.type === 'text' },
            { 'ml-10': index !== 0 },
            { [buildAnim(index, 'In')]: bannerIsStarting },
            { [buildAnim(index, 'Out')]: bannerIsOver },
          ]"
        >
          <img
            v-if="banner.type === 'img'"
            :src="banner.img.src"
            class="h-full"
          >
          <div
            v-else-if="banner.type === 'text'"
            class="text-white"
            v-html="banner.text"
          />
        </div>
      </div>
    </div>
  </VSection>
</template>

<script setup>
import { defineProps, toRefs, ref, onMounted, getCurrentInstance } from 'vue';
import { timeout } from '../../../helpers';
import VSection from '../../VSection.vue';
import tsdSequence from '../../../data/tsd-banner-sequence';
import Loader from '../../Loader.vue';
import Controls from '../../Controls.vue';

const props = defineProps({
  shouldLeaveSection: {
    type: Boolean,
    default: false,
  },
  audio: {
    type: String,
    default: ''
  },
});

const { shouldLeaveSection, audio } = toRefs(props);
const { emit } = getCurrentInstance();
const bannersSetIndex = ref(0);
const currentBannersSet = ref([]);
const bannerIsStarting = ref(false);
const bannerIsOver = ref(false);
const audioElement = ref(null);
const isLoading = ref(false);
const isPlaying = ref(false);
const shouldShowCursor = ref(true);

// onMounted(async () => {
//   await startBannerSequence();
// });

const startBannerSequence = async () => {
  isLoading.value = true;
  const sequence = await tsdSequence();
  isLoading.value = false;
  audioElement.value.play();
  isPlaying.value = true;
  while (bannersSetIndex.value <= sequence.length) {
    currentBannersSet.value = sequence[bannersSetIndex.value];
    bannerIsStarting.value = true;
    await timeout(2000); // wait for appearing anim to finish
    bannerIsStarting.value = false;
    await timeout(3000); // wait for user to see banners
    if (bannersSetIndex.value === sequence.length - 1) {
      return;
    }
    bannerIsOver.value = true;
    await timeout(2000); // wait for dissolve anim to finish
    bannerIsOver.value = false;
    bannersSetIndex.value += 1;
    // if (bannersSetIndex.value === sequence.length) {
    //   bannersSetIndex.value = 0
    // }
  }
};
const buildAnim = (index, mode) => {
  // const animation = getRandomAnim(mode);
  const animation = 'fade';
  // const noDirAnims = ['zoom'];
  // const emptyDir = ['', ''];
  // const directions = !noDirAnims.includes(animation) ? getRandomDirection() : emptyDir;
  const directions = [
    'Up', 'Up',
  ];
  const anim  = index === 0
    ? `animate__${animation}${mode}${directions[0]}` : `animate__${animation}${mode}${directions[1]}`;
  // const speed = mode === 'In' ? 'animate__slow' : ''
  return `animate__animated ${anim} animate__slow`;
};
const onAudioEnded = () => {
  bannerIsOver.value = true;
  emit('section-completed');
};
const togglePlay = () => {
  if (!audioElement.value.paused) {
    return;
  }
  startBannerSequence();
  // if (audioElement.value.paused) {
  //   audioElement.value.play();
  //   isPlaying.value = true;
  // } else {
  //   audioElement.value.pause();
  //   isPlaying.value = false;
  // }
};
// const getRandomTimeout = (min, max) => {
//   return randomRange(min, max);
// };
// const getRandomDirection = () => {
//   const direction = randomRange(0, 3);
//   const directionsMap = [
//     ['Up', 'Down'],
//     ['Right', 'Left'],
//     ['Down', 'Up'],
//     ['Left', 'Right'],
//   ];
//   return directionsMap[direction];
// };
// const getRandomAnim = (mode) => {
//   const rangeMax = mode === 'In' ? 1 : 2;
//   const pick = randomRange(0, rangeMax);
//   const animations = {
//     In: ['fade', 'zoom'],
//     Out: ['back', 'fade', 'zoom'],
//   };
//   return animations[mode][pick];
// };
</script>

<style>
/* .banner-element {
  --animate-duration: 1.33s;
} */
</style>
