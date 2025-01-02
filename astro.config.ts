import { defineConfig } from 'astro/config';
import starlight from '@astrojs/starlight';
import tailwind from '@astrojs/tailwind';

import vue from '@astrojs/vue';
import Icons from 'unplugin-icons/vite';
import IconsResolver from 'unplugin-icons/resolver';
import Components from 'unplugin-vue-components/vite';

import partytown from '@astrojs/partytown';

import sitemap from '@astrojs/sitemap';

// https://astro.build/config
export default defineConfig({
  site: 'https://formwerk.dev',
  vite: {
    plugins: [
      Components({
        resolvers: [
          IconsResolver({
            enabledCollections: ['ph', 'vscode-icons'],
          }),
        ],
      }),
      Icons({
        compiler: 'vue3',
        defaultClass: 'fill-current flex-shrink-0',
      }),
    ],
  },
  integrations: [
    starlight({
      title: 'Formwerk',
      logo: {
        dark: './public/logo-dark.svg',
        light: './public/logo-light.svg',
        alt: 'Formwerk',
        replacesTitle: true,
      },
      head: [
        {
          tag: 'meta',
          attrs: {
            property: 'og:image',
            content: '/og-image.jpg',
          },
        },
        {
          tag: 'script',
          attrs: {
            type: 'text/partytown',
            async: true,
            src: 'https://www.googletagmanager.com/gtag/js?id=G-CVDZRK6FZF',
          },
        },

        {
          tag: 'script',
          attrs: {
            type: 'text/partytown',
            lang: 'js',
          },
          content: `
            const dataLayer = window.dataLayer || [];

            function gtag() {
              // eslint-disable-next-line prefer-rest-params
              dataLayer.push(arguments);
            }

            gtag('js', new Date());

            gtag('config', 'G-CVDZRK6FZF');
          `,
        },
      ],
      favicon: '/favicon.svg',
      social: {
        github: 'https://github.com/formwerkjs/formwerk',
        discord: 'https://discord.gg/gQ7wqpvT5X',
      },
      customCss: ['./src/tailwind.css'],
      sidebar: [
        {
          label: 'Introduction',
          items: [
            'guides/getting-started',
            'guides/why',
            'guides/composables',
            'showcase',
          ],
        },
        {
          label: 'Fields',
          autogenerate: { directory: 'guides/fields' },
        },
        {
          label: 'Forms',
          autogenerate: { directory: 'guides/forms' },
        },
        {
          label: 'Starter Kits',
          items: ['starter-kits/minimal'],
        },
        {
          label: 'Extras',
          autogenerate: { directory: 'extras' },
        },
      ],
      editLink: {
        baseUrl: 'https://github.com/formwerkjs/formwerk.dev/edit/main/',
      },
    }),
    tailwind({
      applyBaseStyles: false,
    }),
    vue(),
    partytown({ config: { forward: ['dataLayer.push'] } }),
    sitemap(),
  ],
});
