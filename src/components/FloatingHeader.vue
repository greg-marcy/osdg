<template>
  <div
    class="bg-transparent fixed top-0 left-0 z-40 w-full px-8 py-4 flex items-center justify-between transition-colors"
    :class="{ 'bg-gray-400': !isFooterVisible }"
  >
    <transition
      mode="out-in"
      enter-active-class="animate__animated animate__fadeIn animate__faster"
      leave-active-class="animate__animated animate__fadeOut animate__faster"
    >
      <component
        :is="iconName"
        id="menuIcon"
        class="cursor-pointer"
        @click="onMenuToggle"
      />
    </transition>
    <div v-show="!isFooterVisible">
      <span class="transition-colors text-black hover:text-white cursor-pointer text-lg tracking-widest font-caligula">
        Agents • Publishers • Producers • Investors • Professional Inquiry
      </span>
    </div>
    <img
      v-show="!isFooterVisible"
      src="../assets/img/emblem.webp"
      class="w-6 h-6 cursor-pointer"
    >
  </div>
</template>

<script setup>
import { getCurrentInstance, ref, toRefs, defineProps, watch, computed, markRaw } from 'vue';
import IconMenu from './IconMenu.vue';
import IconClose from './IconClose.vue';

const props = defineProps({
  shouldShowNav: {
    type: Boolean,
    default: false,
  },
  isFooterVisible: {
    type: Boolean,
    default: false,
  },
});
const { shouldShowNav, isFooterVisible } = toRefs(props);
const { emit } = getCurrentInstance();
const isMenuOpened = ref(false);

watch(shouldShowNav, (shouldShowNavValue) => {
  isMenuOpened.value = shouldShowNavValue;
});
const iconName = computed(() => {
  return !isMenuOpened.value
    ? markRaw(IconMenu)
    : markRaw(IconClose);
});

const onMenuToggle = () => {
  isMenuOpened.value = !isMenuOpened.value;
  emit('on-menu-toggle', isMenuOpened.value);
};
</script>
