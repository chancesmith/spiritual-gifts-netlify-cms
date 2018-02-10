import React from "react";
import CMS from "netlify-cms";

import { OpportunityPostTemplate } from "site/templates/opportunity-post";

const OpportunityPostPreview = ({ entry, widgetFor }) => (
  <OpportunityPostTemplate
    content={widgetFor("body")}
    title={entry.getIn(["data", "title"])}
  />
);

CMS.registerPreviewStyle("/styles.css");
CMS.registerPreviewTemplate("opportunity", OpportunityPostPreview);
