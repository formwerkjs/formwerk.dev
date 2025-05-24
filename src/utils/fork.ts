/* eslint-disable @typescript-eslint/ban-ts-comment */
import type { Project } from '@stackblitz/sdk';
import { version as fwVersion } from '@formwerk/core';

export async function getViteProjectConfig(
  files: Record<string, string>,
): Promise<Project> {
  const [
    prettier,
    typescriptParser,
    estreeParser,
    parserBabel,
    parserHtml,
    parserPostcss,
  ] = await Promise.all([
    import('prettier/standalone'),
    import('prettier/plugins/typescript'),
    import('prettier/plugins/estree'),
    import('prettier/parser-babel'),
    import('prettier/parser-html'),
    import('prettier/plugins/postcss'),
  ]);

  const formattedFiles: Record<string, string> = {};
  for (const [file, content] of Object.entries(files)) {
    formattedFiles[file] = await prettier.format(content, {
      parser: 'vue',
      plugins: [
        parserBabel,
        // @ts-ignore
        estreeParser,
        typescriptParser,
        parserHtml,
        parserPostcss,
      ],
    });
  }

  return {
    template: 'node',
    title: `Formwerk Demo`,
    description: 'Blank starter project for Formwerk projects',
    files: {
      'package.json': `{
  "name": "formwerk-demo",
  "private": true,
  "version": "0.0.0",
  "type": "module",
  "scripts": {
    "dev": "vite",
    "build": "vite build",
    "preview": "vite preview"
  },
  "dependencies": {
    "vue": "^3.5.14",
    "@formwerk/core": "^${fwVersion}",
    "@internationalized/date": "^3.8.1"
  },
  "devDependencies": {
    "@vitejs/plugin-vue": "^5.2.4",
    "vite": "^6.3.5",
    "typescript": "5.3.3"
  }
}`,
      'index.html': `<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <link rel="icon" type="image/svg+xml" href="/vite.svg" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Vite + Vue</title>
  </head>
  <body>
    <div id="app"></div>
    <script type="module" src="/src/main.ts"></script>
  </body>
</html>`,
      'src/main.ts': `import { createApp } from 'vue';
      import App from './App.vue';

      createApp(App).mount('#app');
      `,
      'vite.config.js': `import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue()],
});
`,
      'README.md': `# Formwerk Demo

This is a blank starter project for Formwerk projects.
`,
      ...Object.fromEntries(
        Object.entries(formattedFiles).map(([file, content]) => [
          `src/${file}`,
          content.replaceAll('./formwerk-core-types', '@formwerk/core'),
        ]),
      ),
    },
  };
}
