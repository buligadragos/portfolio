import React from 'react';
import PropTypes from 'prop-types';

const IconArrow = ({ className }) => (
  <svg
    version="1.1"
    className={className}
    xmlns="http://www.w3.org/2000/svg"
    x="0px"
    y="0px"
    viewBox="0 0 259.5 259.5">
    <g>
      <line className="linea l-mid" x1="250" y1="9.5" x2="13.4" y2="246.1" />
      <line className="linea l-lft" x1="13.4" y1="34.6" x2="13.4" y2="259.5" />
      <line className="linea l-btm" x1="224.9" y1="246.1" x2="0" y2="246.1" />
    </g>
  </svg>
);

IconArrow.propTypes = {
  className: PropTypes.string,
};

export default IconArrow;
