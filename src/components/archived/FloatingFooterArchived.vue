<template>
  <div
    ref="footer"
    class="text-xl tracking-widest font-plantin-light bg-gray-400 text-white w-full py-3 transition duration-300"
    :class="{ 'fixed bottom-0 ': isFooterActive }"
  >
    <div
      v-if="!isFooterActive"
      class="flex justify-center items-center transition-colors text-black hover:text-white cursor-pointer"
      @click="onFooterToggle(true)"
    >
      <span>Agents • Publishers • Producers • Investors • Professional Inquiry</span>
    </div>
    <IconClose
      class="text-2xl absolute top-4 right-8 cursor-pointer transition-colors hover:text-red-500"
      @click="onFooterToggle(false)"
    />
    <div
      v-if="isFooterActive"
      class="text-base px-16 py-7 flex flex-col items-center"
    >
      <div>
        Thank-you for your interest in Odyssey Studio da Gama and our ANTHOLOGICA portfolio. We anticipate to launch our complete ten title portfolio works website November 1, 2021. In the meantime, if you are an Agent, Publisher, Producer, or Investor interested in discussing representation, publishing, producing, or investing in OSDG’s portfolio works, we welcome your professional interest. Text or email us including any website link or other media identifying your company and professional interest. Reciprocally, we will forward to you by return email in depth excerpts, complete manuscripts, and / or any other media content you might have interest in. We sincerely thank you. ~
      </div>
      <a
        href="tel:+306996227536"
        class="mt-10 transition-colors hover:text-red-500 cursor-pointer"
      >
        WhatsApp +30 699 622 75 36
      </a>
      <a
        href="mailto:professionalinquiry@odysseystudiodagama.com"
        class="mt-2 transition-colors hover:text-red-500 cursor-pointer"
      >
        professionalinquiry@odysseystudiodagama.com
      </a>
    </div>
  </div>
</template>

<script setup>
import { ref, getCurrentInstance, defineProps, toRefs } from 'vue';
import IconClose from '../IconClose.vue';
import { onClickOutside } from '@vueuse/core';

const props = defineProps({
  isFooterActive: {
    type: Boolean,
    default: false,
  }
});

const { isFooterActive } = toRefs(props);

const { emit } = getCurrentInstance();
const footer = ref(null);

onClickOutside(footer, () => onFooterToggle(false));
const onFooterToggle = (value) => {
  emit('on-footer-toggle', value);
};
</script>
