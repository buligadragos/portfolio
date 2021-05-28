import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import {
  Hero,
  About,
  Jobs,
  Featured,
  Contact,
  ParticleBackground,
  ParticleBackgroundMobile,
} from '@components';
import { windowDimensions } from '@hooks';

const StyledMainContainer = styled.main`
  counter-reset: section;
`;

const IndexPage = () => {
  const { width } = windowDimensions();
  let x;
  let y;
  let scale;
  let xm;
  let ym;
  let scalem;

  if (width >= 2000) {
    x = width / 46;
    y = width / 70;
    scale = 0.6;
  } else if (width >= 1300) {
    x = width / 36;
    y = 20;
    scale = 0.6;
  } else if (width >= 850) {
    x = width / 26;
    y = 35;
    scale = 0.4;
  } else if (width >= 500) {
    xm = width / 25;
    ym = 60;
    scalem = 0.3;
  } else if (width >= 400) {
    xm = width / 20;
    ym = 70;
    scalem = 0.2;
  } else if (width > 330) {
    xm = width / 25;
    ym = 73;
    scalem = 0.2;
  }

  useEffect(() => {
    window.scrollTo({
      top: 0,
      left: 0,
    });
  }, []);

  return (
    <>
      {width >= 850 ? (
        <ParticleBackground x={x} y={y} size={scale} />
      ) : (
        <ParticleBackgroundMobile xm={xm} ym={ym} sizem={scalem} />
      )}
      <StyledMainContainer className="fillHeight">
        <Hero />
        <About />
        <Jobs />
        <Featured />
        <Contact />
      </StyledMainContainer>
    </>
  );
};

IndexPage.propTypes = {
  location: PropTypes.object.isRequired,
};

export default IndexPage;
