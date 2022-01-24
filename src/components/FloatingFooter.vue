<template>
  <div
    ref="footer"
    class="text-lg tracking-widest font-caligula bg-gray-400 text-white w-full py-3 transition duration-300"
  >
    <div
      class="flex justify-center items-center transition-colors text-black hover:text-white cursor-pointer"
    >
      <span>Agents • Publishers • Producers • Investors • Professional Inquiry</span>
    </div>
  </div>
</template>

<script setup>
import { ref, watch, getCurrentInstance } from 'vue';
import { useElementVisibility } from '@vueuse/core'

const { emit } = getCurrentInstance();
const footer = ref(null);
const targetIsVisible = useElementVisibility(footer);

watch(targetIsVisible, (targetIsVisibleValue) => {
  emit('on-footer-visibility-change', targetIsVisibleValue);
});
</script>
