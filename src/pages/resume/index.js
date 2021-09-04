import React, { useRef } from 'react';
import { Link } from 'gatsby';
import PropTypes from 'prop-types';
import { Helmet } from 'react-helmet';
import styled from 'styled-components';

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

  return (
    <>
      <Helmet title="Resume" />

      <main>
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
      </main>
    </>
  );
};
ResumePage.propTypes = {
  location: PropTypes.object.isRequired,
  data: PropTypes.object.isRequired,
};

export default ResumePage;
