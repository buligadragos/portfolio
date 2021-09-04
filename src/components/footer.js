import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { Icon } from '@components/icons';
import { socialMedia } from '@config';
import DotUpTime from '../components/icons/uptime';
import IconGlobe from './icons/globe';

const StyledSocialLinks = styled.div`
  display: none;

  @media (max-width: 768px) {
    display: block;
    width: 100%;
    max-width: 270px;
    margin: 10px auto 0;
    color: var(--grey);
  }

  ul {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0;
    margin: 0;
    list-style: none;

    a {
      padding: 10px;

      svg {
        width: 20px;
        height: 20px;
      }
    }
  }
`;

const StyledFooter = styled.footer`
  max-width: 1150px;
  padding: 0px 1rem;
  margin: 0px auto;
  position: relative;
  font-family: var(--font-mono);
  font-size: var(--fz-xs);
  color: var(--headline);
  .middle {
  }

  .links {
    display: flex;
    -moz-box-align: center;
    align-items: center;
  }
`;

const StyledFooterContent = styled.div`
  padding: 2rem 0.5rem;
  display: flex;
  -moz-box-align: center;
  align-items: center;
  -moz-box-pack: justify;
  justify-content: space-between;
  border-top: 1px solid rgb(53, 57, 69);

  @media (max-width: 768px) {
    flex-direction: column;

    .middle {
      margin-top: 10px;
    }
    .site-status {
      margin-top: 10px;
    }
  }

  .copyright {
    text-align: left;
    justify-content: flex-start;
    flex-grow: 1;
    flex-basis: 25%;
    align-items: center;

    svg {
      width: 1em;
      height: 1em;
    }
  }

  .middle {
    text-align: center;
    justify-content: center;
  }

  .site-status {
    text-align: right;
    justify-content: flex-end;
    flex-grow: 1;
    flex-basis: 25%;
    position: relative;
    cursor: pointer;
  }

  .status-btn:hover {
    background: linear-gradient(90deg, #ff7f51, #e85333, #a02817);
    -webkit-background-clip: text;
    background-clip: text;
    -webkit-text-fill-color: transparent;
    outline: 0;
    transition: all 0.4s ease-out;
  }

  .uptime {
    width: 8px;
    height: 8px;
  }

  .status-btn {
    margin-left: 8px;
  }
`;

const StyledClock = styled.time`
  .separator {
    animation: blinker 2s linear infinite;
  }

  .icon.baseline svg {
    top: 0.2em;
    position: relative;
  }
  .icon {
    display: inline-flex;
    align-self: center;
  }

  @keyframes blinker {
    50% {
      opacity: 0;
    }
  }
`;

const Footer = () => {
  const serverTime = 'Europe/Bucharest';
  const [today, setDate] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => {
      setDate(new Date());
    }, 1000);
    return () => {
      clearInterval(timer);
    };
  }, []);

  const time = today.toLocaleTimeString('en-US', {
    timeZone: serverTime,
    hour: 'numeric',
    hour12: false,
    minute: 'numeric',
  });

  const HHMM = time.split(':');
  const hour = HHMM[0];
  const minutes = HHMM[1];

  return (
    <StyledFooter data-scroll-section>
      <StyledFooterContent>
        <div className="copyright">
          <StyledClock>
            <div className="icon baseline">
              <IconGlobe />
            </div>{' '}
            <span className="time-location">Romania</span> <span>[{hour}</span>
            <span className="separator">:</span>
            <span>{minutes}]</span>
          </StyledClock>
        </div>

        <div className="middle">
          <span>© 2021 Buliga Dragos. All rights reserved</span>
        </div>
        <StyledSocialLinks>
          <ul>
            {socialMedia &&
              socialMedia.map(({ name, url }, i) => (
                <li key={i}>
                  <a href={url} aria-label={name}>
                    <Icon name={name} />
                  </a>
                </li>
              ))}
          </ul>
        </StyledSocialLinks>
        <div className="site-status">
          <DotUpTime />
          <span className="status-btn">Status</span>
        </div>
      </StyledFooterContent>
    </StyledFooter>
  );
};

export default Footer;
