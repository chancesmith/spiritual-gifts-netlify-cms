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
        <div className="hero">
          <div class="content__skew">
            <div class="content__header">
              <h1>
                <img src="./img/croppedgifted.png " />
              </h1>
              <p>
                We are here to connect a community need to your spiritual gift!
              </p>
              <a href="#" class="main-button">
                Serve Now
              </a>
            </div>
          </div>
        </div>
      </section>
    );
  }
}
