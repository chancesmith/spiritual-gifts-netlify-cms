import React from 'react';
import { OpportunityPostTemplate } from '../../templates/opportunity-post';

const OpportunityPostPreview = ({ entry, widgetFor }) => (
  <OpportunityPostTemplate
    content={widgetFor('body')}
    description={entry.getIn(['data', 'description'])}
    title={entry.getIn(['data', 'title'])}
  />
);

export default OpportunityPostPreview;
