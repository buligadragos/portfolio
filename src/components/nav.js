import React, { useState, useEffect } from 'react';
import { Link } from 'gatsby';
import PropTypes from 'prop-types';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import styled from 'styled-components';
import { loaderDelay } from '@utils';
import { useScrollDirection } from '@hooks';
import { IconLogo } from '@components/icons';
import { ThemeContext, Toggle } from '@components';

const StyledHeader = styled.header`
  position: fixed;
  z-index: 10;
  display: flex;
  align-items: center;
  width: 100vw;
  height: 4rem;
`;

const StyledLogo = styled.div`
  position: absolute;
  left: 50%;
  transform: translateX(-50%);

  svg {
    fill: var(--headline);
    transition: var(--transition);
    width: 170px;
    height: 42px;
  }
`;

const RightWrapper = styled.div`
  right: 0;
  display: flex;
  flex-direction: column;
  width: auto;
  height: auto;
  font-family: var(--font-mono);
  line-height: normal;
  font-size: 0.8rem;
  text-transform: uppercase;
  color: var(--headline);
  transition: all 0.5s ease;
  label {
    cursor: pointer;
    padding-bottom: 0.3rem;

    @media (max-width: 550px) {
      padding-bottom: inherit;
    }
    input {
      display: none;
    }
  }
  svg {
    width: 1.2rem;
    height: 1.2rem;
    color: var(--headline);
  }

  span {
    font-size: 0.8rem;
    text-transform: uppercase;
    color: var(--headline);

    @media (max-width: 550px) {
      display: none;
    }
  }
`;

const LeftWrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: auto;
  height: auto;
  font-family: var(--font-mono);
  color: var(--headline);
  line-height: normal;
  font-size: 0.8rem;
  text-transform: uppercase;
  transition: all 0.5s ease;

  span {
    transition: all 0.5s ease;
    @media (max-width: 550px) {
      display: none;
    }
  }

  .city {
    padding-bottom: 0.6rem;
    padding-top: 0.3rem;
  }

  .getlocation {
    transform: translateY(50px);
    position: absolute;
    top: 1.5rem;
    cursor: pointer;
    color: var(--accent);
  }

  :hover .city {
    transform: translateY(-100px);
  }
  :hover .getlocation {
    transform: translateY(0px);
  }
`;
const StyledClock = styled.time`
  .separator {
    animation: blinker 2s linear infinite;
  }

  @keyframes blinker {
    50% {
      opacity: 0;
    }
  }
`;

const StyledMenu = styled.div`
  position: relative;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  margin: 0 40px;
  display: flex;
  padding-top: 1.2rem;
  overflow: hidden;

  @media (max-width: 1080px) {
    margin: 0 20px;
  }

  @media (max-width: 550px) {
    padding-top: inherit;
  }
`;

const Nav = ({ isFirstMount }) => {
  const [isMounted, setIsMounted] = useState(!isFirstMount);
  const scrollDirection = useScrollDirection('down');
  const [scrolledToTop, setScrolledToTop] = useState(true);
  const { colorMode, setColorMode } = React.useContext(ThemeContext);
  const API_URL = process.env.GATSBY_WEATHER_API_URL;
  const API_KEY = process.env.GATSBY_WEATHER_API_KEY;

  const handleScroll = () => {
    setScrolledToTop(window.pageYOffset < 50);
  };

  useEffect(() => {
    const timeout = setTimeout(() => {
      setIsMounted(true);
    }, 100);

    window.addEventListener('scroll', handleScroll);

    return () => {
      clearTimeout(timeout);
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const timeout = isFirstMount ? loaderDelay : 0;
  const fadeDownClass = isFirstMount ? 'fadedown' : '';

  const [lat, setLat] = useState([45.749439]);
  const [long, setLong] = useState([21.227221]);
  const [weatherInfo, setweatherInfo] = useState({
    temperature: null,
  });

  useEffect(() => {
    if (process.env.NODE_ENV !== 'production') {
      return;
    }
    fetch(`${API_URL}weather?lat=${lat}&lon=${long}&appid=${API_KEY}&units=metric`)
      .then(response => response.json())
      .then(json => {
        const { main, name } = json;
        setweatherInfo({
          temperature: main.temp,
          city: name,
        });
      });
  }, [lat, long]);

  // Ora
  const serverTime = 'Europe/Bucharest';
  const localTime = Intl.DateTimeFormat().resolvedOptions().timeZone;

  const [loc, setLoc] = useState([serverTime]);
  const [today, setDate] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => {
      setDate(new Date());
    }, 60 * 1000);
    return () => {
      clearInterval(timer);
    };
  }, []);

  const day = today.toLocaleDateString('en-US', { weekday: 'long' });
  const time = today.toLocaleTimeString('en-US', {
    timeZone: loc,
    hour: 'numeric',
    hour12: false,
    minute: 'numeric',
  });

  const HHMM = time.split(':');
  const hour = HHMM[0];
  const minutes = HHMM[1];

  const handleLocation = () => {
    navigator.geolocation.getCurrentPosition(function(position) {
      setLat(position.coords.latitude);
      setLong(position.coords.longitude);
    });
    setLoc(localTime);
  };
  return (
    <StyledHeader scrollDirection={scrollDirection} scrolledToTop={scrolledToTop}>
      <TransitionGroup component={null}>
        {isMounted && (
          <CSSTransition classNames={fadeDownClass} timeout={timeout}>
            <StyledMenu>
              <LeftWrapper>
                <span
                  tabIndex={0}
                  role="button"
                  className="city"
                  onClick={handleLocation}
                  onKeyDown={handleLocation}>
                  {weatherInfo.city}
                </span>
                <span
                  tabIndex={0}
                  role="button"
                  className="getlocation"
                  onClick={handleLocation}
                  onKeyDown={handleLocation}>
                  GET MY LOCATION
                </span>

                <StyledClock>
                  <span>{day}</span> <span>{hour}</span>
                  <span className="separator">:</span>
                  <span>{minutes}</span>
                </StyledClock>
              </LeftWrapper>

              <RightWrapper>
                <label>
                  <input
                    type="checkbox"
                    onChange={ev => {
                      setColorMode(ev.target.checked ? 'dark' : 'light');
                    }}
                    checked={colorMode === 'dark'}
                  />
                  {colorMode === 'dark' ? <Toggle name="sun" /> : <Toggle name="moon" />}
                </label>
                <span>{Math.round(weatherInfo.temperature)}℃</span>
              </RightWrapper>
            </StyledMenu>
          </CSSTransition>
        )}
      </TransitionGroup>

      <TransitionGroup component={null}>
        {isMounted && (
          <CSSTransition classNames={fadeDownClass} timeout={timeout}>
            <StyledLogo className="logo" tabIndex="-1">
              <Link to="/" aria-label="home">
                <IconLogo />
              </Link>
            </StyledLogo>
          </CSSTransition>
        )}
      </TransitionGroup>
    </StyledHeader>
  );
};

Nav.propTypes = {
  isFirstMount: PropTypes.bool,
};

export default Nav;
