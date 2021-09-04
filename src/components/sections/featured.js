import React from 'react';
import { useStaticQuery, graphql, Link } from 'gatsby';
import { GatsbyImage, getImage } from 'gatsby-plugin-image';
import styled from 'styled-components';
import { Icon } from '@components/icons';
import DotUpTime from '../icons/uptime';

const StyledProjectsGrid = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0;

  a {
    position: relative;
    z-index: 1;
  }
`;

const StyledProject = styled.li`
  width: 100%;

  &:not(:last-of-type) {
    margin-bottom: 150px;
    @media (max-width: 768px) {
      margin-bottom: 100px;
    }
    @media (max-width: 480px) {
      margin-bottom: 100px;
    }
  }

  a {
    display: block;
  }

  .project-details {
    height: 100%;
    width: 100%;
    display: inline-block;
    padding-top: 20px;
  }

  .project-tech-list {
    display: flex;
    flex-wrap: wrap;
    position: relative;
    z-index: 2;
    padding: 0;
    list-style: none;

    li {
      margin: 0 20px 5px 0;
      background: linear-gradient(90deg, #ff7f51, #e85333, #a02817);
      -webkit-background-clip: text;
      background-clip: text;
      -webkit-text-fill-color: transparent;
      font-family: var(--font-mono);
      font-size: var(--fz-xs);
      white-space: nowrap;
    }

    @media (max-width: 768px) {
      margin: 10px 0;
      li {
        margin: 0 10px 5px 0;
      }
    }
  }

  .project-status {
    margin-right: 10px;
  }

  .right-side {
    float: right;
  }

  .left-side {
    float: left;
  }
`;

const El1 = styled.div``;

const El2 = styled.div`
  @media (max-width: 550px) {
    display: none;
  }
`;

const StyledProjectPreview = styled.div`
  display: grid;
  grid-template-columns: 75% 23.7%;
  grid-gap: 1.3%;

  @media (max-width: 550px) {
    grid-template-columns: 100%;
  }

  &:hover {
    .hovr:before,
    .hovl:before {
      opacity: 0.8;
    }

    .hovr:after,
    .hovl:after {
      opacity: 1;
      letter-spacing: 0.1em;
    }
  }

  .img {
    position: relative;
    z-index: 0;
    display: block;
    -webkit-box-shadow: 2px 2px 7px 2px var(--shadow);
    box-shadow: 2px 2px 7px 2px var(--shadow);
  }

  .hovr {
    position: absolute;
    width: 75%;
    height: 100%;
    top: 0;
    left: 0;
    z-index: 1;
    overflow: hidden;
    display: block;

    @media (max-width: 550px) {
      width: 100%;
    }
  }

  .hovl {
    position: absolute;
    width: 23.7%;
    height: 100%;
    top: 0;
    right: 0;
    z-index: 1;
    overflow: hidden;
    display: block;
  }

  .hovr:before,
  .hovl:before {
    content: '';
    width: calc(100% + 20px);
    height: calc(100% + 20px);
    top: -10px;
    left: -10px;
    background-color: var(--loaderbg);
    z-index: 1;
    display: block;
    position: absolute;
    -webkit-transform-origin: center center;
    transform-origin: center center;
    opacity: 0;
    will-change: opacity, transform;
    -webkit-transition: opacity 300ms cubic-bezier(0.25, 0.1, 0.25, 1) 0ms,
      -webkit-transform 300ms cubic-bezier(0.25, 0.1, 0.25, 1) 0ms;
    transition: transform 300ms cubic-bezier(0.25, 0.1, 0.25, 1) 0ms,
      opacity 300ms cubic-bezier(0.25, 0.1, 0.25, 1) 0ms,
      -webkit-transform 300ms cubic-bezier(0.25, 0.1, 0.25, 1) 0ms;
  }

  .hovr:after,
  .hovl:after {
    content: 'VIEW';
    width: 100%;
    font-size: 12px;
    font-weight: normal;
    font-family: var(--font-mono);
    line-height: 20px;
    margin-top: -8px;
    text-align: center;
    text-transform: uppercase;
    left: 0;
    top: 50%;
    position: absolute;
    display: block;
    z-index: 2;
    letter-spacing: 0.3em;
    color: var(--headline);
    opacity: 0;
    -webkit-transition: letter-spacing 300ms cubic-bezier(0.25, 0.1, 0.25, 1) 0ms,
      opacity 300ms cubic-bezier(0.25, 0.1, 0.25, 1) 0ms;
    transition: letter-spacing 300ms cubic-bezier(0.25, 0.1, 0.25, 1) 0ms,
      opacity 300ms cubic-bezier(0.25, 0.1, 0.25, 1) 0ms;
  }
`;

const StyledArchiveLink = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 80px auto 0;

  .subtitle {
    font-family: var(--font-sans);
    font-size: var(--fz-xl);
  }
`;

const Featured = () => {
  const data = useStaticQuery(graphql`
    {
      featured: allMarkdownRemark(
        filter: { fileAbsolutePath: { regex: "/featured/" } }
        sort: { fields: [frontmatter___date], order: DESC }
      ) {
        edges {
          node {
            frontmatter {
              title
              coverlg {
                childImageSharp {
                  gatsbyImageData(width: 1000, placeholder: BLURRED, formats: [AUTO, WEBP, AVIF])
                }
              }
              coversm {
                childImageSharp {
                  gatsbyImageData(width: 1000, placeholder: BLURRED, formats: [AUTO, WEBP, AVIF])
                }
              }
              tech
              external
              github
              slug
            }
            html
          }
        }
      }
    }
  `);

  const featuredProjects = data.featured.edges.filter(({ node }) => node);

  return (
    <section id="projects" data-scroll-section>
      <h2 className="numbered-heading">Some Things I’ve Built</h2>

      <StyledProjectsGrid>
        {featuredProjects &&
          featuredProjects.map(({ node }, i) => {
            const { frontmatter } = node;
            const { title, coverlg, coversm, tech, external } = frontmatter;
            const coverdesktop = getImage(coverlg);
            const covermobile = getImage(coversm);

            return (
              <StyledProject key={i}>
                <div className="project-preview">
                  <a href={external} className="prew">
                    <StyledProjectPreview>
                      <El1>
                        <GatsbyImage image={coverdesktop} alt={title} className="img" />
                        <span className="hovr" />
                      </El1>
                      <El2>
                        <GatsbyImage image={covermobile} alt={title} className="img" />
                        <span className="hovl" />
                      </El2>
                    </StyledProjectPreview>
                  </a>

                  <div className="project-details">
                    <div className="left-side">
                      <h3 className="project-title">{title}</h3>
                      {tech.length && (
                        <ul className="project-tech-list">
                          {tech.map((tech, i) => (
                            <li key={i}>{tech}</li>
                          ))}
                        </ul>
                      )}
                    </div>

                    <div className="right-side">
                      <div className="project-status">{external && <DotUpTime />}</div>
                    </div>
                  </div>
                </div>
              </StyledProject>
            );
          })}

        <StyledArchiveLink>
          <Link to="/archive" className="subtitle inline-link">
            View the archive
            <Icon name="Archive" />
          </Link>
        </StyledArchiveLink>
      </StyledProjectsGrid>
    </section>
  );
};

export default Featured;
