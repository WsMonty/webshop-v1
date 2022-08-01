module.exports = {
  siteMetadata: {
    title: `Grethen Edition`,
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
        fonts: ['Catamaran'],
      },
    },
    {
      resolve: 'gatsby-plugin-manifest',
      options: {
        icon: './src/images/logo_yellow.png',
      },
    },
    'gatsby-plugin-sass',
    'gatsby-plugin-image',

    'gatsby-plugin-sharp',
    'gatsby-plugin-gatsby-cloud',
    'gatsby-plugin-react-helmet',
    'gatsby-plugin-netlify',
  ],
};
