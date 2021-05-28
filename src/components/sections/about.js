import React, { useEffect, useRef } from 'react';
import { useStaticQuery, graphql } from 'gatsby';
import Img from 'gatsby-image';
import styled from 'styled-components';
import { srConfig } from '@config';
import sr from '@utils/sr';
import Tilt from 'react-parallax-tilt';
import { Icon } from '@components/icons';
import { mixins } from '@styles';

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
      font-size: var(--fz-sm);

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

  a {
    display: inline-block;
    flex-direction: row;
    align-items: flex-start;
    cursor: pointer;
    font-family: var(--font-sans);
  }

  a:hover {
    color: var(--accent);
    outline: 0;

    &:after {
      width: 100%;
    }

    & > * {
      color: var(--accent) !important;
      transition: var(--transition);
    }
  }

  a:after {
    content: '';
    display: block;
    width: 0;
    height: 1px;
    position: relative;
    bottom: 0.37em;
    background-color: var(--accent);
    transition: var(--transition);
    opacity: 0.5;
  }

  svg {
    width: 1em;
    height: 1em;
    bottom: 8px;
    position: absolute;
    margin-left: 0.4vw;
  }

  p {
    & > a {
      ${mixins.inlineLink};
    }
  }

  .subtitle {
    cursor: context-menu;
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
      &:after {
        top: 15px;
        left: 15px;
      }
      .img {
        filter: none;
        mix-blend-mode: normal;
      }
    }

  .img {
    position: relative;
    border-radius: var(--border-radius);
    mix-blend-mode: multiply;
    filter: grayscale(100%) contrast(1);
    transition: var(--transition);
  }



`;

const About = () => {
  const data = useStaticQuery(graphql`
    query {
      avatar: file(sourceInstanceName: { eq: "images" }, relativePath: { eq: "me.jpg" }) {
        childImageSharp {
          fluid(maxWidth: 500, traceSVG: { color: "#64ffda" }) {
            ...GatsbyImageSharpFluid_withWebp_tracedSVG
          }
        }
      }
    }
  `);

  const revealContainer = useRef(null);

  useEffect(() => {
    sr.reveal(revealContainer.current, srConfig());
  }, []);

  const skills = ['JavaScript (ES6+)', 'React', 'WordPress'];

  const TiltImg = () => (
    <Tilt
      tiltMaxAngleX={30}
      tiltMaxAngleY={30}
      perspective={1300}
      transitionSpeed={1500}
      scale={1.1}
      gyroscope={true}>
      <Img fluid={data.avatar.childImageSharp.fluid} alt="Avatar" className="img" />
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
              <a href="https://www.ubbcluj.ro/en/">Babes-Bolyai University</a>, and working as a
              freelancer on{' '}
              <a href="https://www.upwork.com/freelancers/~0187fc4de875739745">Upwork</a>.{' '}
            </p>

            <p>
              You can read more about my experience, skills, education, and much more in the PDF
              attached below:
            </p>

            <a
              href="/resume.pdf"
              aria-label="External Link"
              className="subtitle"
              target="_blank"
              rel="noopener noreferrer">
              My resume
              <Icon name="External" />
            </a>

            <p>Here are a few technologies I've been working with recently:</p>
          </div>

          <ul className="skills-list">
            {skills && skills.map((skill, i) => <li key={i}>{skill}</li>)}
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
