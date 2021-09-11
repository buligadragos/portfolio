import React from 'react';
import styled from 'styled-components';
import { Hero, About, Jobs, Featured, Contact } from '@components';
import useLocoScroll from '../hooks/useLocoScroll';

const StyledMainContainer = styled.main`
  counter-reset: section;
`;

const IndexPage = () => {
  useLocoScroll.update;
  return (
    <>
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

export default IndexPage;
