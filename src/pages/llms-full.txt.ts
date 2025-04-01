// src/pages/llms.txt.ts
import type { APIRoute } from 'astro';
import { getCollection } from 'astro:content';

const llmIgnore = [
  'getting-started',
  'showcase',
  'starter-kits',
  'composables',
];

// Function to extract the frontmatter as text
const extractFrontmatter = (content: string): string => {
  const frontmatterMatch = content.match(/^---\n([\s\S]*?)\n---/);

  return frontmatterMatch ? frontmatterMatch[1] : '';
};

// Function to clean content while keeping frontmatter
const cleanContent = (content: string): string => {
  // Extract the frontmatter as text
  const frontmatterText = extractFrontmatter(content);

  // Remove the frontmatter delimiters
  let cleanedContent = content.replace(/^---\n[\s\S]*?\n---/, '');

  // Clean up MDX-specific imports

  cleanedContent = cleanedContent.replace(
    /import\s+.*\s+from\s+['"]@astrojs\/starlight\/components['"];?\s*/g,
    '',
  );

  // Remove MDX component declarations

  // Remove Astro Starlight internal component tags while preserving content
  cleanedContent = cleanedContent.replace(/<Steps[^>]*>/g, '');
  cleanedContent = cleanedContent.replace(/<\/Steps>/g, '');
  cleanedContent = cleanedContent.replace(/<Tabs[^>]*>/g, '');
  cleanedContent = cleanedContent.replace(/<\/Tabs>/g, '');
  cleanedContent = cleanedContent.replace(/<TabItem[^>]*>/g, '');
  cleanedContent = cleanedContent.replace(/<\/TabItem>/g, '');

  // Remove Shiki Twoslash syntax like // @noErrors

  cleanedContent = cleanedContent.replace(/\/\/\s*@noErrors/g, '');

  cleanedContent = cleanedContent.replace(/\/\/\s*@(.*?)$/gm, ''); // Remove other Shiki Twoslash directives

  // Clean up multiple newlines

  cleanedContent = cleanedContent.replace(/\n\s*\n\s*\n/g, '\n\n');

  // Return the frontmatter as text, followed by the cleaned content
  return frontmatterText + '\n\n' + cleanedContent.trim();
};

export const GET: APIRoute = async () => {
  try {
    // Get all blog posts sorted by date (newest first)
    const posts = await getCollection(
      'docs',
      ({ data, slug }) => !data.draft && !llmIgnore.includes(slug),
    );

    // Generate the content
    let llmsContent = '';

    for (const post of posts) {
      // Add post metadata in the format similar to the example

      llmsContent += `--- title: ${post.data.title} description: ${
        post.data.description
      } ---\n\n`;

      // Add the post title as a heading

      llmsContent += `# ${post.data.title}\n\n`;

      // Process the content, keeping frontmatter as text
      const processedContent = cleanContent(post.body);

      llmsContent += processedContent + '\n\n';

      // Add separator between posts

      llmsContent += '---\n\n';
    }

    // Return the response as plain text
    return new Response(llmsContent, {
      headers: { 'Content-Type': 'text/plain; charset=utf-8' },
    });
  } catch (error) {
    console.error('Failed to generate llms.txt:', error);
    return new Response('Error generating llms.txt', {
      status: 500,
    });
  }
};
