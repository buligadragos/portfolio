const config = require('./src/config');

require('dotenv').config({
  path: `.env.${process.env.NODE_ENV}`,
});

module.exports = {
  siteMetadata: {
    title: 'Buliga Dragos',
    description:
      'Buliga Dragos is an ambitious, naturally curious college student with a great passion for Computer Science..',
    siteUrl: 'https://buligadragos.ro', // No trailing slash allowed!
    image: '/og.png', // Path to your image you placed in the 'static' folder
  },
  plugins: [
    `gatsby-plugin-react-helmet`,
    `gatsby-plugin-styled-components`,
    `gatsby-plugin-sharp`,
    `gatsby-transformer-sharp`,
    `gatsby-plugin-sitemap`,
    `gatsby-plugin-robots-txt`,
    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        name: 'BuligaDragos',
        short_name: 'BuligaDragos',
        start_url: '/',
        background_color: config.colors.dark,
        theme_color: config.colors.dark,
        display: 'standalone',
        icon: 'src/images/favicon.png',
      },
    },
    `gatsby-plugin-offline`,
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `images`,
        path: `${__dirname}/src/images`,
      },
    },
    {
      resolve: 'gatsby-source-filesystem',
      options: {
        name: 'content',
        path: `${__dirname}/content/`,
      },
    },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `works`,
        path: `${__dirname}/content/works`,
      },
    },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `archive`,
        path: `${__dirname}/content/archive`,
      },
    },
    {
      resolve: `gatsby-transformer-remark`,
      options: {
        plugins: [
          {
            // https://www.gatsbyjs.org/packages/gatsby-remark-external-links
            resolve: 'gatsby-remark-external-links',
            options: {
              target: '_blank',
              rel: 'nofollow noopener noreferrer',
            },
          },
          {
            // https://www.gatsbyjs.org/packages/gatsby-remark-images
            resolve: 'gatsby-remark-images',
            options: {
              maxWidth: 10000,
              linkImagesToOriginal: false,
              quality: 90,
              withWebp: true,
              tracedSVG: { color: config.colors.accent },
            },
          },
        ],
      },
    },
    {
      resolve: `gatsby-plugin-google-analytics`,
      options: {
        trackingId: 'UA-173947617-1',
      },
    },
  ],
};
