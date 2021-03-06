import React, { useState, useRef } from 'react';
import { useStaticQuery, graphql } from 'gatsby';
import styled from 'styled-components';

const StyledJobsSection = styled.section`
  max-width: 700px;
  .inner {
    display: flex;
    @media (max-width: 600px) {
      display: block;
    }
    // Prevent container from jumping
    @media (min-width: 700px) {
      min-height: 340px;
    }
  }
`;

const StyledTabList = styled.div`
  position: relative;
  z-index: 3;
  width: max-content;
  padding: 0;
  margin: 0;
  list-style: none;
  @media (max-width: 600px) {
    display: flex;
    overflow-x: auto;
    width: calc(100% + 100px);
    padding-left: 50px;
    margin-left: -50px;
    margin-bottom: 30px;
  }
  @media (max-width: 480px) {
    width: calc(100% + 50px);
    padding-left: 25px;
    margin-left: -25px;
  }
  li {
    &:first-of-type {
      @media (max-width: 600px) {
        margin-left: 50px;
      }
      @media (max-width: 480px) {
        margin-left: 25px;
      }
    }
    &:last-of-type {
      @media (max-width: 600px) {
        padding-right: 50px;
      }
      @media (max-width: 480px) {
        padding-right: 25px;
      }
    }
  }
`;

const StyledTabButton = styled.button`
  position: relative;
  transition: var(--transition);
  cursor: pointer;
  text-decoration: none;
  display: flex;
  align-items: center;
  width: 100%;
  height: var(--tab-height);
  padding: 0 20px 2px;
  border-left: 2px solid var(--grey);
  background-color: transparent;
  color: ${({ isActive }) => (isActive ? 'var(--accent)' : 'var(--grey)')};
  font-family: var(--font-mono);
  font-size: var(--fz-xs);
  text-align: left;
  white-space: nowrap;
  @media (max-width: 768px) {
    padding: 0 15px 2px;
  }
  @media (max-width: 600px) {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 120px;
    padding: 0 15px;
    border-left: 0;
    border-bottom: 2px solid var(--grey);
    text-align: center;
  }
  &:hover,
  &:active,
  &:focus {
    background-color: var(--hoverbg);
    color: var(--accent);
    outline: 0;
  }
`;

const StyledHighlight = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  z-index: 10;
  width: 2px;
  height: var(--tab-height);
  border-radius: var(--border-radius);
  background: linear-gradient(90deg, #ff7f51, #e85333, #a02817);
  transform: translateY(calc(${({ activeTabId }) => activeTabId} * var(--tab-height)));
  transition: transform 0.25s cubic-bezier(0.645, 0.045, 0.355, 1);
  transition-delay: 0.1s;
  @media (max-width: 600px) {
    top: auto;
    bottom: 0;
    width: 100%;
    max-width: var(--tab-width);
    height: 2px;
    margin-left: 50px;
    transform: translateX(calc(${({ activeTabId }) => activeTabId} * var(--tab-width)));
  }
  @media (max-width: 480px) {
    margin-left: 25px;
  }
`;

const StyledTabPanels = styled.div`
  position: relative;
  width: 100%;
  margin-left: 20px;
  @media (max-width: 600px) {
    margin-left: 0;
  }
`;

const StyledTabPanel = styled.div`
  width: 100%;
  height: auto;
  padding: 10px 5px;
  ul {
    padding: 0;
    margin: 0;
    list-style: none;
    font-size: 1rem;
    li {
      position: relative;
      padding-left: 30px;
      margin-bottom: 10px;
      &:before {
        content: '???';
        position: absolute;
        left: 0;
        background: linear-gradient(90deg, #ff7f51, #e85333, #a02817);
        -webkit-background-clip: text;
        background-clip: text;
        -webkit-text-fill-color: transparent;
        line-height: 25px;
        font-size: var(--fz-xxl);
      }
    }
  }
  h3 {
    margin-bottom: 2px;
    font-size: var(--fz-xxl);
    font-weight: 500;
    line-height: 1.3;
    .company {
      background: linear-gradient(90deg, #ff7f51, #e85333, #a02817);
      -webkit-background-clip: text;
      background-clip: text;
      -webkit-text-fill-color: transparent;
    }
  }
  .range {
    margin-bottom: 25px;
    color: var(--grey);
    font-family: var(--font-mono);
    font-size: var(--fz-xs);
  }
`;

const Jobs = () => {
  const data = useStaticQuery(graphql`
    query {
      jobs: allMarkdownRemark(
        filter: { fileAbsolutePath: { regex: "/jobs/" } }
        sort: { fields: [frontmatter___date], order: DESC }
      ) {
        edges {
          node {
            frontmatter {
              title
              company
              location
              range
              url
            }
            html
          }
        }
      }
    }
  `);

  const jobsData = data.jobs.edges;

  const [activeTabId, setActiveTabId] = useState(0);
  const tabs = useRef([]);

  return (
    <StyledJobsSection id="jobs" data-scroll-section>
      <h2 className="numbered-heading">Where I???ve Worked</h2>

      <div className="inner">
        <StyledTabList role="tablist" aria-label="Job tabs">
          {jobsData &&
            jobsData.map(({ node }, i) => {
              const { company } = node.frontmatter;
              return (
                <StyledTabButton
                  key={i}
                  isActive={activeTabId === i}
                  onClick={() => setActiveTabId(i)}
                  ref={el => (tabs.current[i] = el)}
                  id={`tab-${i}`}
                  role="tab"
                  tabIndex={activeTabId === i ? '0' : '-1'}
                  aria-selected={activeTabId === i}
                  aria-controls={`panel-${i}`}>
                  <span>{company}</span>
                </StyledTabButton>
              );
            })}
          <StyledHighlight activeTabId={activeTabId} />
        </StyledTabList>

        <StyledTabPanels>
          {jobsData &&
            jobsData.map(({ node }, i) => {
              const { frontmatter, html } = node;
              const { title, url, company, range } = frontmatter;

              return (
                <StyledTabPanel
                  key={i}
                  id={`panel-${i}`}
                  role="tabpanel"
                  tabIndex={activeTabId === i ? '0' : '-1'}
                  aria-labelledby={`tab-${i}`}
                  aria-hidden={activeTabId !== i}
                  hidden={activeTabId !== i}>
                  <h3>
                    <span>{title}</span>
                    <span className="company">
                      &nbsp;@&nbsp;
                      <a href={url} className="inline-link">
                        {company}
                      </a>
                    </span>
                  </h3>

                  <p className="range">{range}</p>

                  <div dangerouslySetInnerHTML={{ __html: html }} />
                </StyledTabPanel>
              );
            })}
        </StyledTabPanels>
      </div>
    </StyledJobsSection>
  );
};

export default Jobs;
