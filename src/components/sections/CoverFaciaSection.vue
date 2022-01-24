<template>
  <VSection>
    <div
      class="w-full h-screen flex justify-center items-center bg-blue-50 font-plantin"
      :class="[
        { 'animate__animated animate__fadeIn animate__slow': true },
        { 'animate__animated animate__fadeOut animate__faster': shouldLeaveSection }
      ]"
    >
      <BookCover
        class="animate__animated animate__slideInDown"
        :class="{ 'animate__animated animate__slideOutUp animate__faster': shouldLeaveSection }"
      />
      <FaciaPage
        class="ml-2 animate__animated animate__slideInUp"
        :class="{ 'animate__animated animate__slideOutDown animate__faster': shouldLeaveSection }"
      />
    </div>
  </VSection>
</template>

<script setup>
import { defineProps, toRefs } from 'vue';
import VSection from '../VSection.vue';
import BookCover from '../BookCover.vue';
import FaciaPage from '../FaciaPage.vue';

const props = defineProps({
  shouldLeaveSection: {
    type: Boolean,
    default: false,
  },
});

const { shouldLeaveSection } = toRefs(props);
</script>
