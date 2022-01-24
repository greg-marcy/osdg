<template>
  <div
    ref="sidebar"
    class="fixed top-0 left-0 h-screen bg-gray-400 flex flex-col justify-center items-start pl-4 pr-16 z-30"
  >
    <router-link
      v-for="(title, index) in titles"
      :key="index"
      class="origin-left tracking-widest text-black whitespace-nowrap transition-transform transition-opacity transform hover:scale-125 transition-color hover:text-white mb-1"
      :class="{ 'scale-125 text-white' : isCurrentTitle(title) }"
      :to="{ name: title.name }"
      @mouseover="titleHovered = title"
      @mouseleave="titleHovered = null"
    >
      <span class="text-sm font-plantin-light">
        <span :class="{ 'opacity-0' : !isCurrentTitle(title) && !isTitleHovered(title) }">➨</span>
        <span class="ml-4">{{ title.text }}</span>
      </span>
    </router-link>
  </div>
</template>

<script setup>
import { ref, getCurrentInstance } from 'vue';
import { useRoute } from 'vue-router';
import { onClickOutside } from '@vueuse/core'
import { titles } from '../data/index';

const route = useRoute();
const { emit } = getCurrentInstance();
const titleHovered = ref(null);
const sidebar = ref(null);

const isCurrentTitle = (title) => {
  return route.name === title.name;
};
const isTitleHovered = (title) => {
  if (titleHovered.value === null) return false
  return titleHovered.value.name === title.name;
};
onClickOutside(sidebar, (event) => {
  if (event.target.id !== 'menuIcon') {
    emit('on-click-outside');
  }
});
</script>
