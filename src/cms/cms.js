import CMS from "netlify-cms";
import "netlify-cms/dist/cms.css";

import OpportunityPostPreview from "./preview-templates/OpportunityPostPreview";

CMS.registerPreviewStyle("/styles.css");
CMS.registerPreviewTemplate("opportunity", OpportunityPostPreview);
