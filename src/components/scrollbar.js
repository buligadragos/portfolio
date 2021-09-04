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
  height: 135px;
  position: fixed;
  top: 50%;
  width: 2px;
  -webkit-transform: translate3d(-50%, -50%, 0);
  -moz-transform: translate3d(-50%, -50%, 0);
  -o-transform: translate3d(-50%, -50%, 0);
  -ms-transform: translate3d(-50%, -50%, 0);
  transform: translate3d(-50%, -50%, 0);
  z-index: 1;
  opacity: 1;
  margin-top: -14px;
  mix-blend-mode: difference;
  -webkit-transition: opacity 0.6s 0.9s, margin-top 0.6s 0.9s;
  -moz-transition: opacity 0.6s 0.9s, margin-top 0.6s 0.9s;
  -ms-transition: opacity 0.6s 0.9s, margin-top 0.6s 0.9s;
  -o-transition: opacity 0.6s 0.9s, margin-top 0.6s 0.9s;
  transition: opacity 1.6s 1.9s, margin-top 5.6s 5.9s;

  .bottomBar {
    left: 0;
    position: absolute;
    top: auto;
    width: 100%;
    bottom: 0;

    ::after {
      content: '';
      height: calc(100% - 20px);
      left: 0;
      position: absolute;
      top: auto;
      width: 100%;
      bottom: 0;
      background: rgba(255, 255, 255, 0.2);
    }

    ::before {
      content: '';
      height: 2px;
      left: 0;
      position: absolute;
      top: 8px;
      width: 100%;
      border-radius: 50%;
      background: var(--accent);
    }
  }
`;

const ProgressLine = styled.div`
  height: 0;
  left: 0;
  position: absolute;
  top: 0;
  width: 100%;
  background: var(--accent);
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
          <ProgressLine style={{ height: `${progress}%` }} />
          <div className="bottomBar" style={{ height: `calc(100% - ${progress}%)` }}></div>
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
