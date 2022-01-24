<template>
  <VSection>
    <div
      class="w-full h-screen flex justify-center items-center bg-blue-50"
      :class="[
        { 'animate__animated animate__fadeIn animate__slow': true },
        { 'animate__animated animate__fadeOut animate__faster': shouldLeaveSection }
      ]"
    >
      Test excerpt section
    </div>
  </VSection>
</template>
<script setup>
import { defineProps, toRefs } from 'vue';
import VSection from '../VSection.vue';

const props = defineProps({
  shouldLeaveSection: {
    type: Boolean,
    default: false,
  },
});

const { shouldLeaveSection } = toRefs(props);
</script>
