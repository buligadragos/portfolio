import React, { useEffect, useRef } from 'react';
import { StaticImage } from 'gatsby-plugin-image';
import styled from 'styled-components';
import { srConfig } from '@config';
import sr from '@utils/sr';
import Tilt from 'react-parallax-tilt';
import { Icon } from '@components/icons';

const StyledAboutSection = styled.section`
  max-width: 900px;

  .inner {
    display: grid;
    grid-template-columns: 3fr 2fr;
    grid-gap: 50px;

    @media (max-width: 768px) {
      display: block;
    }
  }
`;
const StyledText = styled.div`
  ul.skills-list {
    display: grid;
    grid-template-columns: repeat(2, minmax(140px, 200px));
    padding: 0;
    margin: 20px 0 0 0;
    overflow: hidden;
    list-style: none;

    li {
      position: relative;
      margin-bottom: 10px;
      padding-left: 20px;
      font-family: var(--font-mono);
      font-size: var(--fz-xs);

      &:before {
        content: '▹';
        position: absolute;
        left: 0;
        color: var(--accent);
        font-size: var(--fz-md);
        line-height: 12px;
      }
    }
  }
`;

const StyledPic = styled.div`
  position: relative;
  max-width: 300px;

  @media (max-width: 768px) {
    margin: 50px auto 0;
    width: 70%;
  }

  .wrapper {
    display: block;
    position: relative;
    width: 100%;

    &:hover,
    &:focus {
      background: transparent;
      outline: 0;
      .img {
        filter: none;
        mix-blend-mode: normal;
      }
    }
  }

  .img {
    mix-blend-mode: multiply;
    filter: grayscale(100%) contrast(1);
    transition: var(--transition);
  }
`;

const About = () => {
  const revealContainer = useRef(null);

  useEffect(() => {
    sr.reveal(revealContainer.current, srConfig());
  }, []);

  const TiltImg = () => (
    <Tilt
      className="parallax-effect"
      perspective={1300}
      glareEnable={true}
      transitionSpeed={5500}
      glareMaxOpacity={0.25}
      scale={1.15}>
      <StaticImage
        className="img"
        src="../../images/me.jpg"
        width={500}
        quality={95}
        formats={['AUTO', 'WEBP', 'AVIF']}
        alt="Avatar"
      />
    </Tilt>
  );

  return (
    <StyledAboutSection id="about" ref={revealContainer}>
      <h2 className="numbered-heading">About Me</h2>

      <div className="inner">
        <StyledText>
          <div>
            <p>
              I am an ambitious, naturally curious college student with a great passion for Computer
              Science. My interest in web development started back in 2015 when I decided to
              participate in the scientific communication session organized by my high school with
              my very first website.
            </p>

            <p>
              Fast-forward to today, I’m now focusing on web apps and data analysis, am currently
              pursuing my Master of Science in E-Business at{' '}
              <a href="https://www.ubbcluj.ro/en/" className="inline-link">
                Babes-Bolyai University
              </a>
              , and working as a freelancer on{' '}
              <a
                href="https://www.upwork.com/freelancers/~0187fc4de875739745"
                className="inline-link">
                Upwork
              </a>
              .{' '}
            </p>

            <p>
              You can read more about my experience, skills, education, and much more in the PDF
              attached below:
            </p>

            <p></p>

            <a
              href="/resume.pdf"
              aria-label="External Link"
              className="subtitle inline-link"
              target="_blank"
              rel="noopener noreferrer">
              My resume
              <Icon name="External" />
            </a>

            <p>Here are a few technologies I've been working with recently:</p>
          </div>

          <ul className="skills-list">
            <li>JavaScript (ES6+)</li>
            <li>React</li>
            <li>WordPress</li>
          </ul>
        </StyledText>

        <StyledPic>
          <div className="wrapper">
            <TiltImg />
          </div>
        </StyledPic>
      </div>
    </StyledAboutSection>
  );
};

export default About;
