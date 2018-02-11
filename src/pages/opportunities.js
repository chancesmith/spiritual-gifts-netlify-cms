import React from "react";
import Link from "gatsby-link";
import Helmet from "react-helmet";
import Script from "react-load-script";
import Gifts from "../components/Gifts";

export default class OpportunitiesPage extends React.Component {
  constructor() {
    super();
    this.filterOpportunities = this.filterOpportunities.bind(this);

    this.state = { spiritualGift: "All" };
  }
  filterOpportunities(e) {
    this.setState({ spiritualGift: e.target.value });
  }
  render() {
    const { data } = this.props;
    const { spiritualGift } = this.state;
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
    let uniqueArray = giftsArray.filter(function(item, pos) {
      return giftsArray.indexOf(item) == pos;
    });
    uniqueArray.unshift("All");

    return (
      <section className="section">
        <div className="container">
          <div className="select-wrapper">
            <div className="select-skew">
              <figure>
                <img src="http://sodiumhalogen.com/up_be/casey-horner-487085-iJrzaCAjf4.jpg" />
              </figure>
              <div className="select-content">
                <a href="/">
                  <img src="http://sodiumhalogen.com/up_be/croppedGiftED-SpyRgwcM5V.png" />
                </a>
                <h1>Select Your Spiritual Gift</h1>
                <select
                  className="giftSelector"
                  onChange={e => this.filterOpportunities(e)}
                  style={{
                    margin: "12px"
                  }}
                >
                  {uniqueArray.map((gift, index) => {
                    return (
                      <option key={index} value={gift}>
                        {gift}
                      </option>
                    );
                  })}
                </select>
              </div>
            </div>
          </div>
          <div className="opportunities-wrapper">
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
                  post =>
                    (post.node.frontmatter.templateKey === "opportunity-post" &&
                      spiritualGift &&
                      post.node.frontmatter.gifts.indexOf(spiritualGift) !=
                        -1) ||
                    (post.node.frontmatter.templateKey === "opportunity-post" &&
                      spiritualGift === "All")
                )
                .map(({ node: post }) => {
                  console.log(post);
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
