import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import styled from 'styled-components';
import { loaderDelay } from '@utils';

const StyledSideElement = styled.div`
  position: fixed;
  transform: translate(0, -50%);
  top: 50%;
  bottom: ${props => (props.orientation === 'right' ? 'inherit' : 'inherit')};
  left: ${props => (props.orientation === 'left' ? '20px' : 'auto')};
  right: ${props => (props.orientation === 'left' ? 'auto' : '40px')};
  z-index: 10;
  color: var(--grey);

  @media (max-width: 1080px) {
    left: ${props => (props.orientation === 'left' ? '20px' : 'auto')};
    right: ${props => (props.orientation === 'left' ? 'auto' : '0px')};
  }

  @media (max-width: 768px) {
    display: ${props => (props.orientation === 'right' ? 'inherit' : 'none')};
    right: ${props => (props.orientation === 'left' ? 'auto' : '-30px')};
  }

  @media (max-width: 550px) {
    display: none;
  }
`;

const Side = ({ children, isFirstMount, orientation }) => {
  const [isMounted, setIsMounted] = useState(!isFirstMount);

  useEffect(() => {
    if (!isFirstMount) {
      return;
    }
    const timeout = setTimeout(() => setIsMounted(true), loaderDelay);
    return () => clearTimeout(timeout);
  }, []);

  return (
    <StyledSideElement orientation={orientation}>
      <TransitionGroup component={null}>
        {isMounted && (
          <CSSTransition
            classNames={isFirstMount ? 'fade' : ''}
            timeout={isFirstMount ? loaderDelay : 0}>
            {children}
          </CSSTransition>
        )}
      </TransitionGroup>
    </StyledSideElement>
  );
};

Side.propTypes = {
  children: PropTypes.node.isRequired,
  isFirstMount: PropTypes.bool,
  orientation: PropTypes.string,
};

export default Side;
