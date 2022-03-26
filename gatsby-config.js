module.exports = {
  siteMetadata: {
    title: `new`,
    siteUrl: `https://www.yourdomain.tld`
  },
  plugins: [{
    resolve: 'gatsby-source-datocms',
    options: {
      "apiToken": "9c970d6f32037d5c733071318563cb"
    }
  }, "gatsby-plugin-sass"]
};