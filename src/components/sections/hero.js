import React from 'react';
import styled from 'styled-components';

const StyledHeroSection = styled.section`
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: flex-start;
  min-height: 100vh;
  padding: 0;
  position: relative;
  overflow: hidden;
  opacity: 0;

  @media (max-width: 480px) and (min-height: 700px) {
    padding-bottom: 10vh;
  }

  h1 {
    margin: 0 0 30px 4px;
    font-size: clamp(var(--fz-sm), 5vw, var(--fz-md));
    font-weight: 400;
    background: linear-gradient(90deg, #ff7f51, #e85333, #a02817);
    -webkit-background-clip: text;
    background-clip: text;
    -webkit-text-fill-color: transparent;

    @media (max-width: 480px) {
      margin: 0 0 20px 2px;
    }
  }

  h3 {
    margin-top: 10px;
    color: var(--grey);
    line-height: 1.1;
  }

  p {
    margin: 20px 0 0;
    max-width: 500px;
    color: var(--grey);
  }
`;

const Hero = () => (
  <StyledHeroSection data-scroll-section id="hero">
    <h1>Hi, my name is</h1>
    <h2 className="big-heading">Buliga Dragos.</h2>
    <h3 className="medium-heading">I design and code beautifully simple things.</h3>
    <p>
      Fueled by high energy levels and boundless enthusiasm, I’m easily inspired and more than
      willing to follow my fascinations wherever they take me.
    </p>
  </StyledHeroSection>
);

export default Hero;
