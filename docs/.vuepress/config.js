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
      {
        title: 'Payloads (macOS)',
        children: ['/mac_shell'],
      },
    ],
  },
};
