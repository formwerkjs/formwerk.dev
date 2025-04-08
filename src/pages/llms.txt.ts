import type { APIRoute } from 'astro';

const content = `# Formwerk Documentation

> Formwerk is a library of headless composables for Vue.js that helps you build accessible, high-quality form components for your applications or design systems. It offers a comprehensive tree-shakable set of composables that handle accessibility, interaction, validation, and best practices out of the box.

Formwerk provides a balanced approach between abstraction and control, allowing you to maintain full control over markup and styling while providing robust functionality for form components. It doesn't include any UI, styles, or predetermined markup - those aspects are for you to implement according to your needs.

## Guides

- [Getting Started](/guides/getting-started/): An introduction on how to get started with Formwerk
- [Why Formwerk](/guides/why/): A detailed explanation of Formwerk's philosophy and advantages
- [Composables](/guides/composables/): Overview of all available composables in Formwerk

## Form Components

- [Forms Index](/guides/forms/index/): Comprehensive documentation for working with forms
- [Form Validation](/guides/forms/validation/): How to implement multi-level form validation
- [Form Groups](/guides/forms/form-groups/): Working with form groups
- [Form Repeater](/guides/forms/form-repeater/): Creating repeatable form sections

## Field Components

- [Text Fields](/guides/fields/text-fields/): Documentation for text input fields
- [Number Fields](/guides/fields/number-fields/): Working with numeric input fields
- [Search Fields](/guides/fields/search-fields/): Creating search input components
- [Checkboxes](/guides/fields/checkboxes/): Implementation of checkbox components
- [Radios](/guides/fields/radios/): Creating radio button components
- [Selects](/guides/fields/selects/): Implementation of select/dropdown components
- [Comboboxes](/guides/fields/comboboxes/): Creating combobox components
- [Date Fields](/guides/fields/date-fields/): Working with date input fields
- [Time Fields](/guides/fields/time-fields/): Creating time input components
- [Calendars](/guides/fields/calendars/): Implementing calendar components
- [File Fields](/guides/fields/file-fields/): Handling file uploads
- [OTP Fields](/guides/fields/otp-fields/): Creating one-time password fields
- [Sliders](/guides/fields/sliders/): Implementing slider input components
- [Switches](/guides/fields/switches/): Creating toggle switch components
- [Hidden Fields](/guides/fields/hidden-fields/): Working with hidden input fields
- [Custom Fields](/guides/fields/custom-fields/): Building custom field components

## Extras

- [Internationalization](/extras/i18n/): Support for multiple languages and locales
- [Styling](/extras/styling/): Best practices for styling Formwerk components
- [Server-Side Rendering](/extras/ssr/): Using Formwerk with SSR
- [Resources](/extras/resources/): Additional helpful resources

## Optional

- [Showcase](/showcase/): Examples of Formwerk in action
- [Starter Kits](/starter-kits/minimal/): Pre-configured templates to get started quickly
`;

export const GET: APIRoute = async () => {
  return new Response(content, {
    headers: { 'Content-Type': 'text/plain; charset=utf-8' },
  });
};
