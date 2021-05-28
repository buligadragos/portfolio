import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'gatsby';
import { Helmet } from 'react-helmet';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { navDelay } from '@utils';
import { IconHome } from '../components/icons';
import { mixins } from '@styles';

const StyledMainContainer = styled.main`
  ${mixins.flexCenter};
  flex-direction: column;
`;
const StyledTitle = styled.h1`
  color: var(--headline);
  font-family: var(--font-mono);
  font-size: clamp(100px, 25vw, 200px);
  line-height: 1;
`;
const StyledSubtitle = styled.h2`
  font-size: clamp(30px, 5vw, 50px);
  font-weight: 400;
`;
const StyledArchiveLink = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 80px auto 0;
  .archive-link {
    font-family: var(--font-sans);
    font-size: var(--fz-xl);
    &:after {
      bottom: 0.1em;
    }
  }
  .home-butt {
    ${mixins.svgButton};
  }
  .home-hid {
    transform: translate3d(0, 240%, 0);
  }
  a:hover .icons .home-visi {
    transform: translate3d(0, -240%, 0);
  }
  a:hover .icons .home-hid {
    transform: translate3d(0, 0, 0);
  }
`;
const Icons = styled.span`
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 2.077vw;
  height: 1.806vw;
  margin-left: 0.26vw;
  overflow: hidden;
  svg {
    position: absolute;
    transition: transform 0.7s cubic-bezier(0.4, 0, 0, 1);
  }
  @media (max-width: 550px) {
    margin-left: 2.26vw;
    width: 4.077vw;
    height: 3.806vw;
  }
`;

const NotFoundPage = () => {
  const [isMounted, setIsMounted] = useState(false);
  const revealButton = useRef([]);

  useEffect(() => {
    const timeout = setTimeout(() => setIsMounted(true), navDelay);
    return () => clearTimeout(timeout);
  }, []);

  return (
    <>
      <Helmet title="Page Not Found" />

      <TransitionGroup component={null}>
        {isMounted && (
          <CSSTransition timeout={500} classNames="fadeup">
            <StyledMainContainer className="fillHeight">
              <StyledTitle>404</StyledTitle>
              <StyledSubtitle>Page Not Found</StyledSubtitle>
              <StyledArchiveLink ref={revealButton}>
                <Link className="home-butt" to="/">
                  Back to home
                  <Icons className="icons">
                    <IconHome className="home-visi" />
                    <IconHome className="home-hid" />
                  </Icons>
                </Link>
              </StyledArchiveLink>
            </StyledMainContainer>
          </CSSTransition>
        )}
      </TransitionGroup>
    </>
  );
};

NotFoundPage.propTypes = {
  location: PropTypes.object.isRequired,
};

export default NotFoundPage;
