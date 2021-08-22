import React from 'react';
import styled, { keyframes } from 'styled-components';

const Pulse = keyframes`
  0% { opacity:0.5 }
  70% { opacity:0; transform:scale(2.5) }
  100% { opacity:0 }
`;

const Uptime = styled.div`
  width: 12px;
  height: 12px;
  display: inline-block;
  border-radius: 50%;
  color: #3bd671;
  background: #3bd671;
  position: relative;
  -ms-transform: none;
  transform: none;

  ::after {
    content: '';
    width: 100%;
    height: 100%;
    position: absolute;
    background: currentColor;
    animation: ${Pulse} 2s infinite;
    opacity: 1;
    border-radius: 50%;
    top: 0;
    left: 0;
  }
`;

const DotUpTime = () => <Uptime className="uptime" />;

export default DotUpTime;
