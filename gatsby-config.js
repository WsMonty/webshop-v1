module.exports = {
  siteMetadata: {
    title: `Webshop`,
    siteUrl: `https://www.yourdomain.tld`,
  },
  plugins: [
    {
      resolve: 'gatsby-source-datocms',
      options: {
        apiToken: '9c970d6f32037d5c733071318563cb',
      },
    },
    {
      resolve: 'gatsby-plugin-google-fonts',
      options: {
        fonts: ['Roboto'],
      },
    },
    'gatsby-plugin-sass',
    'gatsby-plugin-image',
    'gatsby-transformer-sharp',
    'gatsby-plugin-sharp',
    'gatsby-plugin-gatsby-cloud',
    'gatsby-plugin-react-helmet',
  ],
};
