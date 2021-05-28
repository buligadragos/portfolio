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



const josefinsansNormalWeights = {
  300: [JosefinSansLightWoff, JosefinSansLightWoff2],
  400: [JosefinSansRegularWoff, JosefinSansRegularWoff2],
  600: [JosefinSansSemiboldWoff, JosefinSansSemiboldWoff2],
};

const latoNormalWeights = {
  400: [LatoRegularWoff, LatoRegularWoff2],
  600: [LatoSemiboldWoff, LatoSemiboldWoff2],
};



const josefinsans = {
  name: 'Josefin Sans',
  normal: josefinsansNormalWeights,
};

const lato = {
  name: 'Lato',
  normal: latoNormalWeights,
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


const Fonts = css`
  ${josefinsansNormal + latoNormal}
`;

export default Fonts;
