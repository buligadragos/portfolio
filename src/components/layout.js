import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { Head, ThemeProvider, Loader, Nav, Social, Progress, Footer } from '@components';
import { GlobalStyle } from '@styles';
import '../styles/locomotive-scroll.css';
import Scroll from '../hooks/useLocoScroll';
import CookieConsent from 'react-cookie-consent';
import IconCookie from './icons/cookie';
import { gsap, Power1 } from 'gsap';
import { Link } from 'gatsby';

const StyledContent = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 100vh;

  #rcc-confirm-button {
    display: none;
  }

  .cookies-consent-wrapper {
    z-index: 9999;
    position: fixed;
    bottom: 1.5vw !important;
    right: 3vw;
    background: hsla(0, 0%, 100%, 0.05);
    border-radius: 100px;
    padding: 0.4861111111vw 0;
    transition: all 0.45s cubic-bezier(0.77, 0, 0.175, 1);
    backdrop-filter: blur(10px);
    -webkit-box-shadow: 0 10px 5px 0 rgba(0, 0, 0, 0.06);
    box-shadow: 0 10px 5px 0 rgba(0, 0, 0, 0.06);
    opacity: 0;
    transform: translateY(200px);
  }

  .cookie-content {
    align-items: center;
    display: flex;
    justify-content: flex-start;
  }

  .c-hero__cookie {
    margin-right: 0.625vw;
    margin-left: 0.8333333333vw;
    width: 19px;
    height: 19px;
    stroke: var(--headline);
    stroke-width: 1;
  }

  .c-hero__close--cookies {
    background: rgba(19, 25, 24, 0.8);
    border-radius: 50%;
    margin-right: 0.625vw;
    width: 19px;
    height: 19px;
    cursor: pointer;
    fill: none;
  }
  .c-hero__close--cookies circle {
    stroke: none;
  }
  .c-hero__close--cookies {
    transition: background-color 0.35s cubic-bezier(0.645, 0.045, 0.355, 1);
  }
  .c-hero__close--cookies:hover {
    background: linear-gradient(90deg, #ff7f51, #e85333, #a02817);
  }
  .c-hero__close--cookies path {
    transition: stroke 0.35s cubic-bezier(0.645, 0.045, 0.355, 1);
  }
  .c-hero__close--cookies:hover path {
    stroke: #131918;
  }

  .text {
    display: inline-block;
    font-family: var(--font-mono);
    font-size: 0.6944444444vw;
    line-height: 0.5381944444vw;
    margin-right: 0.6vw;
  }

  @media (max-width: 875px) {
    .cookies-consent-wrapper {
      width: max-content;
      padding: 10px 0;
      left: 50%;
      bottom: 205px;
      transform: translate(-50%, -50%);
      overflow: hidden;
      white-space: nowrap;
    }

    .text {
      font-size: var(--fz-xs);
      line-height: 1.2;
    }

    .c-hero__cookie {
      margin-right: 7px;
      margin-left: 10px;
      width: 24px;
      height: 24px;
    }

    .c-hero__close--cookies {
      background: rgba(19, 25, 24, 0.8);
      border-radius: 50%;
      margin-left: 10px;
      margin-right: 10px;
      width: 25px;
      height: 25px;
      cursor: pointer;
      fill: none;
    }
  }
`;

const Layout = ({ children, location }) => {
  const contentHeight = useState(0);
  const isFirstMount = !location.action;
  const [isLoading, setIsLoading] = useState(isFirstMount);

  // Sets target="_blank" rel="noopener noreferrer" on external links
  const handleExternalLinks = () => {
    const allLinks = Array.from(document.querySelectorAll('a'));
    if (allLinks.length > 0) {
      allLinks.forEach(link => {
        if (link.host !== window.location.host) {
          link.setAttribute('rel', 'noopener noreferrer');
          link.setAttribute('target', '_blank');
        }
      });
    }
  };

  useEffect(() => {
    if (isLoading) {
      return;
    }

    setTimeout(() => {
      const cookie = document.querySelector('.cookies-consent-wrapper');

      gsap.fromTo(
        cookie,
        { opacity: 0, y: 200 },
        { opacity: 1, y: 0, duration: 2.5, ease: Power1.easeInOut },
      );
    }, 500);
  }, [isLoading]);

  useEffect(() => {
    if (isLoading) {
      return;
    }

    handleExternalLinks();
  }, [isLoading]);

  function handleSubmit(e) {
    e.preventDefault();
    const cookie = document.querySelector('.cookies-consent-wrapper');
    gsap.set(cookie, { opacity: 1, y: 0 });

    const cookietl = gsap.timeline({
      paused: true,
      delay: 0,
      markers: true,
      onComplete: () => {
        document.getElementById('rcc-confirm-button').click();
      },
    });
    cookietl.to(cookie, { duration: 0.4, y: 500, ease: Power1.easeInOut }, 'a');
    cookietl.to(cookie, { delay: 1 }, 'b');

    cookietl.play();
  }

  return (
    <>
      <Head />
      <div id="root">
        <ThemeProvider>
          <GlobalStyle />

          {isLoading && isFirstMount ? (
            <Loader finishLoading={() => setIsLoading(false)} />
          ) : (
            <>
              <Scroll callbacks={location} />
              <StyledContent className="main-container" id="main-container" data-scroll-container>
                <Nav />
                <Social />
                <Progress contentHeight={contentHeight} />

                <div id="content">
                  {children}
                  <Footer />
                </div>
                <CookieConsent
                  location="bottom"
                  buttonText="OK"
                  containerClasses="cookies-consent-wrapper"
                  contentClasses="cookie-content"
                  cookieName="myAwesomeCookieName2"
                  buttonClasses="ok-btn"
                  disableStyles={true}
                  debug={false}>
                  <IconCookie />
                  <p className="text">
                    This website use{' '}
                    <Link className="inline-link scarlet" to="/privacy">
                      cookies
                    </Link>
                    .
                  </p>
                  <svg
                    onClick={handleSubmit}
                    className="c-hero__close--cookies"
                    width="25"
                    height="25"
                    viewBox="0 0 25 25"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg">
                    <circle cx="12.5" cy="12.5" r="12" stroke="white" strokeOpacity="0.5"></circle>
                    <path d="M9.28516 16.4287L16.428 9.28585" stroke="white"></path>
                    <path d="M9.28516 9.28564L16.428 16.4285" stroke="white"></path>
                  </svg>
                </CookieConsent>
              </StyledContent>
            </>
          )}
        </ThemeProvider>
      </div>
    </>
  );
};

Layout.propTypes = {
  children: PropTypes.node.isRequired,
  location: PropTypes.object.isRequired,
};

export default Layout;
