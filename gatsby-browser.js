import React from 'react';
import { Layout } from './src/components';
import PropTypes from 'prop-types';

export const wrapPageElement = ({ element, props }) => <Layout {...props}>{element}</Layout>;

const transitionDelay = 0;

export const shouldUpdateScroll = ({ routerProps: { location }, getSavedScrollPosition }) => {
  if (location.action === 'PUSH') {
    return false;
  } else {
    const savedPosition = getSavedScrollPosition(location);
    window.setTimeout(() => window.scrollTo(...(savedPosition || [0, 0])), transitionDelay);
  }
  return false;
};

wrapPageElement.propTypes = {
  element: PropTypes.element.isRequired,
  props: PropTypes.any,
};
