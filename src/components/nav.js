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

  span {
    @media (max-width: 550px) {
      display: none;
    }
  }

  .city {
    margin-bottom: 0.3rem;
    cursor: pointer;
  }

  .nav-temp {
    text-decoration: none;
    justify-self: start;
    display: flex;
    color: var(--headline);
  }
  .nav-temp svg {
    width: 1.2em;
    margin-right: 0.5ch;
  }

  .nav-temp-extension::before {
    display: inline-block;
    content: ' — ';
    transform: translateX(-2ch);
    transition: all 0.6s ease;
  }

  .nav-temp-extension {
    display: inline-block;
    transform: translateX(-2ch);
    opacity: 0;
    transition: all 0.6s ease;
  }
  .city:hover {
    color: var(--accent);
    transition: all 0.6s ease;
  }
  .city:hover .nav-temp-extension {
    transform: translateX(0);
    opacity: 1;
    color: var(--accent);
    transition: all 0.6s ease;
  }
  .city:hover .nav-temp-extension:before {
    transform: translateX(0);
    transition: all 0.6s ease;
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

  const handleLocation = () => {
    navigator.geolocation.getCurrentPosition(function(position) {
      setLat(position.coords.latitude);
      setLong(position.coords.longitude);
    });
  };
  return (
    <StyledHeader scrollDirection={scrollDirection} scrolledToTop={scrolledToTop}>
      <TransitionGroup component={null}>
        {isMounted && (
          <CSSTransition classNames={fadeDownClass} timeout={timeout}>
            <StyledMenu>
              <LeftWrapper>
                <span
                  className="nav-temp city noselect"
                  tabIndex={0}
                  role="button"
                  onClick={handleLocation}
                  onKeyDown={handleLocation}>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    fill="currentColor"
                    viewBox="0 0 16 16">
                    <path d="M8 16s6-5.686 6-10A6 6 0 0 0 2 6c0 4.314 6 10 6 10zm0-7a3 3 0 1 1 0-6 3 3 0 0 1 0 6z" />
                  </svg>
                  {/* {weatherInfo.city} */}
                  TIMISOARA
                  <span className="nav-temp-extension noselect">(get my location)</span>
                </span>
                <span className="nav-temp noselect">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    fill="currentColor"
                    viewBox="0 0 16 16">
                    <path d="M8 14a1.5 1.5 0 1 0 0-3 1.5 1.5 0 0 0 0 3z" />
                    <path d="M8 0a2.5 2.5 0 0 0-2.5 2.5v7.55a3.5 3.5 0 1 0 5 0V2.5A2.5 2.5 0 0 0 8 0zM6.5 2.5a1.5 1.5 0 1 1 3 0v7.987l.167.15a2.5 2.5 0 1 1-3.333 0l.166-.15V2.5z" />
                  </svg>
                  {Math.round(weatherInfo.temperature)}℃
                </span>
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
