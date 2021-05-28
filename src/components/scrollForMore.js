import React from 'react';
import styled from 'styled-components';

const LineWrap = styled.div`
  width: 1px;
  height: 60px;
  position: absolute;
  bottom: 10px;
  left: 0;
  right: 0;
  margin: 0 auto;

  .scroll-txt {
    transform: rotate(-90deg);
    display: block;
    font-family: var(--font-mono);
    font-size: var(--fz-xxs);
    letter-spacing: 0.1em;
  }
`;

const Line = styled.span`
  width: 100%;
  height: 100%;
  display: block;
  background: linear-gradient(to bottom, var(--headline) 50%, rgba(255, 255, 255, 0) 50%) 0 -60px;
  background-size: 100% 200%;
  animation: scrolldown 2.2s cubic-bezier(0.76, 0, 0.3, 1) forwards infinite;

  @keyframes scrolldown {
    0% {
      background-position: 0 -60px;
    }
    75% {
      background-position: 0 0;
    }
    100% {
      background-position: 0 60px;
    }
`;

const ScrollForMore = () => (
  <LineWrap>
    <span className="scroll-txt">Scroll</span>
    <Line />
  </LineWrap>
);

export default ScrollForMore;
