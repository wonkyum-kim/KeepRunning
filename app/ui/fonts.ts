import {
  Inter,
  Lusitana,
  Black_Han_Sans,
  Gothic_A1,
  Rowdies,
  Lato,
} from 'next/font/google';

export const inter = Inter({ subsets: ['latin'] });

export const lusitana = Lusitana({
  weight: ['400', '700'],
  subsets: ['latin'],
});

export const blackHansSans = Black_Han_Sans({
  weight: '400',
  preload: false,
});

export const gothicA1 = Gothic_A1({
  weight: '400',
  preload: false,
});

export const rowdies = Rowdies({
  weight: '400',
  preload: false,
});

export const lato = Lato({
  weight: '900',
  style: 'italic',
  preload: false,
});
