<template>
  <div
    class="bg-gray-600 py-3 xl:text-lg md:text-sm px-10"
    :class="[
      { 'animate__animated animate__fadeIn': isStarted },
      { 'animate__animated animate__fadeOut': shouldLeaveSection },
    ]"
  >
    <div
      class="flex justify-center"
      :class="[
        { 'animate__animated animate__fadeInRight': isStarted },
        { 'animate__animated animate__fadeOutLeft animate__faster': shouldLeaveSection },
      ]"
    >
      <div
        v-for="(title, index) in firstLineTitles"
        :key="index"
        class="tracking-widest text-white"
        :class="{ 'xl:ml-4 md:ml-2': index > 0 }"
      >
        <span
          v-if="index > 0"
          class="xl:mr-2 select-none"
        >
          •
        </span>
        <router-link
          :to="{ name: title.name }"
        >
          <span class="transition-colors hover:text-red-500 font-plantin-light">{{ title.text }}</span>
        </router-link>
      </div>
    </div>
    <div
      class="flex justify-center"
      :class="[
        { 'animate__animated animate__fadeInRight': isStarted },
        { 'animate__animated animate__fadeOutLeft animate__faster': shouldLeaveSection },
      ]"
    >
      <div
        v-for="(title, index) in secondLineTitles"
        :key="index"
        class="tracking-widest text-white"
        :class="{ 'xl:ml-4 md:ml-2': index > 0 }"
      >
        <span
          v-if="index > 0"
          class="xl:mr-2 select-none"
        >
          •
        </span>
        <router-link
          :to="{ name: title.name }"
        >
          <span class="transition-colors hover:text-red-500 font-plantin-light">{{ title.text }}</span>
        </router-link>
      </div>
    </div>
  </div>
</template>

<script>
import { defineComponent } from 'vue';
import { titles } from '../data/index';

export default defineComponent({
  props: {
    isStarted: {
      type: Boolean,
      default: false,
    },
    shouldLeaveSection: {
      type: Boolean,
      default: false,
    }
  },
  setup() {
    const firstLineTitles = titles.slice(1, 6);
    const secondLineTitles = titles.slice(6, titles.length);
    return {
      titles,
      firstLineTitles,
      secondLineTitles,
    };
  },
});
</script>
