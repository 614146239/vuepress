import { defaultTheme, defineUserConfig } from 'vuepress'
import { copyCodePlugin } from "vuepress-plugin-copy-code2";
export default defineUserConfig({
  base: '/',
  lang: 'zh-CN',
  title: '今天无bug',
  description: 'wsy',
  head: [['link', { rel: 'icon', href: './public/images/hero.png' }]],
  markdown: {

  },

  theme: defaultTheme({

    // 默认主题配置
    navbar: [
      {
        text: '首页',
        link: '/',
      },
      {
        text: 'electron',
        link: '/electron',
      },
      {
        text: 'vue',
        link: '/vue',
      },
      {
        text: 'three',
        link: '/three',
      },
      {
        text: 'canvas',
        link: '/canvas/',
      },
    ],
    sidebar: {
      // SidebarItem
      '/canvas/': [
        {
          text: 'canvas',
          collapsible: true,
          children: ['/canvas/index.md'],
          //   children: [
          //     { text: 'canvas基础', ariaLabel: '/canvas/index.md' },
          //     { text: 'canvas基础', ariaLabel: '/canvas/index.md' },

          // ]
        },
        {
          text: 'canavs案例',
          collapsible: true,
          children: ['/canvas/demo.md'],
        },
      ],

      '/electron': [
        {
          text: 'electron',
          collapsible: true,
          children: ['/electron/index.md'],
        },
        {
          text: 'electron-camera',
          collapsible: true,
          children: ['/electron/electron-camera.md',],
        },
      ],
    },



  }),
  plugins: [
    copyCodePlugin({
      // 插件选项
      fancy: true
    }),

  ],
})
