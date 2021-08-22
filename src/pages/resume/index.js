import React, { useRef } from 'react';
import { Link } from 'gatsby';
import PropTypes from 'prop-types';
import { Helmet } from 'react-helmet';
import styled from 'styled-components';
import { motion } from 'framer-motion';

const StyledHeader = styled.div`
  text-align: center;
`;

const StyledArchiveLink = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 80px auto 0;
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

const ResumePage = () => {
  const revealTitle = useRef(null);
  const revealButton = useRef([]);
  const transition = { duration: 2.0, ease: [0.6, 0.01, -0.05, 0.9] };

  return (
    <>
      <Helmet title="Resume" />

      <motion.main
        initial={{
          opacity: 0,
        }}
        animate={{
          opacity: 1,
          transition: { ...transition },
        }}>
        <StyledHeader ref={revealTitle}>
          <h1 className="big-heading">Resume</h1>
          <p className="subtitle">A big list of things I’ve worked on</p>
        </StyledHeader>

        <StyledArchiveLink ref={revealButton}>
          <Link className="svgbutton" to="/">
            Back to home
            <Icons className="icons"></Icons>
          </Link>
        </StyledArchiveLink>
      </motion.main>
    </>
  );
};
ResumePage.propTypes = {
  location: PropTypes.object.isRequired,
  data: PropTypes.object.isRequired,
};

export default ResumePage;
