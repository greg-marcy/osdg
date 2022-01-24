<template>
  <div
    class="absolute inset-0 flex flex-col justify-between z-10"
    :class="[
      { 'animate__animated animate__fadeIn': shouldShowControls },
      { 'animate__animated animate__fadeOut': !shouldShowControls },
    ]"
    @mousemove="onMouseMove"
    @click="togglePlay"
  >
    <div class="w-full text-lg font-caligula text-white pl-10 pt-8">
      <span>{{ title }}</span>
    </div>
    <IconPause
      v-if="isPlaying"
      class="w-24 h-24 text-white self-center cursor-pointer transition-transform transform hover:scale-125"
      :class="{ 'opacity-0': !showControls }"
    />
    <IconPlay
      v-else-if="!isPlaying"
      class="w-24 h-24 text-white self-center cursor-pointer transition-transform transform hover:scale-125"
      :class="{ 'opacity-0': !showControls }"
    />
    <div></div>
  </div>
</template>

<script setup>
import { defineProps, toRefs, ref, getCurrentInstance } from 'vue';
import IconPlay from './IconPlay.vue';
import IconPause from './IconPause.vue';

const props = defineProps({
  isPlaying: {
    type: Boolean,
    default: false,
  },
  showControls: {
    type: Boolean,
    default: true,
  },
  title: {
    type: String,
    default: '',
  },
  activated: {
    type: Boolean,
    default: false,
  },
});

const { isPlaying, showControls, activated } = toRefs(props);
const { emit } = getCurrentInstance();
const shouldShowControls = ref(true);
let timer = null;

const onMouseMove = () => {
  if (!activated.value) return;
  emit('on-cursor-show');
  shouldShowControls.value = true;
  clearTimeout(timer);
  timer = setTimeout(() => {
    emit('on-cursor-hide');
    shouldShowControls.value = false;
  }, 3000);
};
const togglePlay = () => {
  if (showControls.value) {
    emit('on-toggle-play');
  }
};
</script>
