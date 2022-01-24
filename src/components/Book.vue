<template>
  <div class="vue-booklet relative">
    <div
      class="absolute left-0 h-full w-2/4 z-20 bg-red-300 bg-opacity-25"
      @mousedown="prevPage"
    />
    <div
      class="absolute right-0 h-full w-2/4 z-20 bg-blue-300 bg-opacity-25"
      @mousedown="nextPage"
    />
    <div
      ref="book"
      class="book pointer-events-none"
      :class="{ 'closed': isBookClosed }"
    >
      <div
        ref="pages"
        class="relative h-full"
      >
        <slot />
      </div>
    </div>
  </div>
</template>
<script setup>
import { defineProps, toRefs, ref, onMounted } from 'vue';

const props = defineProps({
  pageTransitionTime: {
    type: Number,
    default: 0.8,
  },
});
const { pageTransitionTime } = toRefs(props);

const opened = ref(false);
const clickable = ref(true);
const isBookClosed = ref(true);
// Template refs
const book = ref(null);
const pages = ref(null);

onMounted(() => {
  initPage();
  mobileInit();
});

const mobileInit = () => {
  //Detect screen size and make all page visible on mobile on start
  if (window.innerWidth < 768) {
    const pageList = document.getElementsByClassName('page');
    for (let i = 0; i < pageList.length; i++) {
      const page = pageList[i];
      page.style.visibility = 'visible';
    }
  }
  //Detect screen size and make all page visible on mobile on resize
  // window.onresize = () => {
  //   if (window.innerWidth < 768) {
  //     const pageList = document.getElementsByClassName('page');
  //     for (let i = 0; i < pageList.length; i++) {
  //       const page = pageList[i];
  //       page.style.visibility = 'visible';
  //     }
  //   } else {
  //     // selectPage();
  //   }
  // }
};
const initPage = () => {
  const pageList = document.getElementsByClassName('page');
  const coverPage = pageList[0];
  const backPage = pageList[pageList.length - 1];
  coverPage.classList.add('coverPage');
  coverPage.classList.add('currentPage');
  for (let i = 0; i < pageList.length; i++) {
    const pageIndex = i + 1;
    const page = pageList[i];
    page.style.zIndex = '-1';
    page.style.visibility = 'hidden';
    page.style.transition = `transform ${pageTransitionTime.value}s`;
    page.dataset.index = pageIndex;
    if (pageIndex % 2 === 0) {
      page.classList.add('even');
    } else {
      page.classList.add('odd');
    }
  }
  coverPage.style.visibility = 'visible';
  coverPage.style.zIndex = '3';
  if (coverPage.nextElementSibling) {
    coverPage.nextElementSibling.style.visibility = 'visible';
    coverPage.nextElementSibling.style.zIndex = '2';
  }
  backPage.classList.add('backPage');
  nextPage();
};
const nextPage = () => {
  if (clickable.value) {
    const currentPage = document.getElementsByClassName('currentPage')[0];
    const nextPage = currentPage.nextElementSibling;
    const timeOut = pageTransitionTime.value * 4 * 100;
    clickable.value = false;
    // If current page is a cover page and a book is not opened
    if (currentPage.classList.contains('coverPage') && !opened.value) {
      onOpenedHandler();
    }
    // If current page is a backface page and a book is not opened
    if (currentPage.classList.contains('backPage') && opened.value) {
      onClosedHandler('back');
    }
    currentPage.classList.add('fliped');
    onFlipHandler('next');
    if (nextPage) {
      nextPage.style.visibility = 'visible';
    }
    setTimeout(() => {
      // If this page have next page, set it to current page
      if (nextPage) {
        nextPage.style.zIndex = '3';
        currentPage.style.zIndex = '1';
        currentPage.classList.remove('currentPage');
        nextPage.classList.add('currentPage');
      }
      clickable.value = true;
    }, timeOut);
  }
};
const prevPage = () => {
  if (clickable.value) {
    const currentPage = document.getElementsByClassName('currentPage')[0];
    const prevPage = currentPage.previousElementSibling;
    const timeOut = pageTransitionTime.value * 4 * 100;
    clickable.value = false;
    onFlipHandler('back');
    // If user click on cover and book not opened
    if (prevPage) {
      // If last page fliped, undo flip only
      if (currentPage.classList.contains('backPage') && currentPage.classList.contains('fliped')) {
        currentPage.classList.remove('fliped');
      } else {
        currentPage.style.zIndex = '1';
        currentPage.classList.remove('currentPage');
        prevPage.style.zIndex = '3';
        prevPage.classList.remove('fliped');
        prevPage.classList.add('currentPage');
      }
      if (prevPage.previousElementSibling) {
        prevPage.previousElementSibling.style.visibility = 'visible';
      }
      //If current page is last page , book not opened and it is not filped, open the book
      if (currentPage.classList.contains('backPage') && !currentPage.classList.contains('fliped') && !opened.value) {
        onOpenedHandler();
      }
      //If previous page is first page and book not opened, close the book
      if (prevPage.classList.contains('coverPage') && !prevPage.classList.contains('fliped') && opened.value) {
        onClosedHandler('front');
      }
    } else {
      if (currentPage.classList.contains('coverPage') && currentPage.classList.contains('fliped')) {
        onClosedHandler('front');
        currentPage.classList.remove('fliped');
      }
    }
    setTimeout(() => {
      clickable.value = true;
    }, timeOut);
  }
};
const getAllPrevPage = (currentPage) => {
  const pages = [];
  let prevPage = currentPage.previousElementSibling;
  while (prevPage) {
    pages.push(prevPage);
    prevPage = prevPage.previousElementSibling;
  }
  return pages;
};
const getAllNextPages = (currentPage) => {
  const pages = [];
  let nextPage = currentPage.nextElementSibling;
  while (nextPage) {
    pages.push(nextPage);
    nextPage = nextPage.nextElementSibling;
  }
  return pages;
};
// Event handlers
const onOpenedHandler = () => {
  opened.value = true;
  book.value.classList.add('opened');
  isBookClosed.value = false;
  book.value.classList.remove('closed-back');
};
const onClosedHandler = (position) => {
  opened.value = false;
  book.value.classList.remove('opened');
  if (position === 'back') {
    isBookClosed.value = false;
    book.value.classList.add('closed-back');
  } else {
    book.value.classList.remove('closed-back');
    isBookClosed.value = true;
  }
};
const onFlipHandler = (direction) => {
  const currentPage = document.getElementsByClassName('currentPage')[0];
  const nextPages = getAllNextPages(currentPage);
  const prevPages = getAllPrevPage(currentPage);
  if (direction === 'prev') {
    // Don't show previous page
    prevPages.forEach((page) => {
      const prevPage = page.previousElementSibling;
      if (prevPage) {
        prevPage.style.visibility = 'hidden';
        if (prevPage.classList.contains('backPage')) {
          prevPage.style.zIndex = '-3';
        } else {
          prevPage.style.zIndex = '-1';
        }
      }
    });
  } else {
    prevPages.forEach((page, index) => {
      const prevPage = page.previousElementSibling;
      if (prevPage) {
        // Don't hide 2 previous pages
        if (index !== 0) {
          prevPage.style.visibility = 'hidden';
        }
        if (prevPage.classList.contains('backPage')) {
          prevPage.style.zIndex = '-3';
        } else {
          prevPage.style.zIndex = '-1';
        }
      }
    });
  }
  nextPages.forEach((page, index) => {
    // Don't hide next page
    page.style.zIndex = '-1';
    if (index !== 0) {
      page.style.visibility = 'hidden';
      if (page.classList.contains('backPage')) {
        page.style.zIndex = '-3';
      }
    }
  });
};
</script>
