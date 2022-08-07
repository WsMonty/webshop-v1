import React from 'react';
import Work from '../components/work.js';
import { GatsbySeo } from 'gatsby-plugin-next-seo';

const Works = () => {
  return (
    <div className="works">
      <GatsbySeo
        title="Grethen Edition | Works"
        description="All the works available on Grethen Edition."
        language="en"
        noindex={false}
        nofollow={false}
      />
      <Work />
    </div>
  );
};

export default Works;
