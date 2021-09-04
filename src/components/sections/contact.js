import React from 'react';
import styled from 'styled-components';
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
    transition: all 0.4s ease-out;
  }

  .git-lines,
  .email-lines,
  .insta-lines,
  .hi-lines {
    stroke: var(--grey);
    transition: all 0.4s ease-out;
  }

  #git-txt,
  #insta-txt,
  #email-txt {
    fill: var(--grey);
    transition: all 0.4s ease-out;
  }

  #git-txt:hover,
  #git-txt:hover ~ .name-name {
    fill: url(#svg-gradient) #fff;
    transition: all 0.4s ease-out;
  }

  #git-txt:hover + .git-lines {
    stroke: url(#contact-lines);
  }

  #insta-txt:hover,
  #insta-txt:hover ~ .name-name,
  #insta-txt:hover ~ .at-name {
    fill: url(#svg-gradient) #fff;
  }

  #insta-txt:hover + .insta-lines {
    stroke: url(#contact-lines);
  }

  #email-txt:hover,
  #email-txt:hover ~ .hello-name,
  #email-txt:hover ~ .at-name,
  #email-txt:hover ~ .name-name,
  #email-txt:hover ~ .ro {
    fill: url(#svg-gradient) #fff;
  }

  #email-txt:hover + .email-lines {
    stroke: url(#contact-lines);
  }

  #hi-txt:hover ~ .hello-name {
    fill: url(#svg-gradient) #fff;
  }

  #hi-txt:hover + .hi-lines {
    stroke: url(#contact-lines);
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

const Contact = () => (
  <StyledContactSection id="contact" data-scroll-section>
    <h2 className="numbered-heading overline scarlet">What’s Next?</h2>

    <h2 className="title">Get In Touch</h2>

    <Icon name="Contact" />
  </StyledContactSection>
);

export default Contact;
