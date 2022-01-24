<template>
  <div
    class="flex w-full h-full justify-center items-end relative mb-4"
    :class="[
      { 'animate__animated animate__fadeInLeft animate__faster' : isPrevAnimRunning },
      { 'animate__animated animate__fadeInRight animate__faster' : isNextAnimRunning }
    ]"
  >
    <!-- <div class="abstract left-0 top-1/2 h-full flex flex-col items-center justify-center cursor-pointer bg-gray-400">
      <IconLeft class="w-12 h-12 text-white" />
    </div> -->
    <Loader
      v-if="!loaded"
    />
    <canvas
      v-show="loaded"
      id="leftPage"
      ref="leftPage"
      class="h-full filter drop-shadow origin-right"
      style="backface-visibility: hidden;"
      @click="prevPage"
    />
    <canvas
      v-show="loaded"
      id="rightPage"
      ref="rightPage"
      class="h-full filter drop-shadow origin-left"
      style="backface-visibility: hidden;"
      @click="nextPage"
    />
    <!-- <div class="abstract right-0 h-screen flex flex-col items-center justify-center cursor-pointer">
      <IconRight class="w-12 h-12 text-white" />
    </div> -->
  </div>
</template>

<script setup>
import { defineProps, toRefs, ref, onMounted, nextTick, watch } from 'vue';
import * as PdfJs from 'pdfjs-dist/build/pdf.js';
import PdfJsWorker from 'pdfjs-dist/build/pdf.worker.entry.js';
import IconLeft from './IconLeft.vue';
import IconRight from './IconRight.vue';
import Loader from './Loader.vue';
// import anime from 'animejs/lib/anime.es.js';
import { timeout } from '../helpers';

const props = defineProps({
  source: {
    type: String,
    default: null,
  },
});
const { source } = toRefs(props);
const loaded = ref(false);
const pdfDoc = ref('');
const pdfPages = ref(0);
const pdfScale = ref(1.0);
const leftPage = ref(null);
const rightPage = ref(null);
const currentPage = ref(0);
const isSpreadRendering = ref(true);
const isNextAnimRunning = ref(false);
const isPrevAnimRunning = ref(false);

onMounted(() => {
});

watch(currentPage, async (currentPage) => {
  if (currentPage > 0 && !isSpreadRendering.value) {
    renderBookSpread();
    await timeout(500);
    isNextAnimRunning.value = false;
    isPrevAnimRunning.value = false;
  }
});
watch(source, async (sourceValue) => {
  if (sourceValue !== '') {
    loadFile(sourceValue);
  }
});

const loadFile = async (url) => {
  PdfJs.GlobalWorkerOptions.workerSrc = PdfJsWorker;
  const loadingTask = PdfJs.getDocument(url);
  const pdf = await loadingTask.promise;
  pdfDoc.value = pdf;
  pdfPages.value = pdfDoc.value.numPages;
  if (pdfPages.value > 0) {
    currentPage.value = 1;
  }
  nextTick(() => {
    loaded.value = true;
    renderBookSpread();
  });
};
const renderPage = async (canvasPage, pageNumber, pagePosition) => {
  const page = await pdfDoc.value.getPage(pageNumber);
  const ctx = canvasPage.getContext('2d');
  const dpr = window.devicePixelRatio || 1;
  const bsr = ctx.webkitBackingStorePixelRatio
    || ctx.mozBackingStorePixelRatio
    || ctx.msBackingStorePixelRatio
    || ctx.oBackingStorePixelRatio
    || ctx.backingStorePixelRatio
    || 1;
  const ratio = dpr / bsr;
  const viewport = page.getViewport({ scale: pdfScale.value });
  canvasPage.width = viewport.width * ratio;
  canvasPage.height = viewport.height * ratio;
  canvasPage.style.width = `${viewport.width}px`;
  const error = (ratio - 1) * 128;
  canvasPage.style.height = `${viewport.height - error}px`;
  ctx.setTransform(ratio, 0, 0, ratio, 0, 0);
  const renderContext = {
    canvasContext: ctx,
    viewport: viewport,
  };
  await page.render(renderContext).promise;
  // gradient for middle of the spread
  const x0 = pagePosition === 'left' ? canvasPage.width / ratio : 0;
  const x1 = pagePosition === 'left' ? 0 : canvasPage.width / ratio;
  const gradient = ctx.createLinearGradient(x0, 0, x1, 0);
  gradient.addColorStop(0, 'rgba(217,217,217,0.75)');
  gradient.addColorStop(0.03, 'rgba(249,249,249,0.75)');
  gradient.addColorStop(0.08, 'rgba(255,255,255,0.05)');
  gradient.addColorStop(1, 'rgba(255,255,255,0)');
  ctx.fillStyle = gradient;
  ctx.fillRect(0, 0, canvasPage.width, canvasPage.height);
};
const renderBookSpread = async () => {
  isSpreadRendering.value = true;
  const nextPage = currentPage.value + 1 <= pdfPages.value
    ? currentPage.value + 1
    : null;
  await renderPage(leftPage.value, currentPage.value, 'left');
  if (nextPage) {
    await renderPage(rightPage.value, nextPage, 'right');
  }
  isSpreadRendering.value = false;
};
const prevPage = () => {
  if (currentPage.value > 2) {
    isPrevAnimRunning.value = true;
    currentPage.value -= 2;
  }
};
const nextPage = () => {
  if (currentPage.value + 1 < pdfPages.value) {
    isNextAnimRunning.value = true;
    currentPage.value += 2;
  }
};
</script>
