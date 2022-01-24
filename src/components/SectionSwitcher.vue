<template>
  <div ref="page">
    <component
      :is="sectionName"
      :should-leave-section="shouldLeaveSection"
      :video="videoOption"
      :audio="audioOption"
      @section-completed="incrementSection"
    />
  </div>
</template>
<script setup>
import { ref, onMounted, markRaw, onBeforeUnmount } from 'vue';
import { useRoute } from 'vue-router';
import { Lethargy } from 'lethargy';
import LandingSection from './sections/LandingSection.vue';
import VideoSection from './sections/VideoSection.vue';
// import CoverFaciaSection from './sections/CoverFaciaSection.vue';
import BannerSection from './sections/BannerSection.vue';
// import ExcerptSection from './sections/ExcerptSection.vue';
import EBookSection from './sections/EBookSection.vue';
import { timeout, isTouchDevice } from '../helpers';
import { titles } from '../data';

const routeName = useRoute().name;
const lethargy = new Lethargy();
const page = ref(null);
const isTouch = isTouchDevice();

const sections = [
  markRaw(LandingSection),
  markRaw(VideoSection),
  // markRaw(CoverFaciaSection),
  markRaw(BannerSection),
  // markRaw(ExcerptSection),
  // markRaw(AudioBookSection),
  markRaw(EBookSection),
];
const sectionIndex = ref(0);
const sectionName = ref(sections[sectionIndex.value]);
const shouldLeaveSection = ref(false);
const videoOption = ref('');
const audioOption = ref('');
let touchstartY = 0;
let touchendY = 0;

const setOptions = (sectionIndex) => {
  if (sectionIndex === 1) {
    const activeTitle = titles.find(title => title.name === routeName);
    videoOption.value = activeTitle.videoTop;
    audioOption.value = activeTitle.bannerAudio;
  }
};
const incrementSection = async () => {
  if (sectionIndex.value < sections.length - 1) {
    shouldLeaveSection.value = true;
    await timeout(600);
    sectionIndex.value += 1;
    setOptions(sectionIndex.value);
    sectionName.value = sections[sectionIndex.value];
    shouldLeaveSection.value = false;
  }
};
const decrementSection = async () => {
  if (sectionIndex.value > 0) {
    shouldLeaveSection.value = true;
    await timeout(600);
    sectionIndex.value -= 1;
    setOptions(sectionIndex.value);
    sectionName.value = sections[sectionIndex.value];
    shouldLeaveSection.value = false;
  }
};
const scrollEventListener = async (event) => {
  event.preventDefault();
  event.stopPropagation();
  const scrollDirection = lethargy.check(event);
  if (!shouldLeaveSection.value) {
    if(scrollDirection === 1) {
      await decrementSection();
    }
    else if (scrollDirection === -1) {
      await incrementSection();
    }
  }
};
const touchStartEventListener = async (event) => {
  touchstartY = event.changedTouches[0].screenY;
};
const touchEndEventListener = async (event) => {
  touchendY = event.changedTouches[0].screenY;
  if (touchendY < touchstartY) {
    await incrementSection();
  }
  if (touchendY > touchstartY) {
    await decrementSection();
  }
}

onMounted(() => {
  if (!isTouch) {
    page.value.addEventListener('wheel', scrollEventListener, false);
  } else {
    page.value.addEventListener('touchstart', touchStartEventListener, false);
    page.value.addEventListener('touchend', touchEndEventListener, false);
  }
});
onBeforeUnmount(() => {
  if (!isTouch) {
    page.value.removeEventListener('wheel', scrollEventListener, false);
  } else {
    page.value.removeEventListener('touchstart', touchStartEventListener, false);
    page.value.removeEventListener('touchend', touchEndEventListener, false);
  }
});
</script>
