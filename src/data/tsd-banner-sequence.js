import prefetchImages from 'prefetch-image';
import img1_1 from '../assets/img/tsd-banner/1-1.webp';
import img1_2 from '../assets/img/tsd-banner/1-2.webp';
import img2_1 from '../assets/img/tsd-banner/2-1.webp';
import img3_1 from '../assets/img/tsd-banner/3-1.webp';
import img4_1 from '../assets/img/tsd-banner/4-1.webp';
import img5_1 from '../assets/img/tsd-banner/5-1.webp';
import img6_1 from '../assets/img/tsd-banner/6-1.webp';
import img7_1 from '../assets/img/tsd-banner/7-1.webp';
import img8_1 from '../assets/img/tsd-banner/8-1.webp';
import img9_1 from '../assets/img/tsd-banner/9-1.webp';
import img9_2 from '../assets/img/tsd-banner/9-2.webp';
import img10_1 from '../assets/img/tsd-banner/10-1.webp';
import img11_1 from '../assets/img/tsd-banner/11-1.webp';
import img12_1 from '../assets/img/tsd-banner/12-1.webp';
import img13_1 from '../assets/img/tsd-banner/13-1.webp';
import img14_1 from '../assets/img/tsd-banner/14-1.webp';
import img15_1 from '../assets/img/tsd-banner/15-1.webp';

const TEMPLATE1 = '<div class="flex flex-col items-center text-4xl font-caligula italic"><span>The heart wants what the heart wants,</span><br><br><span>Even if its garden of love is strewn with dead bodies.</span></div>';
const TEMPLATE2 = '<span class="text-8xl font-caligula">THE SOFIA DIARIES</span>';

const images = [
  img1_1,
  img1_2,
  img2_1,
  img3_1,
  img4_1,
  img5_1,
  img6_1,
  img7_1,
  img8_1,
  img12_1,
  img13_1,
  img14_1,
  img15_1,
  img9_1,
  img9_2,
  img10_1,
  img11_1,
];

export default async () => {
  const imgs = await prefetchImages(images);
  return [
    [{ img: imgs[0], type: 'img' }, { img: imgs[1], type: 'img' }],
    [{
      text: TEMPLATE1,
      type: 'text',
    }],
    [{ img: imgs[2], type: 'img' }],
    [{
      text: TEMPLATE2,
      type: 'text',
    }],
    [{ img: imgs[3], type: 'img' }],
    [{ img: imgs[4], type: 'img' }],
    [{ img: imgs[5], type: 'img' }],
    [{ img: imgs[6], type: 'img' }],
    [{
      text: TEMPLATE1,
      type: 'text',
    }],
    [{ img: imgs[7], type: 'img' }],
    [{ img: imgs[8], type: 'img' }],
    [{ img: imgs[9], type: 'img' }],
    [{ img: imgs[10], type: 'img' }],
    [{ img: imgs[11], type: 'img' }],
    [{ img: imgs[12], type: 'img' }],
    [{ img: imgs[13], type: 'img' }],
    [{ img: imgs[14], type: 'img' }],
    [{ img: imgs[15], type: 'img' }],
    [{ img: imgs[0], type: 'img' }, { img: imgs[1], type: 'img' }],
    [{ img: imgs[2], type: 'img' }],
    [{ img: imgs[16], type: 'img' }],
    [{
      text: TEMPLATE1,
      type: 'text',
    }],
    [{
      text: TEMPLATE2,
      type: 'text',
    }],
  ];
};
