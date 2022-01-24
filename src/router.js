import { createRouter, createWebHistory } from 'vue-router';
import AnthologicaPage from './views/AnthologicaPage.vue';
import TheSofiaDiariesPage from './views/TheSofiaDiariesPage.vue';
import ThePragueDiariesPage from './views/ThePragueDiariesPage.vue';
import TheTokyoDiariesPage from './views/TheTokyoDiariesPage.vue';
import TalesOfOdyssiaPage from './views/TalesOfOdyssiaPage.vue';
import OptimusMaximusPage from './views/OptimusMaximusPage.vue';
import DiaryOfAYoungFrenchChefPage from './views/DiaryOfAYoungFrenchChefPage.vue';
import MarcellaPage from './views/MarcellaPage.vue';
import ShangriLaNationPage from './views/ShangriLaNationPage.vue';
import ParisToIstanbulPage from './views/ParisToIstanbulPage.vue';
import ElSenorPage from './views/ElSenorPage.vue';
import APPIPage from './views/APPIPage.vue';

// const redirect = { name: 'the-sofia-diaries' };
const routes = [
  { path: '/', name: 'anthologica', component: AnthologicaPage },
  { path: '/the-sofia-diaries', name: 'the-sofia-diaries', component: TheSofiaDiariesPage },
  { path: '/the-prague-diaries', name: 'the-prague-diaries', component: ThePragueDiariesPage },
  { path: '/the-tokyo-diaries', name: 'the-tokyo-diaries', component: TheTokyoDiariesPage },
  { path: '/tales-of-odyssia', name: 'tales-of-odyssia', component: TalesOfOdyssiaPage },
  { path: '/optimus-maximus', name: 'optimus-maximus', component: OptimusMaximusPage },
  { path: '/diary-of-a-young-french-chef', name: 'diary-of-a-young-french-chef', component: DiaryOfAYoungFrenchChefPage },
  { path: '/marcella', name: 'marcella', component: MarcellaPage },
  { path: '/shangri-la-nation', name: 'shangri-la-nation', component: ShangriLaNationPage },
  { path: '/paris-to-istanbul', name: 'paris-to-istanbul', component: ParisToIstanbulPage },
  { path: '/el-senor', name: 'el-senor', component: ElSenorPage },
  { path: '/appi', name: 'appi', component: APPIPage },
];

export default createRouter({
  history: createWebHistory(),
  routes,
});