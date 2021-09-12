import React from 'react';
import { Layout } from './src/components';
import PropTypes from 'prop-types';

export const wrapPageElement = ({ element, props }) => <Layout {...props}>{element}</Layout>;

wrapPageElement.propTypes = {
  element: PropTypes.element.isRequired,
  props: PropTypes.any,
};
