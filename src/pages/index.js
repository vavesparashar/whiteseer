import React, { useEffect, useState } from 'react';
import { Link } from 'gatsby';
import { Helmet } from 'react-helmet';
import { FaRss } from 'react-icons/fa';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';

import { usePosts, useTalks, useProjects, useExample } from 'hooks';

import Layout from 'components/Layout';
import Masthead from 'components/Masthead';
import ArticleList from 'components/ArticleList';


const Index = ({location, data}) => {

  const [notice, updateNotice] = useState();

  useEffect(() => {
    let updatedNotice;

    if ( window.location.search.includes('emailSignup=success') ) {
      updatedNotice = 'Thanks for signing up for my newsletter! 🤗';
    } else if (window.location.search.includes('newsletterUnsubscribe=success')) {
      updatedNotice = 'Sorry to see you go... 😢 Successfully unsubscribed!';
    }

    if (updatedNotice) {
      updateNotice(updatedNotice);
      setTimeout(() => {
        updateNotice(undefined);
      }, 5000);
    }
  }, []);

  const { posts, toAll: toAllPosts } = usePosts();
  const { projects, toAll: toAllProjects } = useProjects();
  const { talks, toAll: toAllTalks } = useTalks();
  const { example, toAll: toAllExample } = useExample();
  console.log(example);

  const helmet_settings = {
    bodyAttributes: {
      class: 'home',
    },
    meta: [
      {
        property: 'og:type',
        content: 'profile'
      },
      {
        property: 'profile:first_name',
        content: 'Whiteseer'
      },
      {
        property: 'profile:username',
        content: 'Whiteseer'
      }
    ],
  };

  return (
    <Layout location={location}>
      <Helmet {...helmet_settings} />

      {notice && (
        <div className="header-notice" onClick={() => updateNotice(false)}>
          {notice}
        </div>
      )}

      <Masthead />

      <div className="home-newsletter">
        <div className="container">
          <Link to="/newsletter">
            <span className="home-newsletter-icon">
              📬
            </span>
            <div className="home-newsletter-content">
              <h3>Subscribe for daily positive quotes</h3>
              <p>
                One email per day discussing questions, philosophy and a few quotes. No Spam!             
              </p>
            </div>
            <div className="home-newsletter-button">
              <button>
                Subscribe
              </button>
            </div>
          </Link>
        </div>
      </div>

      <div className="home-content container">

        <div className="home-main">
        <Tabs>
          <TabList>
            <Tab>Origin</Tab>
            <Tab>Game</Tab>
            <Tab>End</Tab>
          </TabList>
          <TabPanel>
            <ArticleList articles={posts} />
          </TabPanel>
          <TabPanel>
            <ArticleList articles={talks} />
          </TabPanel>
          <TabPanel>
            <ArticleList articles={example} />
          </TabPanel>
        </Tabs>
          {/* <ArticleList articles={posts} count={5} toAll={toAllPosts} labelArticles="Posts" /> */}
        </div>

      </div>

    </Layout>
  );

}

export default Index;