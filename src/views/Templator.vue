<template>
  <div class="relative">
    <FloatingHeader
      :should-show-nav="shouldShowNav"
      :is-footer-visible="isFooterVisible"
      @on-menu-toggle="onMenuToggle"
    />
    <Sidebar
      :class="[
        { 'animate__animated animate__fadeInLeft animate__fast': shouldShowNav },
        { 'animate__animated animate__fadeOutLeft animate__fast': !shouldShowNav },
      ]"
      @on-click-outside="onSidebarClose"
    />
    <div ref="preLandingSection" />
    <LandingSection @on-footer-visibility-change="onFooterVisibilityChange" />
    <div ref="preBannerSection" />
    <BannerSection
      :audio="audioBannerOption"
      :title-data="activeTitle"
    />
    <div ref="preIntroSection" />
    <!-- <IntroSection /> -->
    <div ref="preEBookSection" />
    <EBookSection :pdf="pdfOption" />
    <div ref="preAudioBookSection" />
    <AudioBookSection :audio="audioBookOption" />
    <div ref="prePPPSection" />
    <!-- <PeoplePlacesProjectsSection /> -->
    <div ref="preVideoSection" />
    <VideoSection
      :video="videoOption"
      :title-data="activeTitle"
    />
  </div>
</template>

<script setup>
import { inject, ref, onMounted } from 'vue';
import { useRoute } from 'vue-router';
import LandingSection from '../components/sections/LandingSection.vue';
import VideoSection from '../components/sections/VideoSection.vue';
import BannerSection from '../components/sections/BannerSection.vue';
import EBookSection from '../components/sections/EBookSection.vue';
import AudioBookSection from '../components/sections/AudioBookSection.vue';
import FloatingHeader from '../components/FloatingHeader.vue';
import Sidebar from '../components/Sidebar.vue';
import { titles } from '../data';

const routeName = useRoute().name;
const activeTitle = ref(null);
const videoOption = ref('');
const audioBannerOption = ref('');
const pdfOption = ref('');
const audioBookOption = ref('');
const shouldShowNav = ref(false);
const isFooterVisible = ref(true);

const preLandingSection = ref(null);
const preBannerSection = ref(null);

const smoothScroll = inject('smoothScroll');

onMounted(() => {
  activeTitle.value = titles.find(title => title.name === routeName);
  videoOption.value = activeTitle.value.videoTop;
  audioBannerOption.value = activeTitle.value.bannerAudio;
  pdfOption.value = activeTitle.value.pdf;
  audioBookOption.value = activeTitle.value.audioBook;
  smoothScroll({
    scrollTo: preLandingSection.value,
  });
});

const onMenuToggle = (isOpened) => {
  shouldShowNav.value = isOpened;
};
const onSidebarClose = () => {
  shouldShowNav.value = false;
};
const onFooterVisibilityChange = (value) => {
  isFooterVisible.value = value;
};
</script>
