import { createGlobalStyle } from 'styled-components';
import Fonts from './fonts';
import TransitionStyles from './TransitionStyles';
import Noise from './noise';

const GlobalStyle = createGlobalStyle`
  ${Fonts};
  ${Noise};

  :root {
    --font-sans: 'Josefin Sans', 'San Francisco', 'SF Pro Text', -apple-system, system-ui, sans-serif;
    --font-mono: 'Lato', 'Fira Code', 'Fira Mono', 'Roboto Mono', monospace;

    --fz-xxs: 12px;
    --fz-xs: 13px;
    --fz-sm: 14px;
    --fz-md: 16px;
    --fz-lg: 18px;
    --fz-xl: 20px;
    --fz-xxl: 22px;
    --fz-heading: 32px;

    --border-radius: 4px;
    --nav-height: 100px;
    --nav-scroll-height: 60px;

    --tab-height: 42px;
    --tab-width: 120px;

    --toggler-size: 2rem;
    --toggler-icon-size: calc(var(--toggler-size) - var(--toggler-size)/2.5);

    --easing: cubic-bezier(0.645, 0.045, 0.355, 1);
    --transition: all 0.25s cubic-bezier(0.645, 0.045, 0.355, 1);
  }

  html {
    box-sizing: border-box;
    width: 100%;
    -ms-overflow-style: none;
    scrollbar-width: none;
  }

  *,
  *:before,
  *:after {
    box-sizing: inherit;
  }

  ::selection {
    background-color: var(--grey);
    color: var(--accent);
  }

  ::-webkit-scrollbar {
    -webkit-appearance: none;
    display: none;
  }

  :focus {
    outline: none;
  }

  body {
    margin: 0;
    width: 100%;
    min-height: 100%;
    overflow-x: hidden;
    -moz-osx-font-smoothing: grayscale;
    -webkit-font-smoothing: antialiased;
    background-color: var(--body);
    color: var(--text);
    font-family: var(--font-sans);
    font-size: 1rem;
    line-height: 1.3;
    transition: all 340ms ease-out 0s;

    @media (max-width: 480px) {
      font-size: var(--fz-md);
    }

    &.hidden {
      overflow: hidden;
    }

    &.blur {
      overflow: hidden;

      header {
        background-color: transparent;
      }

      #content > * {
        filter: blur(5px) brightness(0.7);
        transition: var(--transition);
        pointer-events: none;
        user-select: none;
      }
    }
  }

  #root {
    min-height: 100vh;
    display: grid;
    grid-template-rows: 1fr auto;
    grid-template-columns: 100%;
  }

  main {
    margin: 0 auto;
    width: 100%;
    max-width: 1600px;
    min-height: 100vh;
    padding: 200px 150px;

    @media (max-width: 1080px) {
      padding: 200px 100px;
    }
    @media (max-width: 768px) {
      padding: 150px 50px;
    }
    @media (max-width: 480px) {
      padding: 125px 25px;
    }

    &.fillHeight {
      padding: 0 150px;

      @media (max-width: 1080px) {
        padding: 0 100px;
      }
      @media (max-width: 768px) {
        padding: 0 50px;
      }
      @media (max-width: 480px) {
        padding: 0 25px;
      }
    }
  }

  section {
    margin: 0 auto;
    padding: 100px 0;
    max-width: 1000px;

    @media (max-width: 768px) {
      padding: 80px 0;
    }

    @media (max-width: 480px) {
      padding: 60px 0;
    }
  }

  h1,
  h2,
  h3,
  h4,
  h5,
  h6 {
    margin: 0 0 10px 0;
    font-weight: 600;
    color: var(--headline);
    line-height: 1.1;
  }

  .big-heading {
    margin: 0;
    font-size: clamp(40px, 8vw, 80px);
  }

  .medium-heading {
    margin: 0;
    font-size: clamp(20px, 8vw, 60px);
  }

  .numbered-heading {
    display: flex;
    align-items: center;
    position: relative;
    margin: 10px 0 40px;
    width: 100%;
    font-size: clamp(26px, 5vw, var(--fz-heading));
    white-space: nowrap;

    &:before {
      position: relative;
      bottom: 4px;
      counter-increment: section;
      content: '0' counter(section) '.';
      margin-right: 10px;
      color: var(--accent);
      font-family: var(--font-mono);
      font-size: clamp(var(--fz-md), 3vw, var(--fz-xl));
      font-weight: 400;

      @media (max-width: 480px) {
        margin-bottom: -3px;
        margin-right: 5px;
      }
    }

    &:after {
      content: '';
      display: block;
      position: relative;
      top: -5px;
      width: 300px;
      height: 1px;
      margin-left: 20px;
      background-color: var(--grey);

      @media (max-width: 1080px) {
        width: 200px;
      }
      @media (max-width: 768px) {
        width: 100%;
      }
      @media (max-width: 600px) {
        margin-left: 10px;
      }
    }
  }

  img,
  svg,
  .gatsby-image-wrapper {
    width: 100%;
    max-width: 100%;
    vertical-align: middle;
  }

  img[alt=""],
  img:not([alt]) {
    filter: blur(5px);
  }

  svg {
    width: 100%;
    height: 100%;
    fill: currentColor;
    vertical-align: middle;

    &.feather {
      fill: none;
    }
  }

  a {
    display: inline-block;
    text-decoration: none;
    text-decoration-skip-ink: auto;
    color: inherit;
    position: relative;
    transition: var(--transition);
    &:hover,
    &:focus {
      color: var(--accent);
    }
    &.inline-link {
      color: var(--accent);
      cursor: pointer;
      :before,
      :after {
       position: absolute;
       width: 100%;
       height: 1px;
       background: currentColor;
       top: 90%;
       left: 0;
       pointer-events: none;
      }

      :before {
       content: '';
       transform-origin: 100% 50%;
       transform: scale3d(0, 1, 1);
       transition: transform 0.3s;
      }

      :hover::before {
      transform-origin: 0% 50%;
      transform: scale3d(1, 1, 1);
      }

      svg {
        width: 1em;
        height: 1em;
        bottom: 8px;
        position: absolute;
        margin-left: 0.4vw;
      }
    }

    &[target='_blank'] {
      cursor: pointer;
    }
  }

  button {
    border: 0;
    border-radius: 0;
  }

  input, textarea {
    border-radius: 0;
    outline: 0;

    &:focus {
      outline: 0;
    }
    &:focus,
    &:active {
      &::placeholder {
        opacity: 0.5;
      }
    }
  }

  p {
    margin: 0 0 15px 0;

    &:last-child,
    &:last-of-type {
      margin: 0;
    }

    & > code {
      background-color: var(--accent);
      color: var(--white);
      font-size: var(--fz-sm);
      border-radius: var(--border-radius);
      padding: 0.3em 0.5em;
    }
  }

  ul {
    &.fancy-list {
      padding: 0;
      margin: 0;
      list-style: none;
      font-size: var(--fz-md);
      li {
        position: relative;
        padding-left: 30px;
        margin-bottom: 10px;
        &:before {
          content: '▹';
          position: absolute;
          left: 0;
          color: var(--accent);
        }
      }
    }
  }

  #logo {
    color: var(--accent);
  }

  .overline {
    color: var(--accent);
    font-family: var(--font-mono);
    font-size: var(--fz-md);
    font-weight: 400;
  }

  .subtitle {
    color: var(--accent);
    margin: 0 0 20px 0;
    font-size: var(--fz-md);
    font-family: var(--font-sans);
    font-weight: 400;
    line-height: 1.5;

    a {
      line-height: 1.5;
    }
  }

  .gatsby-image-outer-wrapper {
    height: 100%;
  }

  .svgbutton{
    color: var(--grey);
    background-color: transparent;
    border: 1px solid var(--grey);
    border-radius: var(--border-radius);
    font-size: var(--fz-lg);
    font-family: var(--font-sans);
    line-height: 1;
    text-decoration: none;
    cursor: pointer;
    transition: var(--transition);
    padding: 0.75rem 1rem;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;

    @media (max-width: 550px) {
      font-size: var(--fz-md);
    }
    svg line {
      stroke-width: 50;
      stroke: var(--grey);
    }

    svg {
      width: 20px;
      height: 20px;
    }

    &:hover,
    &:focus,
    &:active {
      color: var(--accent);
      border: 1px solid var(--accent);
      outline: none;
    }
    &:after {
      display: none !important;
    }
  }
  .svgicon-hide {
    transform: translate3d(0, 240%, 0);
  }

  a:hover .icons .svgicon-vis {
    transform: translate3d(0, -240%, 0);
  }

  a:hover .icons .svgicon-hide {
    transform: translate3d(0, 0, 0);
  }


  ${TransitionStyles};
`;

export default GlobalStyle;
