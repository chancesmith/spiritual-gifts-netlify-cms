import React from "react";
import Link from "gatsby-link";
import Helmet from "react-helmet";
import Script from "react-load-script";
import Gifts from "../components/Gifts";

export default class IndexPage extends React.Component {
  handleScriptLoad() {
    if (window.netlifyIdentity) {
      window.netlifyIdentity.on("init", user => {
        if (!user) {
          window.netlifyIdentity.on("login", () => {
            document.location.href = "/admin/";
          });
        }
      });
    }
    window.netlifyIdentity.init();
  }

  render() {
    return (
      <section className="section">
        <Script
          url="https://identity.netlify.com/v1/netlify-identity-widget.js"
          onLoad={this.handleScriptLoad.bind(this)}
        />
        <div class="homepage">
          <div class="content">
            <div class="content__skew">
              <figure>
                <img src="https://media1-production-mightynetworks.imgix.net/asset/2164486/istock_000006715814medium.jpg?ixlib=rails-0.3.0&fm=jpg&q=75&auto=format" />
              </figure>
              <div class="content__header">
                <h1>
                  <img src="http://sodiumhalogen.com/up_be/croppedGiftED-SpyRgwcM5V.png" />
                </h1>
                <p>
                  Find how your spiritual gift can benefit{" "}
                  <strong>City Church</strong>.
                </p>
                <a href="/opportunities" class="main-button">
                  Serve Now
                </a>
              </div>
            </div>
          </div>

          <div class="about">
            <div class="about__skew">
              <div class="about__header">
                <h2>About</h2>
                <p>
                  Gifted aims to help Christians exercise their spiritual gifts
                  given by the Holy Spirit by showing them ways they can use
                  their gifts in their local body.t, as described in Romans 12
                  and 1 Corinthians 12. Simply search for serving opportunities
                  in your community, and filter the results by spiritual gifts.
                  Whether you're equipped with the gift of prophesy, discernment
                  or any of the spiritual gifts given by Christ, Gifted will
                  find a match, allowing you to strengthen your faith and live
                  purposefully.
                </p>
                <p>
                  Uncertain about your spiritual gifts? Take an assessment{" "}
                  <a href="https://spiritualgiftstest.com/spiritual-gifts/">
                    here
                  </a>.
                </p>
                <a
                  href="http://www.findthegifted.com#about"
                  class="main-button"
                >
                  Getting Started
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>
    );
  }
}
