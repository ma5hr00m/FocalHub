// src/HeadHelmet.tsx
import React from 'react';
import { Helmet } from 'react-helmet';
import { SiteConfig } from '../types/types';

interface HelmetProps {
  config: SiteConfig;
}

const HeadHelmet: React.FC<HelmetProps> = ({ config }) => {
  const { title, description, author, keywords, favicon, ogimage } = config;

  return (
    <Helmet>
      <meta charSet="UTF-8" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <meta name="robots" content="index,follow" />
      <meta name="referrer" content="no-referrer" />
      <title>{title}</title>
      <link rel="icon" type="image/svg+xml" href={favicon} />
      {ogimage && <meta property="og:image" content={ogimage} />}
      {description && <meta property="og:description" content={description} />}
      {description && <meta name="description" content={description} />}
      {author && <meta name="author" content={author} />}
      {keywords && <meta name="keywords" content={keywords} />}
      <meta property="og:title" content={title} />
    </Helmet>
  );
}

export default HeadHelmet;
