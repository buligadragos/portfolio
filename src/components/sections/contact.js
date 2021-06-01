import React, { useEffect, useRef } from 'react';
import styled from 'styled-components';
import { srConfig } from '@config';
import sr from '@utils/sr';
import { Icon } from '@components/icons';

const StyledContactSection = styled.section`
  max-width: 600px;
  margin: 0 auto 100px;
  text-align: center;

  svg {
    margin-top: 40px;
    width: 70%;
    height: 30vmin;

    @media (max-width: 550px) {
      width: auto;
      height: auto;
    }
  }

  #main path {
    stroke-width: 7%;
    stroke: transparent;
  }

  .hello-name,
  .at-name,
  .name-name,
  .ro {
    fill: var(--headline);
    transition: 0.8s;
  }

  .git-lines,
  .email-lines,
  .insta-lines,
  .hi-lines {
    stroke: var(--grey);
    transition: 0.5s;
  }

  #git-txt,
  #insta-txt,
  #email-txt {
    fill: var(--grey);
    transition: 0.2s;
  }

  #git-txt:hover,
  #git-txt:hover ~ .name-name {
    fill: var(--accent);
  }

  #git-txt:hover + .git-lines {
    stroke: var(--accent);
  }

  #insta-txt:hover,
  #insta-txt:hover ~ .name-name,
  #insta-txt:hover ~ .at-name {
    fill: var(--accent);
  }

  #insta-txt:hover + .insta-lines {
    stroke: var(--accent);
  }

  #email-txt:hover,
  #email-txt:hover ~ .hello-name,
  #email-txt:hover ~ .at-name,
  #email-txt:hover ~ .name-name,
  #email-txt:hover ~ .ro {
    fill: var(--accent);
  }

  #email-txt:hover + .email-lines {
    stroke: var(--accent);
  }

  #hi-txt:hover ~ .hello-name {
    fill: var(--accent);
  }

  #hi-txt:hover + .hi-lines {
    stroke: var(--accent);
  }

  @media (max-width: 768px) {
    margin: 0 auto 50px;
  }

  .overline {
    display: block;
    margin-bottom: 20px;
    color: var(--accent);
    font-family: var(--font-mono);
    font-size: var(--fz-md);
    font-weight: 400;

    &:before {
      bottom: 0;
      font-size: var(--fz-sm);
    }

    &:after {
      display: none;
    }
  }

  .title {
    font-size: clamp(40px, 5vw, 60px);
  }
`;

const Contact = () => {
  const revealContainer = useRef(null);
  useEffect(() => sr.reveal(revealContainer.current, srConfig()), []);

  return (
    <StyledContactSection id="contact" ref={revealContainer}>
      <h2 className="numbered-heading overline">What’s Next?</h2>

      <h2 className="title">Get In Touch</h2>

      <Icon name="Contact" />
    </StyledContactSection>
  );
};

export default Contact;
