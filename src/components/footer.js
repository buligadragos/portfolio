import React from 'react';
import styled from 'styled-components';
import { Icon } from '@components/icons';
import { socialMedia } from '@config';

const StyledFooter = styled.footer`
  position: relative;
  font-family: var(--font-mono);
  font-size: var(--fz-xs);
`;

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

const StyledCredit = styled.div`
  max-width: 1150px;
  padding: 0px 1rem;
  margin: 0px auto;
  .middle {
  }

  .links {
    display: flex;
    -moz-box-align: center;
    align-items: center;
  }
`;

const StyledFooterContent = styled.footer`
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
    .site-info {
      margin-top: 10px;
    }
  }

  .copyright {
    text-align: left;
    justify-content: flex-start;
    flex-grow: 1;
    flex-basis: 25%;
  }

  .middle {
    text-align: center;
    justify-content: center;
  }

  .site-info {
    text-align: right;
    justify-content: flex-end;
    flex-grow: 1;
    flex-basis: 25%;
    position: relative;
  }

  .info-btn {
    cursor: pointer;
  }

  .info-btn:hover {
    color: var(--accent);
    transition: color 0.4s;
  }

  .info {
    background-color: var(--loaderbg);
    border: 1px solid var(--grey);
    bottom: calc(100% + 10px);
    left: calc(100% + 20px);
    opacity: 0;
    padding: 20px 30px;
    transition: 0.3s ease-out;
    visibility: hidden;
    width: 240px;
    text-align: center;

    h5 {
      color: var(--headline);
      font-size: var(--fz-xs);
      font-family: var(--font-mono);
      font-weight: 400;
      margin: 0 0 0 0;
    }
  }

  .inner-info {
    position: relative;
    display: inline;
  }

  .inner-info:hover .info {
    opacity: 1;
    visibility: visible;
  }

  .info,
  .info:before {
    position: absolute;
    -webkit-transform: translateX(-100%);
    transform: translateX(-100%);
  }

  .info:before {
    border-left: 8px solid transparent;
    border-right: 8px solid transparent;
    border-top: 8px solid var(--grey);
    bottom: -8px;
    content: '';
    height: 0;
    left: calc(100% - 25px);
    width: 0;
  }

  @media (max-width: 768px) {
    .info,
    .info:before {
      left: 50%;
      -webkit-transform: translateX(-50%);
      transform: translateX(-50%);
    }
  }

  .tool {
    align-items: center;
    display: flex;
    margin-top: 15px;
    text-align: left;
  }

  .img {
    align-items: center;
    background-color: var(--shadow);
    border-radius: 100px;
    display: flex;
    height: 40px;
    justify-content: center;
    margin-right: 10px;
    width: 40px;
  }

  .img img {
    height: 24px;
    -o-object-fit: contain;
    object-fit: contain;
    width: 24px;
  }

  .tag {
    display: inline-block;
    font-size: var(--fz-xs);
    font-weight: 400;
    opacity: 0.6;
  }
`;

const Footer = () => (
  <StyledFooter>
    <StyledCredit>
      <StyledFooterContent>
        <div className="copyright">
          <span>Portfolio 2021</span>
        </div>
        <div className="middle">
          <span>Copyright © 2021 buligadragos. All rights reserved</span>
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
        <div className="site-info">
          <div className="inner-info">
            <span className="info-btn">Info</span>
            <div className="info">
              <h4>Crafted with ❤ using</h4>
              <div className="all-tools">
                <div className="tool xd">
                  <div className="img">
                    <img src={`xd.png`} alt="Adobe XD"></img>
                  </div>
                  <div className="content">
                    <h5 className="tag-title">Adobe XD</h5>
                    <span className="tag">Design tool</span>
                  </div>
                </div>
                <div className="tool gatsby">
                  <div className="img">
                    <img src={`gatsby.png`} alt="Gatsbyjs (React)"></img>
                  </div>
                  <div className="content">
                    <h5 className="tag-title">Gatsbyjs (React)</h5>
                    <span className="tag">Frontend</span>
                  </div>
                </div>
                <div className="tool gsap">
                  <div className="img">
                    <img src={`gsap.png`} alt="GSAP"></img>
                  </div>
                  <div className="content">
                    <h5 className="tag-title">GSAP</h5>
                    <span className="tag">Animation</span>
                  </div>
                </div>
                <div className="tool loco">
                  <div className="img">
                    <img src={`loco.png`} alt="Locomotive"></img>
                  </div>
                  <div className="content">
                    <h5 className="tag-title">Locomotive</h5>
                    <span className="tag">Smooth scroll</span>
                  </div>
                </div>
                <div className="tool vercel">
                  <div className="img">
                    <img src={`vercel.png`} alt="Vercel"></img>
                  </div>
                  <div className="content">
                    <h5 className="tag-title">Vercel</h5>
                    <span className="tag">Hosting</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </StyledFooterContent>
    </StyledCredit>
  </StyledFooter>
);

export default Footer;
