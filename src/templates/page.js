import React from 'react';
import { graphql } from 'gatsby';
import { Helmet } from 'react-helmet';
import Parameterize from 'parameterize';

import Post from 'models/post';

import Layout from 'components/Layout';

const PageContent = ({html}) => {
    return (
        <section className="row cf" itemProp="articleBody">
            <div className="article-content-body" dangerouslySetInnerHTML={{ __html: html }}></div>
        </section>
    );
}

export default function Template({ location, data }) {

    const post = new Post(data.markdownRemark);

    const helmet_settings = {
        bodyAttributes: {
            class: `article page page-${Parameterize(post.title)}`,
        },
        title: `${post.title} - White Seer`,
        meta: [
            {
                property: 'og:title',
                content: `${post.title} - White Seer`,
            },
        ],
    };

    return (
        <Layout location={location}>
            <article className="container article-content" itemScope="" itemType="http://schema.org/BlogPosting">

                <Helmet {...helmet_settings} />

                <header className="article-header">

                    <h1 className="entry-title single-title flat-top" itemProp="headline">
                        { post.title }
                    </h1>

                </header>

                <PageContent html={post.html} />

            </article>
        </Layout>
    );
}

export const pageQuery = graphql`
    query($slug: String!) {
        markdownRemark(fields: { slug: { eq: $slug } }) {
            html
            frontmatter {
                category
                date(formatString: "MMMM DD, YYYY")
                title
            }
            fields {
                slug
            }
        }
    }
`;