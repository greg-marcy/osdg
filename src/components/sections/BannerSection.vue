<template>
  <VSection
    class="h-screen bg-gray-300 px-8 pb-8 pt-24"
    :class="{ 'no-cursor': !shouldShowCursor }"
  >
    <div
      class="w-full h-full flex justify-center items-center bg-black relative"
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
        :activated="isPlaying"
        :is-playing="isPlaying"
        :show-controls="!isPlaying"
        :title="bannerTitle"
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
import { defineProps, toRefs, ref, getCurrentInstance, computed } from 'vue';
import { timeout } from '../../helpers';
import VSection from '../VSection.vue';
import tsdSequence from '../../data/tsd-banner-sequence';
import Loader from '../Loader.vue';
import Controls from '../Controls.vue';

const props = defineProps({
  shouldLeaveSection: {
    type: Boolean,
    default: false,
  },
  titleData: {
    type: Object,
    default: null,
  },
  audio: {
    type: String,
    default: ''
  },
});

const { shouldLeaveSection, audio, titleData } = toRefs(props);
const { emit } = getCurrentInstance();
const bannersSetIndex = ref(0);
const currentBannersSet = ref([]);
const bannerIsStarting = ref(false);
const bannerIsOver = ref(false);
const audioElement = ref(null);
const isLoading = ref(false);
const isPlaying = ref(false);
const shouldShowCursor = ref(true);

const bannerTitle = computed(() => {
  if (!titleData.value) return '';
  return `${titleData.value.text} - Banners`;
});

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
  }
};
const buildAnim = (index, mode) => {
  const animation = 'fade';
  const directions = [
    'Up', 'Up',
  ];
  const anim  = index === 0
    ? `animate__${animation}${mode}${directions[0]}` : `animate__${animation}${mode}${directions[1]}`;
  return `animate__animated ${anim} animate__slow`;
};
const onAudioEnded = () => {
  bannerIsOver.value = true;
  emit('section-completed');
};
const togglePlay = async () => {
  if (!audioElement.value.paused) {
    return;
  }
  await startBannerSequence();
};
</script>
