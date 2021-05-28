import { css } from 'styled-components';

const mixins = {
  flexCenter: css`
    //verified
    display: flex;
    justify-content: center;
    align-items: center;
  `,

  flexBetween: css`
    //verified
    display: flex;
    justify-content: space-between;
    align-items: center;
  `,

  link: css`
    //verified
    display: inline-block;
    text-decoration: none;
    text-decoration-skip-ink: auto;
    color: inherit;
    position: relative;
    transition: var(--transition);
    cursor: pointer;
    &:hover,
    &:active,
    &:focus {
      color: var(--accent);
      outline: 0;
    }
  `,

  inlineLink: css`
    //verified
    display: inline-block;
    text-decoration: none;
    text-decoration-skip-ink: auto;
    position: relative;
    transition: var(--transition);
    cursor: ne-resize;
    color: var(--accent);
    &:hover,
    &:focus,
    &:active {
      color: var(--accent);
      outline: 0;
      &:after {
        width: 100%;
      }
      & > * {
        color: var(--accent) !important;
        transition: var(--transition);
      }
    }
    &:after {
      content: '';
      display: block;
      width: 0;
      height: 1px;
      position: relative;
      bottom: 0.37em;
      background-color: var(--accent);
      transition: var(--transition);
      opacity: 0.5;
    }
  `,

  svgButton: css`
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
  `,

  fancyList: css`
    //verified
    padding: 0;
    margin: 0;
    list-style: none;
    font-size: var(--fz-lg);
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
  `,

  resetList: css`
    //verified
    list-style: none;
    padding: 0;
    margin: 0;
  `,
};

export default mixins;
