import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import { Side } from '@components';

const ProgressContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  position: relative;
`;

const Trackline = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  height: 100vh;
  width: 4px;
  background-color: rgba(255, 255, 255, 0.06);
  opacity: 1;
  z-index: 9999;
`;

const ProgressLine = styled.div`
  position: absolute;
  height: 100%;
  width: 4px;
  background: linear-gradient(180deg, #ff7f51, #e85333, #a02817);
  left: 0;
  transform: scale(1, 0);
`;

const Progress = () => (
  <Side orientation="right" tabIndex={-1}>
    <ProgressContainer tabIndex={-1}>
      <Trackline aria-hidden="true">
        <ProgressLine id="scrollbar" />
      </Trackline>
    </ProgressContainer>
  </Side>
);

Progress.propTypes = {
  isFirstMount: PropTypes.bool,
  contentHeight: PropTypes.array,
};

export default Progress;
