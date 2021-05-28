import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { Head, ThemeProvider, Loader, Nav, Social, Progress, Footer } from '@components';
import { GlobalStyle } from '@styles';
import { motion, AnimatePresence } from 'framer-motion';

const StyledContent = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 100vh;
`;

const variants = {
  initial: {
    opacity: 0,
  },
  enter: {
    opacity: 1,
    transition: {
      duration: 0.5,
      delay: 0.5,
      when: 'beforeChildren',
    },
  },
  exit: {
    opacity: 0,
    transition: { duration: 0.5 },
  },
};

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

    handleExternalLinks();
  }, [isLoading]);

  return (
    <>
      <Head />

      <div id="root">
        <ThemeProvider>
          <GlobalStyle />

          {isLoading && isFirstMount ? (
            <Loader finishLoading={() => setIsLoading(false)} />
          ) : (
            <StyledContent>
              <Nav isFirstMount={isFirstMount} />
              <Social isFirstMount={isFirstMount} />
              <Progress isFirstMount={isFirstMount} contentHeight={contentHeight} />

              <AnimatePresence exitBeforeEnter>
                <motion.div
                  id="content"
                  key={location.pathname}
                  variants={variants}
                  initial="initial"
                  animate="enter"
                  exit="exit">
                  {children}
                  <Footer />
                </motion.div>
              </AnimatePresence>
            </StyledContent>
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
