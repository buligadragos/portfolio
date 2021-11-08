import React, { useState, useEffect } from 'react';
import styled, { keyframes } from 'styled-components';
import PropTypes from 'prop-types';

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
  position: relative;
  -ms-transform: none;
  transform: none;
  ${props => {
    if (props.status === 'up') {
      return `
            background-color: #3bd671;
            color: #3bd671;
        `;
    }
    if (props.status === 'down') {
      return `
            background-color: #eb3b5a;
            color: #eb3b5a;
        `;
    }

    if (props.status === 'degraded') {
      return `
            background-color: #f7b731;
            color: #f7b731;
        `;
    }
    if (props.status === 'partial') {
      return `
            background-color: #ff8800;
            color: #ff8800;
        `;
    }
  }}

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

const DotUpTime = ({ statusApiId }) => {
  let numberOfDown = 0;
  let numberOfDegraded = 0;

  const [StatusInfo, setStatusInfo] = useState({
    status: null,
  });

  const [OverallStatusInfo, setOverallStatusInfo] = useState(null);

  useEffect(() => {
    // if (process.env.NODE_ENV !== 'production') {
    //   return;
    // }
    if (statusApiId !== 999) {
      fetch('https://raw.githubusercontent.com/buligadragos/UpTime/master/history/summary.json')
        .then(response => response.json())
        .then(json => {
          const { status } = json[statusApiId];
          setStatusInfo({
            status: status,
          });
        })
        .catch(e => console.error(e));
    } else if (statusApiId === 999) {
      fetch('https://raw.githubusercontent.com/buligadragos/UpTime/master/history/summary.json')
        .then(response => response.json())
        .then(json => {
          for (let i = 0; i < json.length; i++) {
            if (json[i].status === 'down') {
              numberOfDown++;
            }
            if (json[i].status === 'up') {
              numberOfDegraded++;
            }
          }
          if (numberOfDown === 0) {
            if (numberOfDegraded === 0) {
              setOverallStatusInfo('up');
            } else {
              setOverallStatusInfo('degraded');
            }
          } else if (numberOfDown === json.length - 1) {
            setOverallStatusInfo('down');
          } else {
            setOverallStatusInfo('partial');
          }
        })
        .catch(e => console.error(e));
    }
  }, []);

  return (
    <Uptime
      className="uptime"
      status={statusApiId === 999 ? OverallStatusInfo : StatusInfo.status}
    />
  );
};

DotUpTime.propTypes = {
  statusApiId: PropTypes.number,
};

export default DotUpTime;
