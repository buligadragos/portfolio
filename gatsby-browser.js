import React from 'react';
import { Layout } from './src/components';
import PropTypes from 'prop-types';

export const wrapPageElement = ({ element, props }) => <Layout {...props}>{element}</Layout>;

// export const shouldUpdateScroll = ({ routerProps: { location }, getSavedScrollPosition }) => {
//   // transition duration from `layout.js` * 1000 to get time in ms
//   // * 2 for exit + enter animation
//   const TRANSITION_DELAY = 0.5 * 1000 * 2;
//   // if it's a "normal" route
//   if (location.action === 'PUSH') {
//     window.setTimeout(() => window.scrollTo(0, 0), TRANSITION_DELAY);
//   } else {
//     const savedPosition = getSavedScrollPosition(location) || [0, 0];
//     window.setTimeout(() => window.scrollTo(...savedPosition), TRANSITION_DELAY);
//   }
//   return false;
// };

wrapPageElement.propTypes = {
  element: PropTypes.element.isRequired,
  props: PropTypes.any,
};
