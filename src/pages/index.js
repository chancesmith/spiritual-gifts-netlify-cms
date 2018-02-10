import React from "react";
import Link from "gatsby-link";
import Helmet from "react-helmet";
import Script from "react-load-script";

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
    const { data } = this.props;
    const { edges: opportunities } = data.allMarkdownRemark;
    return (
      <section className="section">
        <Script
          url="https://identity.netlify.com/v1/netlify-identity-widget.js"
          onLoad={this.handleScriptLoad.bind(this)}
        />
        <div className="container">
          <div className="content">
            <h1 className="has-text-weight-bold is-size-2">
              Opportunities to serve
            </h1>
          </div>
          <div
            className="opportunities"
            style={{
              display: "grid",
              "grid-template-columns": "repeat(3, 1fr)",
              "grid-gap": "15px"
            }}
          >
            {opportunities
              .filter(
                post => post.node.frontmatter.templateKey === "opportunity-post"
              )
              .map(({ node: post }) => {
                return (
                  <div
                    className="content"
                    style={{
                      border: "1px solid #eaecee",
                      padding: "1.7em 3.5em",
                      margin: "0"
                    }}
                    key={post.id}
                  >
                    <p>
                      <Link to={post.frontmatter.path}>
                        {post.frontmatter.title}
                      </Link>
                      <span> &bull; </span>
                      <small>{post.frontmatter.date}</small>
                    </p>
                    {/* <p>{post.excerpt}</p> */}
                  </div>
                );
              })}
          </div>
        </div>
      </section>
    );
  }
}

export const pageQuery = graphql`
  query IndexQuery {
    allMarkdownRemark(sort: { order: DESC, fields: [frontmatter___date] }) {
      edges {
        node {
          excerpt(pruneLength: 200)
          id
          frontmatter {
            title
            templateKey
            date(formatString: "MMMM DD, YYYY")
            path
          }
        }
      }
    }
  }
`;
