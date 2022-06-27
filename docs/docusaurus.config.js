/** @type {import('@docusaurus/types').DocusaurusConfig} */
module.exports = {
  title: 'React Native Receive Sharing Intent',
  tagline:
    'A React Native plugin that enables React Native apps to receive sharing photos, videos, text, urls or any other file types from another app.',
  url: 'https://ajith-ab.github.io',
  baseUrl: '/react-native-receive-sharing-intent/',
  onBrokenLinks: 'throw',
  onBrokenMarkdownLinks: 'warn',
  favicon: 'img/favicon.ico',
  organizationName: 'ajith-ab', // Usually your GitHub org/user name.
  projectName: 'react-native-receive-sharing-intent', // Usually your repo name.
  themeConfig: {
    navbar: {
      title: 'React Native Receive Sharing Intent',
      logo: {
        alt: 'My Site Logo',
        src: 'img/RN.png',
      },
      items: [
        {
          type: 'doc',
          docId: 'intro',
          position: 'left',
          label: 'Installation',
        },
        {
          type: 'doc',
          docId: 'demo',
          position: 'left',
          label: 'Demo',
        },
        {
          href:
            'https://ajith-ab.github.io/react-native-receive-sharing-intent',
          label: 'GitHub',
          position: 'right',
        },
      ],
    },
    footer: {
      style: 'dark',
      links: [
        {
          title: 'Docs',
          items: [
            {
              label: 'Installation',
              to: '/docs/intro',
            },
          ],
        },
        {
          title: 'Community',
          items: [
            {
              label: 'Stack Overflow',
              href:
                'https://stackoverflow.com/questions/tagged/React-Native-Receive-Sharing-Intent',
            },
          ],
        },
      ],
      copyright: `Copyright © ${new Date().getFullYear()} React Native Receive Sharing Intent.`,
    },
  },
  presets: [
    [
      '@docusaurus/preset-classic',
      {
        docs: {
          sidebarPath: require.resolve('./sidebars.js'),
          // Please change this to your repo.
          editUrl:
            'https://ajith-ab.github.io/react-native-receive-sharing-intent/docs/',
        },
        theme: {
          customCss: require.resolve('./src/css/custom.css'),
        },
      },
    ],
  ],
};
