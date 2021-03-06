import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { IconLoader } from '@components/icons';
import { gsap, Power1 } from 'gsap';

const StyledLoader = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  width: 100%;
  height: 100%;
  background-color: var(--body);
  z-index: 99;
  .logo-wrapper {
    position: fixed;
    top: 50%;
    left: 50%;
    width: 10.43056vw;
    min-width: 110px;
    transform: translateX(-50%);
    svg {
      display: block;
      width: 100%;
      height: auto;
      fill: url(#svg-gradient) #fff;
    }
  }
  @media (max-width: 550px) {
    .logo-wrapper {
      width: 37.43056vw;
    }
  }
`;

const Loader = ({ finishLoading }) => {
  const animate = () => {
    const tl = gsap.timeline({
      paused: false,
      delay: 1,
      onComplete: () => {
        finishLoading();
      },
    });

    gsap.set('#bar_top', { scaleX: 0, transformOrigin: 'left' });
    gsap.set('#bar_bottom', { scaleX: 0, transformOrigin: 'right' });
    gsap.set('#B_masked', { x: -20, transformOrigin: 'left' });
    gsap.set('#D_masked', { x: 20, transformOrigin: 'right' });

    tl.to(['#bar_top', '#bar_bottom'], { duration: 0.5, scaleX: 1, ease: Power1.easeInOut }, 'a')
      .to(
        '#buliga .letter',
        { duration: 0.1, opacity: 0, stagger: 0.075, ease: Power1.easeInOut },
        'a',
      )
      .to(
        '#dragos .letter',
        { duration: 0.1, opacity: 0, stagger: 0.075, ease: Power1.easeInOut },
        'a',
      )
      .to('#bar_top', { duration: 0.5, x: 20, ease: Power1.easeInOut }, `b-=${0.2}`)
      .to('#bar_bottom', { duration: 0.5, x: -20, ease: Power1.easeInOut }, `b-=${0.2}`)
      .to('#B_masked', { duration: 0.5, x: 0, ease: Power1.easeInOut }, `b-=${0.2}`)
      .to('#D_masked', { duration: 0.5, x: 0, ease: Power1.easeInOut }, `b-=${0.2}`)
      .to('#bar_top', { duration: 0.5, x: 49, scaleX: 0.26, ease: Power1.easeInOut }, `c-=${0.1}`)
      .to(
        '#bar_bottom',
        { duration: 0.5, x: -49, scaleX: 0.26, ease: Power1.easeInOut },
        `c-=${0.1}`,
      )
      .to('#B_masked', { duration: 0.5, x: 34, ease: Power1.easeInOut }, `c-=${0.1}`)
      .to('#D_masked', { duration: 0.5, x: -34, ease: Power1.easeInOut }, `c-=${0.1}`)
      .to('.loader', {
        duration: 0.8,
        ease: 'back.in',
        scale: 0,
        opacity: 0,
        delay: 0.2,
        stagger: { amount: -0.4 },
      });
  };

  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    const timeout = setTimeout(() => setIsMounted(true), 10);
    animate();
    return () => clearTimeout(timeout);
  }, []);

  return (
    <StyledLoader className="loader" isMounted={isMounted}>
      <Helmet bodyAttributes={{ class: `hidden` }} />
      <div className="logo-wrapper">
        <IconLoader />
      </div>
    </StyledLoader>
  );
};

Loader.propTypes = {
  finishLoading: PropTypes.func.isRequired,
};

export default Loader;
