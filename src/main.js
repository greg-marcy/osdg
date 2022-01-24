import { createApp } from 'vue';
import router from './router';
import App from './App.vue';
import "animate.css";
import './styles/index.scss';
import FontFaceObserver from 'fontfaceobserver';
import VueSmoothScroll from 'vue3-smooth-scroll';

const fonts = [
  new FontFaceObserver('Plantin MT Pro Light'),
  new FontFaceObserver('Plantin MT Pro Regular'),
  new FontFaceObserver('Plantin MT Pro Bold'),
  new FontFaceObserver('Plantin MT Pro Italic'),
  new FontFaceObserver('DiMurphic'),
];

const app = createApp(App);
app.use(router);
app.use(VueSmoothScroll);

Promise.all(fonts).then(() => {
  app.mount('#app');
});
