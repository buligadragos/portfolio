import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const StyledSideElement = styled.div`
  position: fixed;
  transform: translate(0, -50%);
  top: 50%;
  bottom: ${props => (props.orientation === 'right' ? 'inherit' : 'inherit')};
  left: ${props => (props.orientation === 'left' ? '20px' : 'auto')};
  right: ${props => (props.orientation === 'left' ? 'auto' : '0px')};
  z-index: 10;
  color: var(--grey);

  @media (max-width: 1080px) {
    left: ${props => (props.orientation === 'left' ? '20px' : 'auto')};
    right: ${props => (props.orientation === 'left' ? 'auto' : '0px')};
  }

  @media (max-width: 768px) {
    display: ${props => (props.orientation === 'right' ? 'inherit' : 'inherit')};
    right: ${props => (props.orientation === 'left' ? 'auto' : '0px')};
  }

  @media (max-width: 550px) {
    display: ${props => (props.orientation === 'right' ? 'inherit' : 'none')};
  }
`;

const Side = ({ children, orientation }) => (
  <StyledSideElement orientation={orientation}>{children}</StyledSideElement>
);

Side.propTypes = {
  children: PropTypes.node.isRequired,
  isFirstMount: PropTypes.bool,
  orientation: PropTypes.string,
};

export default Side;
