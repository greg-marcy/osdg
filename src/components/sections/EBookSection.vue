<template>
  <VSection class="bg-gray-300">
    <div
      class="w-full h-screen flex justify-center items-center"
      :class="[
        { 'animate__animated animate__fadeIn animate__slow': true },
        { 'animate__animated animate__fadeOut animate__faster': shouldLeaveSection }
      ]"
    >
      <PdfViewer :source="pdf" />
    </div>
  </VSection>
</template>

<script setup>
import { defineProps, toRefs } from 'vue';
import VSection from '../VSection.vue';
import PdfViewer from '../PdfViewer.vue';

const props = defineProps({
  shouldLeaveSection: {
    type: Boolean,
    default: false,
  },
  pdf: {
    type: String,
    default: null,
  },
});
const { shouldLeaveSection, pdf } = toRefs(props);
</script>
