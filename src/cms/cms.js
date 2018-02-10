import CMS from "netlify-cms";
import "netlify-cms/dist/cms.css";

import AboutPagePreview from "./preview-templates/AboutPagePreview";
import OpportunityPostPreview from "./preview-templates/OpportunityPostPreview";
import ProductPagePreview from "./preview-templates/ProductPagePreview";

CMS.registerPreviewStyle("/styles.css");
CMS.registerPreviewTemplate("about", AboutPagePreview);
CMS.registerPreviewTemplate("products", ProductPagePreview);
CMS.registerPreviewTemplate("opportunity", OpportunityPostPreview);
