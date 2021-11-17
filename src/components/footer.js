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
  }

  .status-btn:hover {
    color: var(--accent);
    transition: all 0.4s ease-out;
  }

  .uptime {
    width: 8px;
    height: 8px;
  }

  .status-btn {
    margin-left: 8px;
  }

  .hint {
    position: relative;
    display: inline-block;
  }

  .hint:before,
  .hint:after {
    position: absolute;
    opacity: 0;
    z-index: 1000000;
    -webkit-transition: 0.3s ease;
    -moz-transition: 0.3s ease;
    transition: 0.3s ease;
    pointer-events: none;
    overflow-x: hidden;
  }

  .hint:hover:before,
  .hint:hover:after {
    opacity: 1;
  }

  .hint:before {
    content: '';
    position: absolute;
    border: 6px solid transparent;
    position: absolute;
  }

  .hint:after {
    content: attr(data-hint);
    background: var(--tooltip);
    font-family: var(--font-mono);
    color: var(--text);
    padding: 8px 10px;
    font-size: 12px;
    white-space: nowrap;
    box-shadow: 1px 1px 20px rgba(188, 108, 98, 0.3);
    border-radius: 100px;
  }

  .hint--top:before {
    bottom: 27px;
    left: 50%;
    transform: translateX(-50%);
    margin: 0 0 -18px 0;
    border-top-color: var(--tooltip);
  }

  .hint--top:after {
    bottom: 27px;
    left: 50%;
    transform: translateX(-50%);
    margin: 0 0 -6px -10px;
  }

  .hint--top:hover:before {
    margin-bottom: -10px;
  }

  .hint--top:hover:after {
    margin-bottom: 2px;
  }

  @media (max-width: 1280px) {
    .hint--top:hover:after,
    .hint--top:hover:before {
      display: none;
    }
  }
`;

const StyledClock = styled.time`
  .separator {
    animation: blinker 2s linear infinite;
  }

  .icon.baseline svg {
    top: 0.15em;
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

  const [UpdatedAt, setUpdatedAt] = useState({
    timeupdated: null,
  });

  useEffect(() => {
    const timer = setInterval(() => {
      setDate(new Date());
    }, 1000);
    return () => {
      clearInterval(timer);
    };
  }, []);

  useEffect(() => {
    if (process.env.NODE_ENV !== 'production') {
      return;
    }
    function getAPIDataTime() {
      fetch('https://api.github.com/repos/buligadragos/UpTime/actions/runs')
        .then(response => response.json())
        .then(json => {
          const { updated_at } = json.workflow_runs[0];

          setUpdatedAt({
            timeupdated: new Date(updated_at).toLocaleString(),
          });
        })
        .catch(e => console.error(e));
    }

    getAPIDataTime();
    const interval = setInterval(() => {
      getAPIDataTime();
    }, 300000);
    return () => {
      clearInterval(interval);
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
          <span>Buliga Dragos © 2021. All Rights Reserved.</span>
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
          <a
            href="https://status.buligadragos.ro/"
            data-hint={`Last updated at ${UpdatedAt.timeupdated}`}
            className="hint hint--top">
            <DotUpTime statusApiId={999} />
            <span className="status-btn">Status</span>
          </a>
        </div>
      </StyledFooterContent>
    </StyledFooter>
  );
};

export default Footer;
