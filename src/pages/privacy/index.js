import React from 'react';
import { Link } from 'gatsby';
import PropTypes from 'prop-types';
import { Helmet } from 'react-helmet';
import styled from 'styled-components';
import { Icon } from '@components/icons';

const StyledHeader = styled.div`
  text-align: center;
  margin-bottom: 30px;
`;

const StyledText = styled.div`
  text-align: left;
  margin-bottom: 50px;

  h2 {
    font-family: var(--font-mono);
    font-size: var(--fz-md);
    text-transform: uppercase;
    margin-bottom: 20px;
  }
`;

const StyledHomeLink = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 0px auto 100px;

  .subtitle {
    font-family: var(--font-sans);
    font-size: var(--fz-xl);
  }
`;

const PrivacyPage = () => (
  <main>
    <Helmet title="Privacy" />
    <section data-scroll-section>
      <StyledHeader>
        <h1 className="big-heading">Privacy stuff.</h1>
      </StyledHeader>

      <StyledHomeLink>
        <Link to="/" className="subtitle inline-link">
          Back to home
          <Icon name="Home" />
        </Link>
      </StyledHomeLink>

      <StyledText>
        <h2 className="scarlet">PRIVACY POLICY</h2>
        <p>
          At Buliga Dragos, accessible from{' '}
          <a href="https://buligadragos.ro/" className="inline-link scarlet">
            buligadragos.ro
          </a>{' '}
          one of my main priorities is the privacy of my visitors. This Privacy Policy document
          contains types of information that is collected and recorded by Buliga Dragos and how I
          use it.{' '}
        </p>
      </StyledText>

      <StyledText>
        <p>
          If you have additional questions or require more information about my Privacy Policy, do
          not hesitate to contact me through email at{' '}
          <a href="mailto:hello@buligadragos.ro" className="inline-link scarlet">
            hello@buligadragos.ro
          </a>
          .
        </p>
      </StyledText>

      <StyledText>
        <h2 className="scarlet">Log Files</h2>
        <p>
          This website follows a standard procedure of using log files. These files log visitors
          when they visit websites. All hosting companies do this and a part of hosting services'
          analytics. The information collected by log files include internet protocol (IP)
          addresses, browser type, Internet Service Provider (ISP), date and time stamp,
          referring/exit pages, and possibly the number of clicks. These are not linked to any
          information that is personally identifiable. The purpose of the information is for
          analyzing trends, administering the site, tracking users' movement on the website, and
          gathering demographic information.
        </p>
      </StyledText>

      <StyledText>
        <h2 className="scarlet">Cookies and Web Beacons</h2>
        <p>
          Like any other website, buligadragos.ro uses 'cookies'. These cookies are used to store
          information including visitors' preferences, and the pages on the website that the visitor
          accessed or visited. The information is used to optimize the users' experience by
          customizing our web page content based on visitors' browser type and/or other information.
        </p>
      </StyledText>

      <StyledText>
        <h2 className="scarlet">Privacy Policies</h2>
        <p>
          Third-party ad servers or ad networks uses technologies like cookies, JavaScript, or Web
          Beacons that are used in their respective advertisements and links that appear on
          buligadragos.ro, which are sent directly to users' browser. They automatically receive
          your IP address when this occurs. These technologies are used to measure the effectiveness
          of their advertising campaigns and/or to personalize the advertising content that you see
          on websites that you visit. Note that buligadragos.ro has no access to or control over
          these cookies that are used by third-party advertisers.
        </p>
      </StyledText>

      <StyledText>
        <h2 className="scarlet">Third Pary Privacy Policies</h2>
        <p>
          buligadragos.ro's Privacy Policy does not apply to other advertisers or websites. Thus, I
          am advising you to consult the respective Privacy Policies of these third-party ad servers
          for more detailed information. It may include their practices and instructions about how
          to opt-out of certain options.
        </p>
      </StyledText>

      <StyledText>
        <h2 className="scarlet">Consent</h2>
        <p>By using this website, you hereby consent to my Privacy Policy.</p>
      </StyledText>
    </section>
  </main>
);
PrivacyPage.propTypes = {
  location: PropTypes.object.isRequired,
};

export default PrivacyPage;
