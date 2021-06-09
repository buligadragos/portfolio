import React from 'react';
import Particles from 'react-tsparticles';
import codeSVG from '../images/map.svg';
import styled from 'styled-components';
import useWindowDimensions from '../hooks/getWindowDimensions';

if (typeof window !== 'undefined') {
  require('pathseg');
}

const StyledParticleContainer = styled.div`
  #tsparticles {
    height: 100%;
    position: absolute;
    width: 100%;
    left: 0;
  }
`;

const HeroMap = () => {
  const { width } = useWindowDimensions();

  let x;
  let y;
  let scale;
  let lim;
  let val;

  switch (true) {
    case (width >= 2000):
      x = width / 46;
      y = width / 70;
      scale = 0.6;
      lim = 500;
      val = 200;
      break;
    case (width >= 1300):
      x = width / 36;
      y = 20;
      scale = 0.6;
      lim = 500;
      val = 200;
      break;
    case (width >= 850):
      x = width / 26;
      y = 35;
      scale = 0.4;
      lim = 500;
      val = 200;
      break;
    case (width >= 500):
      x = width / 25;
      y = 60;
      scale = 0.3;
      lim = 100;
      val = 80;
      break;
    case (width >= 400):
      x = width / 20;
      y = 70;
      scale = 0.2;
      lim = 100;
      val = 80;
      break;
    case (width > 330):
      x = width / 25;
      y = 73;
      scale = 0.2;
      lim = 100;
      val = 80;
      break;
  }

  return (
    <>
      <StyledParticleContainer>
        <Particles
          id="tsparticles"
          options={{
            detectRetina: false,
            fpsLimit: 30,
            interactivity: {
              detectsOn: 'window',
              events: {
                onClick: {
                  enable: false,
                  mode: 'push',
                },
                onDiv: {
                  elementId: 'repulse-div',
                  enable: false,
                  mode: 'repulse',
                },
                onHover: {
                  enable: true,
                  mode: 'bubble',
                  parallax: {
                    enable: false,
                    force: 2,
                    smooth: 10,
                  },
                },
                resize: true,
              },
              modes: {
                bubble: {
                  distance: 60,
                  duration: 2,
                  opacity: 8,
                  size: 6,
                  speed: 3,
                },
                connect: {
                  distance: 80,
                  lineLinked: {
                    opacity: 0.5,
                  },
                  radius: 60,
                },
                grab: {
                  distance: 400,
                  lineLinked: {
                    opacity: 1,
                  },
                },
                push: {
                  quantity: 4,
                },
                remove: {
                  quantity: 2,
                },
                repulse: {
                  distance: 200,
                  duration: 0.4,
                },
                slow: {
                  active: false,
                  radius: 0,
                  factor: 1,
                },
              },
            },
            particles: {
              color: {
                value: ['#2176FF', '#FDCA40', '#EA2B1F'],
              },
              lineLinked: {
                blink: false,
                color: 'random',
                consent: false,
                distance: 50,
                enable: true,
                opacity: 0.8,
                width: 1,
              },
              move: {
                attract: {
                  enable: false,
                  rotate: {
                    x: 600,
                    y: 1200,
                  },
                },
                bounce: false,
                direction: 'none',
                enable: true,
                outMode: 'bounce',
                random: false,
                speed: 0.5,
                straight: false,
              },
              number: {
                density: {
                  enable: false,
                  area: 2000,
                },
                limit: lim,
                value: val,
              },
              opacity: {
                animation: {
                  enable: true,
                  minimumValue: 0.3,
                  speed: 2,
                  sync: false,
                },
                random: false,
                value: 0.8,
              },
              size: {
                animation: {
                  enable: false,
                  minimumValue: 0.1,
                  speed: 40,
                  sync: false,
                },
                random: true,
                value: 1,
              },
            },
            polygon: {
              draw: {
                enable: false,
                lineColor: 'rgba(255,255,255,0.2)',
                lineWidth: 1,
              },
              enable: true,
              move: {
                radius: 10,
              },
              position: {
                x: x,
                y: y,
              },
              inlineArrangement: 'equidistant',
              scale: scale,
              type: 'inline',
              url: codeSVG,
            },
            background: {
              repeat: 'no-repeat',
              size: 'cover',
            },
          }}
        />
      </StyledParticleContainer>
    </>
  );
};

export default HeroMap;
