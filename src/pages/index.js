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
    const { data } = this.props;
    const { edges: opportunities } = data.allMarkdownRemark;
    // make list of gifts
    var giftsArray = [];
    const gifts = opportunities
      .filter(post => post.node.frontmatter.templateKey === "opportunity-post")
      .map(({ node: post }) => {
        return post.frontmatter.gifts;
      });
    // change multi-dem array into single-dem
    for (var i = 0; i < gifts.length; i++) {
      for (var x = 0; x < gifts[i].length; x++) {
        giftsArray.push(gifts[i][x]);
      }
    }
    //remove duplicates
    const uniqueArray = giftsArray.filter(function(item, pos) {
      return giftsArray.indexOf(item) == pos;
    });

    return (
      <section className="section">
        <Script
          url="https://identity.netlify.com/v1/netlify-identity-widget.js"
          onLoad={this.handleScriptLoad.bind(this)}
        />
        <div className="container">
          <ul
            className="gifts"
            style={{
              display: "flex",
              margin: "12px"
            }}
          >
            {uniqueArray.map(gift => {
              return (
                <li
                  key={gift}
                  className="gifts__item"
                  style={{
                    padding: "13px 18px",
                    border: "1px solid #eee"
                  }}
                >
                  {gift}
                </li>
              );
            })}
          </ul>
          <div className="content">
            <h1 className="has-text-weight-bold is-size-2">
              Opportunities to serve
            </h1>
          </div>
          <div
            className="opportunities"
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(3, 1fr)",
              gridGap: "15px"
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
            gifts
          }
        }
      }
    }
  }
`;
