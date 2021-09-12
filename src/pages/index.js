import React from 'react';
import styled from 'styled-components';
import { Hero, About, Jobs, Featured, Contact } from '@components';

const StyledMainContainer = styled.main`
  counter-reset: section;
`;

const IndexPage = () => (
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

export default IndexPage;
