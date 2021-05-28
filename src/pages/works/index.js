import React, { useRef, useEffect } from 'react';
import { graphql, Link } from 'gatsby';
import PropTypes from 'prop-types';
import { Helmet } from 'react-helmet';
import styled from 'styled-components';
import { srConfig } from '@config';
import sr from '@utils/sr';
import { Icon, IconHome } from '@components/icons';
import { motion } from 'framer-motion';
import { mixins } from '@styles';

const StyledHeader = styled.div`
  text-align: center;
`;

const StyledTableContainer = styled.div`
  margin: 100px -20px;

  @media (max-width: 768px) {
    margin: 50px -10px;
  }

  table {
    width: 100%;
    border-collapse: collapse;

    .hide-on-mobile {
      @media (max-width: 768px) {
        display: none;
      }
    }

    tbody tr {
      &:hover,
      &:focus {
        background-color: var(--hoverbg);
      }
    }

    th,
    td {
      padding: 10px;
      text-align: left;

      &:first-child {
        padding-left: 20px;

        @media (max-width: 768px) {
          padding-left: 10px;
        }
      }
      &:last-child {
        padding-right: 20px;

        @media (max-width: 768px) {
          padding-right: 10px;
        }
      }

      svg {
        width: 20px;
        height: 20px;
      }
    }

    tr {
      cursor: default;

      td:first-child {
        border-top-left-radius: var(--border-radius);
        border-bottom-left-radius: var(--border-radius);
      }
      td:last-child {
        border-top-right-radius: var(--border-radius);
        border-bottom-right-radius: var(--border-radius);
      }
    }

    td {
      &.year {
        padding-right: 20px;

        @media (max-width: 768px) {
          padding-right: 10px;
          font-size: var(--fz-sm);
        }
      }

      &.title {
        padding-top: 15px;
        padding-right: 20px;
        color: var(--headline);
        font-size: var(--fz-xl);
        font-weight: 600;
        line-height: 1.25;
      }

      &.company {
        font-size: var(--fz-lg);
        white-space: nowrap;
      }

      &.tech {
        font-size: var(--fz-xxs);
        font-family: var(--font-mono);
        line-height: 1.5;
        .separator {
          margin: 0 5px;
        }
        span {
          display: inline-block;
        }
      }

      &.links {
        min-width: 70px;

        div {
          display: flex;
          align-items: center;

          a {
            ${mixins.flexCenter};
            flex-shrink: 0;
          }

          a + a {
            margin-left: 10px;
          }
        }
      }
    }
  }
`;

const StyledArchiveLink = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 80px auto 0;

  .archive-link {
    font-family: var(--font-sans);
    font-size: var(--fz-xl);
    &:after {
      bottom: 0.1em;
    }
  }

  .home-butt {
    ${mixins.svgButton};
  }

  .home-hid {
    transform: translate3d(0, 240%, 0);
  }

  a:hover .icons .home-visi {
    transform: translate3d(0, -240%, 0);
  }

  a:hover .icons .home-hid {
    transform: translate3d(0, 0, 0);
  }
`;

const Icons = styled.span`
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 2.077vw;
  height: 1.806vw;
  margin-left: 0.26vw;
  overflow: hidden;

  svg {
    position: absolute;
    transition: transform 0.7s cubic-bezier(0.4, 0, 0, 1);
  }

  @media (max-width: 550px) {
    margin-left: 2.26vw;
    width: 4.077vw;
    height: 3.806vw;
  }
`;

const WorksPage = ({ data }) => {
  const projects = data.allMarkdownRemark.edges;
  const revealTitle = useRef(null);
  const revealTable = useRef(null);
  const revealProjects = useRef([]);
  const revealButton = useRef([]);
  const transition = { duration: 2.0, ease: [0.6, 0.01, -0.05, 0.9] };

  useEffect(() => {
    sr.reveal(revealTitle.current, srConfig());
    sr.reveal(revealTable.current, srConfig(200, 0));
    sr.reveal(revealButton.current, srConfig(600, 0));
    revealProjects.current.forEach((ref, i) => sr.reveal(ref, srConfig(i * 10)));
  }, []);

  useEffect(() => {
    window.scrollTo({
      top: 0,
      left: 0,
    });
  }, []);

  return (
    <>
      <Helmet title="Archive" />

      <motion.main
        initial={{
          opacity: 0,
        }}
        animate={{
          opacity: 1,
          transition: { ...transition },
        }}>
        <StyledHeader ref={revealTitle}>
          <h1 className="big-heading">Archive</h1>
          <p className="subtitle">A big list of things I’ve worked on</p>
        </StyledHeader>

        <StyledTableContainer ref={revealTable}>
          <table>
            <thead>
              <tr>
                <th>Year</th>
                <th>Title</th>
                <th className="hide-on-mobile">Made at</th>
                <th className="hide-on-mobile">Built with</th>
                <th>Link</th>
              </tr>
            </thead>
            <tbody>
              {projects.length > 0 &&
                projects.map(({ node }, i) => {
                  const { date, github, external, title, tech, company } = node.frontmatter;
                  return (
                    <tr key={i} ref={el => (revealProjects.current[i] = el)}>
                      <td className="overline year">{`${new Date(date).getFullYear()}`}</td>

                      <td className="title">{title}</td>

                      <td className="company hide-on-mobile">
                        {company ? <span>{company}</span> : <span>—</span>}
                      </td>

                      <td className="tech hide-on-mobile">
                        {tech.length > 0 &&
                          tech.map((item, i) => (
                            <span key={i}>
                              {item}
                              {''}
                              {i !== tech.length - 1 && <span className="separator">&middot;</span>}
                            </span>
                          ))}
                      </td>

                      <td className="links">
                        <div>
                          {external && (
                            <a
                              href={external}
                              aria-label="External Link"
                              target="_blank"
                              rel="noopener noreferrer">
                              <Icon name="External" />
                            </a>
                          )}
                          {github && (
                            <a
                              href={github}
                              aria-label="GitHub Link"
                              target="_blank"
                              rel="noopener noreferrer">
                              <Icon name="GitHub" />
                            </a>
                          )}
                        </div>
                      </td>
                    </tr>
                  );
                })}
            </tbody>
          </table>
        </StyledTableContainer>
        <StyledArchiveLink ref={revealButton}>
          <Link className="home-butt" to="/">
            Back to home
            <Icons className="icons">
              <IconHome className="home-visi" />
              <IconHome className="home-hid" />
            </Icons>
          </Link>
        </StyledArchiveLink>
      </motion.main>
    </>
  );
};
WorksPage.propTypes = {
  location: PropTypes.object.isRequired,
  data: PropTypes.object.isRequired,
};

export default WorksPage;

export const pageQuery = graphql`
  {
    allMarkdownRemark(
      filter: { fileAbsolutePath: { regex: "/archive/" } }
      sort: { fields: [frontmatter___date], order: DESC }
    ) {
      edges {
        node {
          frontmatter {
            date
            title
            tech
            github
            external
            company
          }
          html
        }
      }
    }
  }
`;
