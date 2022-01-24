<template>
  <VSection
    class="w-full relative"
  >
    <div class="h-screen w-full flex flex-col justify-between items-center bg-white">
      <div class="flex flex-col items-center w-full">
        <router-link
          key="header-studio"
          class="text-2xl tracking-widest font-caligula mt-8 transition-colors hover:text-red-500 z-50"
          :class="{ 'animate__animated animate__fadeIn animate__slow': isStarted }"
          :to="{ name: 'anthologica' }"
        >
          ODYSSEY STUDIO da GAMA
        </router-link>
      </div>
      <div
        class="flex flex-col items-center transition-transform"
        :class="{ 'animate__animated animate__fadeIn animate__slow': isStarted }"
      >
        <h1
          class="text-5xl tracking-widest font-caligula"
        >
          {{ titleName }}
        </h1>
        <img
          class="h-36 mt-16 ml-6"
          :class="[
            { 'opacity-0': isStarted },
            { 'animate__animated animate__fadeIn animate__slow': isLogoLoaded }
          ]"
          src="../../assets/img/emblem.webp"
          @load="onLogoLoad"
        >
        <h6 class="text-xl tracking-widest font-caligula italic mt-10">
          {{ subtitle }}
        </h6>
        <div class="h-0.5 w-full mt-8 bg-gradient-to-r from-transparent via-gray-600 to-transparent" />
        <h4 class="text-2xl tracking-widest font-caligula mt-8">
          Greg Marcy da Gama
        </h4>
        <h4 class="text-2xl tracking-widest font-caligula mt-6">
          {{ titleVariants }}
        </h4>
        <h4
          v-if="titleYear"
          class="text-2xl tracking-widest font-caligula mt-6"
        >
          {{ titleYear }}
        </h4>
        <h6 class="text-xl tracking-widest mt-8">
          <span class="font-plantin-light">神道</span>
          <span class="ml-2 font-caligula">OM</span>
        </h6>
      </div>
      <FloatingFooter
        :class="{ 'animate__animated animate__fadeIn animate__slow': isStarted }"
        @on-footer-visibility-change="onFooterVisibilityChange"
      />
    </div>
  </VSection>
</template>

<script setup>
import { ref, computed, onMounted, getCurrentInstance } from 'vue';
import { useRoute } from 'vue-router';
import VSection from '../VSection.vue';
import FloatingFooter from '../FloatingFooter.vue';
import { titles } from '../../data/index';
import { timeout } from '../../helpers';

const isStarted = ref(true);
const isLogoLoaded = ref(false);

onMounted(async () => {
  isStarted.value = true;
  await timeout(2000);
  isStarted.value = false;
  isLogoLoaded.value = false;
});

const { emit } = getCurrentInstance();
const route = useRoute();
const titleName = computed(() => {
  return titles.find(title => title.name === route.name).text;
});
const subtitle = computed(() => {
  return titles.find(title => title.name === route.name).subtitle;
});
const titleVariants = computed(() => {
  return titles.find(title => title.name === route.name).variants;
});
const titleYear = computed(() => {
  const title = titles.find(title => title.name === route.name);
  if (title.year) {
    return title.year;
  }
  return null;
});

const onLogoLoad = () => {
  isLogoLoaded.value = true;
};
const onFooterVisibilityChange = (value) => {
  emit('on-footer-visibility-change', value);
};
</script>
