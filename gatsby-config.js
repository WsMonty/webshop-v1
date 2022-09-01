module.exports = {
  siteMetadata: {
    title: `Grethen Edition`,
    siteUrl: `https://grethen-edition.com`,
  },
  plugins: [
    {
      resolve: 'gatsby-plugin-google-tagmanager',
      options: {
        id: 'GTM-PJSGFGG',
        includeInDevelopment: false,
        enableWebVitalsTracking: true,
      },
    },
    {
      resolve: 'gatsby-source-datocms',
      options: {
        apiToken: '9c970d6f32037d5c733071318563cb',
      },
    },
    {
      resolve: 'gatsby-plugin-google-fonts',
      options: {
        fonts: ['Catamaran'],
        display: 'swap',
      },
    },
    {
      resolve: 'gatsby-plugin-manifest',
      options: {
        icon: './src/images/logo_yellow_square.png',
      },
    },
    'gatsby-plugin-sass',
    'gatsby-plugin-image',
    'gatsby-plugin-smoothscroll',
    'gatsby-plugin-sharp',
    'gatsby-plugin-gatsby-cloud',
    'gatsby-plugin-react-helmet',
    'gatsby-plugin-netlify',
    'gatsby-plugin-next-seo',
    'gatsby-plugin-sitemap',
  ],
};
