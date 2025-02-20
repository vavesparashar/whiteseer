import React from 'react';
import { graphql } from 'gatsby';
import { Helmet } from 'react-helmet';
import Parameterize from 'parameterize';
import getShareImage from '@jlengstorf/get-share-image';
import { FaTwitter } from 'react-icons/fa';

import Post from 'models/post';
import { createTweetAction, openTweet } from 'lib/social';

import Layout from 'components/Layout';
import ArticleHeader from 'components/ArticleHeader';
import Hidden from 'components/Hidden';
import Webmentions from 'components/Webmentions';

const PostContent = ({html}) => {
  return (
    <section className="row cf" itemProp="articleBody">
      <div className="article-content-body e-content" dangerouslySetInnerHTML={{ __html: html }}></div>
    </section>
  );
}

export default function Template({ location, data }) {
  const webmentions = data?.allWebMentionEntry?.nodes;
  const post = new Post(data.markdownRemark);

  const socialImage = getShareImage({
    title: post.title,
    cloudName: 'fay',
    imagePublicID: 'blog-social-card-3.0',
    textColor: 'ffffff',
    imageWidth: 1280,
    imageHeight: 640,
    textAreaWidth: 860,
    textLeftOffset: 80,
    titleFont: 'Source%20Sans%20Pro',
    titleLeftOffset: 80,
    titleFontSize: 70,
    titleBottomOffset: -30,
    titleExtraConfig: '_line_spacing_-10_semibold',
    titleGravity: 'west'
  });

  const isDev = process.env.NODE_ENV === 'development';
  const hostname = !isDev ? 'https://whiteseer.com' : '';
  const postUrl = `${hostname}${post.path}`;

  const helmet_settings = {
    bodyAttributes: {
      class: `article post post-${Parameterize(post.title)}`,
    },
    title: `${post.title} - White Seer`,
    meta: [
      {
        name: 'description',
        content: post.excerpt
      },
      {
        name: 'image',
        content: socialImage
      },
      {
        property: 'og:title',
        content: `${post.title} - White Seer`,
      },
      {
        property: 'og:description',
        content: post.excerpt,
      },
      {
        property: 'og:url',
        content: postUrl
      },
      {
        property: 'og:type',
        content: 'article'
      },
      {
        property: 'article:publisher',
        content: 'https://whiteseer.com'
      },
      {
        property: 'article:section',
        content: post.category
      },
      {
        property: 'article:tag',
        content: post.category
      },
      {
        property: 'og:image',
        content: socialImage
      },
      {
        property: 'og:image:secure_url',
        content: socialImage
      },
      {
        property: 'og:image:width',
        content: 1280
      },
      {
        property: 'og:image:height',
        content: 640
      },
      {
        property: 'twitter:card',
        content: 'summary_large_image'
      },
      {
        property: 'twitter:image',
        content: socialImage
      },
      {
        property: 'twitter:site',
        content: '@whiteseer9'
      },
      {
        property: 'twitter:creator',
        content: '@whiteseer9'
      }
    ],
  };


  const twitterAction = createTweetAction({
    message: [
      `${post.title} from @whiteseer9`,
      '👏👏👏👏',
      postUrl
    ]
  });

  function handleOnTwitterClick(e) {
    e.preventDefault();
    openTweet({
      message: twitterAction
    })
  }

  return (
    <Layout location={location}>
      <article className="container article-content h-entry" itemScope="" itemType="http://schema.org/BlogPosting">

        <Helmet {...helmet_settings} />

        <ArticleHeader title={post.title} category={post.category} date={post.date} />

        <PostContent html={post.html} />

        <Hidden className="p-summary e-content">
          { post.excerpt }
        </Hidden>

        <Hidden>
          <a className="p-author h-card" href="https://whitesser.com">White Seer</a>
          <img className="u-photo" src="https://whiteseer.com/Oaktree.jpg" alt="White Seer" />
        </Hidden>

        <Hidden>
          <a className="u-url" href={`https://whiteseer.com${post.path}`}>
            { `https://whiteseer.com${post.path}` }
          </a>
        </Hidden>

        <div className="article-webmentions">
          { Array.isArray(webmentions) && (
            <>
              <h3>Join the conversation on <a href="https://twitter.com/whiteseer9">Twitter</a></h3>
              <Webmentions mentions={webmentions} />
            </>
          )}
        </div>

        <p className="article-tweet">
          <a href={twitterAction} onClick={handleOnTwitterClick}>
            <FaTwitter/> Share this on Twitter
          </a>
        </p>

      </article>

    </Layout>
  );
}

export const pageQuery = graphql`
  query($slug: String!, $permalink: String!) {
    markdownRemark(fields: { slug: { eq: $slug } }) {
      html
      excerpt
      frontmatter {
        category
        date(formatString: "MMMM DD, YYYY")
        title
      }
      fields {
        slug
      }
    }
    allWebMentionEntry(filter: { wmTarget: { eq: $permalink } }) {
      nodes {
        id
        url
        author {
          name
          photo
          url
          type
        }
        content {
          text
          html
        }
        wmTarget
        likeOf
        mentionOf
        repostOf
      }
    }
  }
`;