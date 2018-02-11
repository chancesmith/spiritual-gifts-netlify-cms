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
                <img src="http://farm5.staticflickr.com/4707/40155267022_7442c3ac3b_b.jpg" />
              </figure>
              <div class="content__header">
                <h1>
                  <img src="https://files.slack.com/files-pri/T03QR7YLR-F976KJDH8/trans2.png" />
                </h1>
                <p>
                  We are here to connect a community need to your spiritual
                  gift!
                </p>
                <a href="#" class="main-button">
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
                  The Oak & the Reeds A Giant Oak stood near a brook in which
                  grew some slender Reeds. When the wind blew, the great Oak
                  stood proudly upright with its hundred arms uplifted to the
                  sky. But the Reeds bowed low in the wind and sang a sad and
                  mournful song.
                </p>
                <p>
                  "Do not worry about us," replied the Reeds. "The winds do not
                  harm us. We bow before them and so we do not break. You, in
                  all your pride and strength, have so far resisted their blows.
                  But the end is coming." Better to yield when it is folly to
                  resist, than to resist stubbornly and be destroyed.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    );
  }
}
