import { css } from 'styled-components';

import JosefinSansLightWoff from '@fonts/JosefinSans/JosefinSans-Light.woff';
import JosefinSansLightWoff2 from '@fonts/JosefinSans/JosefinSans-Light.woff2';
import JosefinSansRegularWoff from '@fonts/JosefinSans/JosefinSans-Regular.woff';
import JosefinSansRegularWoff2 from '@fonts/JosefinSans/JosefinSans-Regular.woff2';
import JosefinSansSemiboldWoff from '@fonts/JosefinSans/JosefinSans-SemiBold.woff';
import JosefinSansSemiboldWoff2 from '@fonts/JosefinSans/JosefinSans-SemiBold.woff2';

import LatoRegularWoff from '@fonts/Lato/Lato-Regular.woff';
import LatoRegularWoff2 from '@fonts/Lato/Lato-Regular.woff2';
import LatoSemiboldWoff from '@fonts/Lato/Lato-Semibold.woff';
import LatoSemiboldWoff2 from '@fonts/Lato/Lato-Semibold.woff2';

import SilkaLightWoff from '@fonts/Silka/silka-light-webfont.woff';
import SilkaLightWoff2 from '@fonts/Silka/silka-light-webfont.woff2';
import SilkaRegularWoff from '@fonts/Silka/silka-regular-webfont.woff';
import SilkaRegularWoff2 from '@fonts/Silka/silka-regular-webfont.woff2';
import SilkaMediumWoff from '@fonts/Silka/silka-medium-webfont.woff';
import SilkaMediumWoff2 from '@fonts/Silka/silka-medium-webfont.woff2';

const josefinsansNormalWeights = {
  300: [JosefinSansLightWoff, JosefinSansLightWoff2],
  400: [JosefinSansRegularWoff, JosefinSansRegularWoff2],
  600: [JosefinSansSemiboldWoff, JosefinSansSemiboldWoff2],
};

const latoNormalWeights = {
  400: [LatoRegularWoff, LatoRegularWoff2],
  600: [LatoSemiboldWoff, LatoSemiboldWoff2],
};

const silkaNormalWeights = {
  300: [SilkaLightWoff, SilkaLightWoff2],
  400: [SilkaRegularWoff, SilkaRegularWoff2],
  500: [SilkaMediumWoff, SilkaMediumWoff2],
};

const josefinsans = {
  name: 'Josefin Sans',
  normal: josefinsansNormalWeights,
};

const lato = {
  name: 'Lato',
  normal: latoNormalWeights,
};

const silka = {
  name: 'Silka',
  normal: silkaNormalWeights,
};

const createFontFaces = (family, style = 'normal') => {
  let styles = '';

  for (const [weight, formats] of Object.entries(family[style])) {
    const woff = formats[0];
    const woff2 = formats[1];

    styles += `
      @font-face {
        font-family: '${family.name}';
        src: url(${woff2}) format('woff2'),
            url(${woff}) format('woff');
        font-weight: ${weight};
        font-style: ${style};
        font-display: auto;
      }
    `;
  }

  return styles;
};

const josefinsansNormal = createFontFaces(josefinsans);

const latoNormal = createFontFaces(lato);

const silkaNormal = createFontFaces(silka);

const Fonts = css`
  ${josefinsansNormal + latoNormal + silkaNormal}
`;

export default Fonts;
