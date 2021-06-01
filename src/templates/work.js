import React from 'react';
import { graphql, Link } from 'gatsby';
import PropTypes from 'prop-types';
import { Helmet } from 'react-helmet';
import styled from 'styled-components';
import { Parallax, Background } from 'react-parallax';
import { GatsbyImage, getImage } from 'gatsby-plugin-image';
import { motion } from 'framer-motion';
import { scale } from '../utils/index';
import { ScrollAnimation, ScrollForMore } from '@components';
import { Icon, IconArrow } from '@components/icons';
import { windowDimensions } from '@hooks';

const StyledPostContainer = styled.div`
  width: 100%;
  max-width: inherit;

  .react-parallax-background-children {
    position: relative !important;
  }

  .img-par {
    height: 150vh;
  }

  @media (max-width: 550px) {
    .img-par {
      height: 90vh;
    }
  }
`;

const StyledWorkDetails = styled.div`
  display: grid;
  grid-template-columns: 37.5vw 3.75vw 11.25vw 1fr;
  grid-gap: 0 3.75vw;
  padding: 0 13.0998vw;
  margin-bottom: calc(12.396vw);
  margin-top: calc(6.198vw * 1);
  min-height: 0;

  .desc {
    font-family: var(--font-mono);
    font-size: var(--fz-sm);
  }

  @media (max-width: 550px) {
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    align-items: flex-start;
    grid-gap: 0;
  }
`;

const StyledWorkDesc1 = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;

  p {
    margin: 0 0 15px 0;
  }

  ul {
    display: grid;
    grid-template-columns: 1fr 1fr;
    grid-gap: 0 4.75vw;
    align-items: flex-start;
    padding-left: 20px;
  }

  @media (max-width: 550px) {
    flex: 1 0 100%;
    margin-bottom: 20px;

    p {
      margin: 0 0 10px 0;
    }
  }
`;

const StyledWorkDesc2 = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;

  @media (max-width: 550px) {
    padding-right: calc(64px / 2);
    margin-bottom: 20px;

    p {
      margin: 0 0 10px 0;
    }
  }
`;

const StyledWorkDesc3 = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;

  @media (max-width: 550px) {
    margin-bottom: 20px;

    p {
      margin: 0 0 10px 0;
    }
  }
`;

const StyledWorkDesc4 = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;

  p {
    margin: 0 0 15px 0;
  }

  @media (max-width: 550px) {
    flex: 1 0 100%;
    margin-bottom: 20px;

    p {
      margin: 0 0 10px 0;
    }

    svg {
      bottom: 6px;
      margin-left: 0.6vw;
    }
  }
`;

const HeroImage = styled.div`
  padding: 0 13.0998vw;
`;

const Wrapper = styled.div`
    height: 100vh;
    width: 100%;
`;

const Container = styled(motion.div)`
  width: 100%;
  height: 100%;
  position: fixed;
  top: 0;
  bottom: 0;
  display: grid;
  justify-items: center;
  align-items: center;
  grid-gap: 0.75em;
  z-index: -1;
`;

const Title = styled(motion.h1)`
  display: inline-block;
  line-height: 1.2;
  letter-spacing: -0.01em;
  font-size: 3em;
  margin: 0 auto;
  grid-column: 1 / -1;
  text-align: center;

  @media (max-width: 550px) {
    font-size: 2.5em;
  }
`;

const Scroll = styled(motion.div)`
  position: absolute;
  bottom: 20px;
`;

const SectionOne = styled.div`
  display: flex;
  flex-direction: row;
  align-items: flex-start;
  padding-left: 13.0998vw;
  padding-top: 6.198vw;
  margin-bottom: calc(12.396vw);

  @media (max-width: 550px) {
    padding: 0 20px 0 20px;
  }
`;

const SectionOneImageOne = styled.div`
  position: relative;
  height: 43.75vw;
  width: 43.75vw;
  overflow: hidden;

  @media (max-width: 550px) {
    width: 100%;
    height: auto;
  }
`;

const SectionOneImageTwo = styled.div`
  position: relative;
  margin-top: calc(-1 * 6.198vw);
  height: calc(43.75vw + (6.198vw * 2));
  width: 34.25vw;
  margin-left: auto;
  overflow: hidden;

  .parrlex-right {
    transform: scale(1.7);
    transform-origin: left 20%;
  }

  @media (max-width: 550px) {
    display: none;
  }
`;

const SectionNavigate = styled.div`
  padding: 0 13.0998vw;
  margin-bottom: 12.396vw;
  margin-top: 6.198vw;
`;

const Line = styled.div`
  width: 100%;
  height: 0;
  border: 1px solid var(--grey);
  margin: 3px;
  display: inline-block;
  border-radius: 5px;
`;

const Navigate = styled.div`
  margin-top: 3.198vw;
  display: grid;
  grid-template-columns: 30% 30% 30%;
  grid-gap: 0 3.75vw;
`;

const NavigateElement = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;

  svg line {
    stroke-width: 50;
    stroke: var(--grey);
  }

  svg {
    width: 0.569vw;
    height: 0.569vw;
  }

  a {
    font-size: var(--fz-xl);
    transition: transform 0.7s cubic-bezier(0.4, 0, 0, 1);

    &:hover .icons svg line{
      stroke: var(--accent);
    }
  }

  .prev,
  .home,
  .next{
    cursor: pointer;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
  }

  .arr-up {
    transform: rotate(135deg);
  }

  .up-hid {
    transform: translate3d(0, 240%, 0) rotate(135deg);
  }

  a:hover .icons .up-visi {
    transform: translate3d(0, -240%, 0) rotate(135deg);
  }

  a:hover .icons .up-hid {
    transform: translate3d(0, 0, 0) rotate(135deg);
  }

  .arr-right {
    transform: rotate(225deg);
  }

  .right-hid {
    transform: translate3d(-240%, 0, 0) rotate(225deg);
  }

  a:hover .icons .right-visi {
    transform: translate3d(240%, 0, 0) rotate(225deg);
  }

  a:hover .icons .right-hid {
    transform: translate3d(0, 0, 0) rotate(225deg);
  }

  .arr-left {
    transform: rotate(45deg);
  }

  .left-hid {
    transform: translate3d(240%, 0, 0) rotate(45deg);
  }

  a:hover .icons .left-visi {
    transform: translate3d(-240%, 0, 0) rotate(45deg);
  }

  a:hover .icons .left-hid {
    transform: translate3d(0, 0, 0) rotate(45deg);
  }

  @media (max-width: 550px) {
    a {
      font-size: var(--fz-lg);
    }
  }
`;

const Icons = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 1.077vw;
  height: 1.806vw;
  margin-left: 0.26vw;
  overflow: hidden;

  svg {
    position: absolute;
    transition: transform 0.7s cubic-bezier(0.4, 0, 0, 1);
  }

  @media (max-width: 550px) {
    display: none;
  }
`;

const NavigateElemWrap = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;

  .reverse {
    flex-direction: row-reverse;
    margin-left: 0;
    margin-right: 0.26vw;
  }
`;

const WorkTemplate = ({ data, pageContext }) => {
  const { next, prev } = pageContext;
  const { width } = windowDimensions();
  const { frontmatter } = data.markdownRemark;
  const {
    title,
    date,
    tech,
    client,
    herodesk,
    heromobile,
    external,
    github,
    firstsection,
    parrlax,
  } = frontmatter;
  const herodesktopimg = getImage(herodesk);
  const heromobileimg = getImage(heromobile);
  const firstsectionimg = getImage(firstsection);
  const parrlaximg = getImage(parrlax);

  return (
    <>
      <Helmet title={title} />
      <ScrollAnimation
        render={({ progress }) => {
          const fadeOut = scale(progress * 1.3, 1, 0);
          const fadeOutTitleMobile = scale(progress * 1.5, 1, 0);
          const fadeOutScrollMobile = scale(progress * 3, 1, 0);
          const fadeOutTitle = width >= 500 ? fadeOut : fadeOutTitleMobile;
          const fadeOutScroll = width >= 500 ? fadeOut : fadeOutScrollMobile;
          const transition = { duration: 1.4, ease: [0.6, 0.01, -0.05, 0.9] };

          return (
            <Wrapper>
              <Container
                initial={{
                  opacity: 0,
                }}
                animate={{
                  opacity: 1,
                  transition: { ...transition },
                }}>
                <Title style={{ opacity: fadeOutTitle }}>{title}</Title>
              </Container>

              <Container
                initial={{
                  opacity: 0,
                  y: -300,
                }}
                animate={{
                  opacity: 1,
                  y: 0,
                  transition: { ...transition },
                }}>
                <Scroll style={{ opacity: fadeOutScroll }}>
                  <ScrollForMore />
                </Scroll>
              </Container>
            </Wrapper>
          );
        }}
      />

      <StyledPostContainer>
        <HeroImage>
          <GatsbyImage
            image={width >= 500 ? herodesktopimg : heromobileimg}
            alt={title}
            className="img"
          />
        </HeroImage>

        <StyledWorkDetails>
          <StyledWorkDesc1>
            <p className="desc">Technologies & Tags</p>

            <ul className="subtitle">
              {tech.map(tech => (
                <li key={tech}>{tech}</li>
              ))}
            </ul>
          </StyledWorkDesc1>

          <StyledWorkDesc2>
            <p className="desc">Year</p>
            <p className="subtitle">
              <time>
                {new Date(date).toLocaleDateString('en-US', {
                  year: 'numeric',
                })}
              </time>
            </p>
          </StyledWorkDesc2>

          <StyledWorkDesc3>
            <p className="desc">Client</p>
            <p className="subtitle">{client}</p>
          </StyledWorkDesc3>

          <StyledWorkDesc4>
            <p className="desc">Links</p>
            {external && (
              <a href={external} aria-label="External Link" className="subtitle inline-link">
                Launch website
                <Icon name="External" />
              </a>
            )}
            {github && (
              <a href={github} aria-label="GitHub Link" className="subtitle inline-link">
                View code
                <Icon name="GitHub" />
              </a>
            )}
          </StyledWorkDesc4>
        </StyledWorkDetails>

        <SectionOne>
          <SectionOneImageOne>
            <GatsbyImage image={firstsectionimg} alt={title} className="img" />
          </SectionOneImageOne>

          <SectionOneImageTwo>
            <Parallax strength={-100} className="parrlex-right">
              <Background>
                <GatsbyImage image={firstsectionimg} alt={title} className="img" />
              </Background>
            </Parallax>
          </SectionOneImageTwo>
        </SectionOne>


        <GatsbyImage image={parrlaximg} alt={title} className="img-par" />

        <SectionNavigate>
          <Line className="line" />
          <Navigate>
            <NavigateElement>
              {prev && (
                <NavigateElemWrap>
                  <Link className="prev reverse" to={prev.frontmatter.slug}>
                    Prev
                    <Icons className="icons reverse">
                      <IconArrow className="arr-left left-visi" />
                      <IconArrow className="arr-left left-hid" />
                    </Icons>
                  </Link>
                </NavigateElemWrap>
              )}
            </NavigateElement>

            <NavigateElement>
              <Link className="home" to="/">
                Index
                <Icons className="icons">
                  <IconArrow className="arr-up up-visi" />
                  <IconArrow className="arr-up up-hid" />
                </Icons>
              </Link>
            </NavigateElement>

            <NavigateElement>
              {next && (
                <NavigateElemWrap>
                  <Link className="next " to={next.frontmatter.slug}>
                    Next
                    <Icons className="icons">
                      <IconArrow className="arr-right right-visi" />
                      <IconArrow className="arr-right right-hid" />
                    </Icons>
                  </Link>
                </NavigateElemWrap>
              )}
            </NavigateElement>
          </Navigate>
        </SectionNavigate>
      </StyledPostContainer>
    </>
  );
};

export default WorkTemplate;

WorkTemplate.propTypes = {
  data: PropTypes.object,
  location: PropTypes.object,
  pageContext: PropTypes.object,
};

export const pageQuery = graphql`
  query($path: String!) {
    markdownRemark(frontmatter: { slug: { eq: $path } }) {
      html
      frontmatter {
        title
        date
        tech
        github
        external
        client
        heromobile {
                childImageSharp {
                  gatsbyImageData(placeholder: BLURRED, formats: [AUTO, WEBP, AVIF])
                }
              }
        herodesk {
                childImageSharp {
                  gatsbyImageData(placeholder: BLURRED, formats: [AUTO, WEBP, AVIF])
                }
              }
        firstsection {
                childImageSharp {
                  gatsbyImageData(placeholder: BLURRED, formats: [AUTO, WEBP, AVIF])
                }
              }
        parrlax {
                childImageSharp {
                  gatsbyImageData(placeholder: BLURRED, formats: [AUTO, WEBP, AVIF])
                }
              }
        slug
      }
    }
  }
`;
