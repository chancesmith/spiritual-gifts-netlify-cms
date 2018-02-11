import React from "react";
import Link from "gatsby-link";
import Helmet from "react-helmet";
import Script from "react-load-script";
import Gifts from "../components/Gifts";

export default class OpportunitiesPage extends React.Component {
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
        <div className="container">
          <h1 className="has-text-weight-bold is-size-2">Gift Selector</h1>
          {/* GIFT SELECTOR DROPDOWN */}
          <select
            className="giftSelector"
            onChange={function() {
              var selector = document.querySelector(".giftSelector");
              var selectedGifts = selector.value;
            }}
            style={{
              display: "flex",
              margin: "12px"
            }}
          >
            {uniqueArray.map(gift => {
              return (
                <option
                  // key={gift}
                  value={gift}
                >
                  {gift}
                </option>
              );
            })}
          </select>
          <div className="content">
            <h1 className="has-text-weight-bold is-size-2">
              Opportunities to serve
            </h1>
            <hr />
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
                    className={post.frontmatter.gifts}
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
