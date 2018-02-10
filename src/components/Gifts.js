import React from "react";
import Link from "gatsby-link";
import Helmet from "react-helmet";
import Script from "react-load-script";

export default class Gifts extends React.Component {
  render() {
    const { data } = this.props;
    console.log(this.props);
    // const { frontmatter: gifts } = data;
    return (
      <div
        className="gifts__item"
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(3, 1fr)",
          gridGap: "15px"
        }}
      >
        {/* {gifts.map(({ node: gift }) => {
          return (
            <div
              className="gifts__item"
              style={{
                border: "1px solid #eaecee",
                padding: "1.7em 3.5em",
                margin: "0"
              }}
              key={gift.id}
            >
              <p>
                <Link to={gift}>{gift}</Link>
              </p>
            </div>
          );
        })} */}
      </div>
    );
  }
}

export const giftQuery = graphql`
  query GiftsQuery {
    allMarkdownRemark(sort: { order: DESC, fields: [frontmatter___date] }) {
      edges {
        node {
          frontmatter {
            gifts
          }
        }
      }
    }
  }
`;
