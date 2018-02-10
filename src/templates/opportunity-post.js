import React from "react";
import Content, { HTMLContent } from "../components/Content";
import Helmet from "react-helmet";

export const OpportunityPostTemplate = ({
  content,
  contentComponent,
  title,
  helmet
}) => {
  const PostContent = contentComponent || Content;
  return (
    <section className="section">
      {helmet ? helmet : ""}
      <div className="container content">
        <div className="columns">
          <div className="column is-10 is-offset-1">
            <h1 className="title is-size-2 has-text-weight-bold is-bold-light">
              {title}
            </h1>
            <PostContent content={content} />
          </div>
        </div>
      </div>
    </section>
  );
};

export default ({ data }) => {
  const { markdownRemark: post } = data;
  return (
    <OpportunityPostTemplate
      content={post.html}
      contentComponent={HTMLContent}
      helmet={<Helmet title={`Opportunity | ${post.frontmatter.title}`} />}
      title={post.frontmatter.title}
    />
  );
};

export const opportunityQuery = graphql`
  query OpportunityPostByPath($path: String!) {
    markdownRemark(frontmatter: { path: { eq: $path } }) {
      html
      frontmatter {
        path
        date(formatString: "MMMM DD, YYYY")
        title
      }
    }
  }
`;
