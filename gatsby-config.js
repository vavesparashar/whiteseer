require('dotenv').config();

const siteMetadata = {
  title: 'Follow The Light',
  tagline: 'A quest to explore the human potential',
  description: 'Follow The Light: A Quest',
  siteUrl: 'https://whiteseer.com'
};

module.exports = {
  siteMetadata,
  plugins: [
    'gatsby-plugin-resolve-src',
    'gatsby-plugin-sass',
    'gatsby-plugin-postcss',
    {
      resolve: 'gatsby-source-filesystem',
      options: {
        path: `${__dirname}/src/_posts`,
        name: 'markdown-pages',
      },
    },
    {
      resolve: 'gatsby-source-filesystem',
      options: {
        path: `${__dirname}/src/_example`,
        name: 'markdown-pages',
      },
    },
    {
      resolve: 'gatsby-source-filesystem',
      options: {
        path: `${__dirname}/src/_talks`,
        name: 'markdown-pages',
      },
    },
    {
      resolve: 'gatsby-source-filesystem',
      options: {
        path: `${__dirname}/src/_pages`,
        name: 'markdown-pages',
      },
    },
    'gatsby-transformer-remark',
    {
      resolve: 'gatsby-plugin-google-marketing-platform',
      options: {
        dataLayer: {
          gaPropertyId: 'UA',
          gaOptimizeId: 'GTM'
        },
        tagmanager: {
          id: 'GTM',
          params: {
            gtm_cookies_win: 'x'
          }
        },
        analytics: {
          id: 'UA-',
        },
        optimize: {
          id: 'GTM',
        },
        includeInDevelopment: false,
      },
    },
    {
      resolve: `gatsby-plugin-webmention`,
      options: {
        username: "whiteseer.com",
        identity: {
          github: "",
          twitter: "whiteseer9"
        },
        mentions: true,
        pingbacks: true,
        domain: "whiteseer.com",
        token: process.env.WEBMENTIONS_TOKEN
      }
    },
    {
      resolve: 'gatsby-plugin-netlify-cms',
      options: {
        manualInit: true,
        modulePath: `${__dirname}/src/cms/cms.js`,
      },
    },
    'gatsby-plugin-react-helmet',
    {
      resolve: `gatsby-plugin-feed`,
      options: {
        query: `{
          site {
            siteMetadata {
              title
              description
              siteUrl
              site_url: siteUrl
            }
          }
        }`,
        feeds: [
          {
            serialize: ({ query: { site, allMarkdownRemark } }) => {
              return allMarkdownRemark.edges.map(edge => {
                let path = edge.node.fields.slug;
                if ( path.charAt(0) !== '/' ) {
                  path = `/${path}`;
                }
                return Object.assign({}, edge.node.frontmatter, {
                  description: edge.node.excerpt,
                  url: `${site.siteMetadata.siteUrl}${path}`,
                  guid: `${site.siteMetadata.siteUrl}${path}`,
                })
              })
            },
            query: `{
              allMarkdownRemark(
                limit: 100,
                filter: { frontmatter: { category: { ne: null } } }
                sort: { order: DESC, fields: [frontmatter___date] }
                ) {
                  edges {
                    node {
                      excerpt(pruneLength: 250)
                      fields {
                        slug
                      }
                      frontmatter {
                        title
                        date
                      }
                    }
                  }
                }
              }`,
              output: '/rss.xml',
              title: siteMetadata.title,
            },
          ],
        },
      },
    ],
  };