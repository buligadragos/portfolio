import React from 'react';
import styled from 'styled-components';
import { Hero, About, Jobs, Featured, Contact, HeroMap } from '@components';

const StyledMainContainer = styled.main`
  counter-reset: section;
`;

const IndexPage = () => (
  <>
    <StyledMainContainer className="fillHeight">
      <HeroMap />
      <Hero />
      <About />
      <Jobs />
      <Featured />
      <Contact />
    </StyledMainContainer>
  </>
);

export default IndexPage;
