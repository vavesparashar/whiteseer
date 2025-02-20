import React from 'react';
import { Link } from 'gatsby';
import { FaTwitter, FaYoutube } from 'react-icons/fa';

import { createTweetAction, openTweet } from 'lib/social';

import SocialIcons from 'components/SocialIcons';
import Hidden from 'components/Hidden';
import EmailSignup from 'components/EmailSignup';

//import image_resume from '../../static/assets/colby-fayock-front-end-development-web-design-resume.pdf';

const Footer = () => {
  const twitterAction = createTweetAction({
    message: [
      `Hey @whiteseer9, What's good? 😎`
    ]
  });

  function handleOnTwitterClick(e) {
    e.preventDefault();
    openTweet({
        message: twitterAction
    })
  }

  return (
    <div className="footer">

    {/* <div className="container footer-secondary"> 

        <div className="content">

          <div className="row">
            <p className="emoji">
              👨‍🚀 😎 👨‍💻
            </p>
            <p>
              Stay connected with positivity and practical quotes
            </p>
            <ul>
              <li>
                <a href={twitterAction} onClick={handleOnTwitterClick}>
                  <FaTwitter/> Follow & Say Hi
                </a>
              </li>
              <li>
                <a href="https://www.youtube.com/whiteseer9?sub_confirmation=1">
                  <FaYoutube/> Subscribe
                </a>
              </li>
            </ul>
          </div>

        </div>

      </div> */}

      <div className="container footer-email-signup">
        <div className="content">
          <div className="row">
            <p>
              Get daily quotes in your email inbox!
            </p>
            <p className="emoji">
              🙌 ✉️ 🙌
            </p>
            <EmailSignup />
          </div>
        </div>
      </div>

      <footer className="container footer-primary" role="contentinfo">

        <div className="content">

          <div className="row">

            <div className="footer-social">
              <SocialIcons />
            </div>

            <div className="twelvecol footer-links align-center">

              <ul className="flat-top">
                <li>
                  <Link to="/about">
                    About
                  </Link>
                </li>
                <li>
                  <Link to="/all-posts">
                    All Posts
                  </Link>
                </li>
                <li>
                  <Link to="/">
                    &copy; White Seer
                  </Link>
                </li>
              </ul>

            </div>

          </div>

        </div>

      </footer>

      <Hidden className="h-card">
        <a className="p-name u-url" href="https://whiteseer.com" rel="me">
          White Seer
        </a>
        <img className="u-photo" src="https://www.colbyfayock.com/colby-fayock-bite-world.jpg" alt="Colby Fayock" />
        <p className="p-note">
          A Front End Engineer and UX Designer that’s passionate about tackling challenges
          that can help save people’s lives and make the world a better place.
        </p>
      </Hidden>
    </div>
  );
};

export default Footer;