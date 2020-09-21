module.exports = {
  title: 'Hello VuePress',
  description: 'Just playing around',
  themeConfig: {
    sidebar: [
      ['/', 'Introduction'],
      {
        title: 'Usage',
        children: ['/cloning', '/generate'],
      },
    ],
  },
};
