import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import throttle from 'lodash/throttle';
import { clamp } from '@utils';
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
  height: calc(88vh - 40px);
  max-height: 425px;
  width: 1px;
  background-color: var(--grey);
  opacity: 0.6;
  overflow: hidden;
  z-index: 9999;
`;

const ProgressLine = styled.div`
  position: absolute;
  height: 100%;
  top: -100%;
  width: 1px;
  background-color: var(--accent);
  left: 0;
`;

const Progress = ({ contentHeight, isFirstMount }) => {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const handleScroll = throttle(() => {
      const scrollTop = window.scrollY;
      const docHeight = document.body.offsetHeight;
      const winHeight = window.innerHeight;
      const scrollPercent = scrollTop / (docHeight - winHeight);
      const percentComplete = Math.round(scrollPercent * 100);

      setProgress(clamp(+percentComplete.toFixed(2), -2, 104));
    }, 20);

    if (contentHeight) {
      window.addEventListener('scroll', handleScroll);
      window.addEventListener('resize', handleScroll);
      return () => {
        window.removeEventListener('scroll', handleScroll);
        window.removeEventListener('resize', handleScroll);
      };
    }
  }, [contentHeight]);

  return (
    <Side isFirstMount={isFirstMount} orientation="right" tabIndex={-1}>
      <ProgressContainer tabIndex={-1}>
        <Trackline aria-hidden="true">
          <ProgressLine style={{ transform: `translateY(${progress}%)` }} />
        </Trackline>
      </ProgressContainer>
    </Side>
  );
};

Progress.propTypes = {
  isFirstMount: PropTypes.bool,
  contentHeight: PropTypes.array,
};

export default Progress;
