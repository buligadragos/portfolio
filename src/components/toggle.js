import React from 'react';
import { IconMoon, IconSun } from '@components/icons';
import PropTypes from 'prop-types';

const Toggle = ({ name }) => {
  switch (name) {
    case 'sun':
      return <IconMoon />;
    case 'moon':
      return <IconSun />;
    default:
      return null;
  }
};

export default Toggle;

Toggle.propTypes = {
  name: PropTypes.string,
};
