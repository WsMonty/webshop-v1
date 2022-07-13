module.exports = {
  siteMetadata: {
    title: `Webshop`,
    siteUrl: `https://www.yourdomain.tld`,
  },
  plugins: [
    {
      resolve: 'gatsby-source-datocms',
      options: {
        //Alisa for safty reasons write apiToken in .env file
        //f.e. apiToken: process.env.API_TOKEN
        apiToken: '9c970d6f32037d5c733071318563cb',
      },
    },
    {
    //Alisa call to googleapis is not allowed anymore without Cookie consent 
    //See API call to google in Network Tab
    //An Option to preload would be f.e. fontsource
      resolve: 'gatsby-plugin-google-fonts',
      options: {
        fonts: ['Catamaran'],
      },
    },
    'gatsby-plugin-sass',
    'gatsby-plugin-image',

    'gatsby-plugin-sharp',
    'gatsby-plugin-gatsby-cloud',
    'gatsby-plugin-react-helmet',
  ],
};
