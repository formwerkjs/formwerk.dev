---
title: Why Formwerk?
description: Why we think you should choose Formwerk over other form libraries.
---

### A Balance of Abstraction and Control

Forms are a crucial part of web applications and are one of the first things you learn as a web developer. Unfortunately, forms are hard.

There are too many expectations today on what forms should offer: data collection is non-negotiable, validation is nice to have, delightful interaction is desired, and accessibility is a must that often gets overlooked.

The web already offers a solid foundation on many of these aspects, but it falls short when it comes to using it in modern web applications due to the ever-increasing complexity in how we build our applications.

With many libraries to choose from, there isn't a one-size-fits-all solution. In the Vue ecosystem, we have a couple of schools of thought on how to build forms:

- **Headless Implementations:** By offering composables that help you handle some aspects of form building, like validation, and leave the rest up to you.
- **UI Libraries:** Whether or not they focus on forms, UI libraries often tick all of the feature boxes mentioned above and more. But they can force you into a "reward early, punish later" kind of situation. UI libraries are usually opinionated on their style and brand, and even if you can override or customize them, they are opinionated on the markup, which limits your ability to style them.

Both approaches try to balance two important aspects: Abstraction and Control. You lose some control when you abstract too much, and you lose function and introduce friction when you don't abstract enough.

We took a look at both approaches and found there yet exists a gap in the middle where a different balance of abstraction and control can be achieved.

We don't want the developer to write too much code with low-level abstraction, nor do we think they should fight a losing battle against styles and markup.

### So, Only JavaScript?

You might be wondering about being forced to fight the JavaScript and how it might be even harder than styles and markup.

Formwerk offers some opinionated choices, some of which are configurable. Maybe you don't want the mouse wheel to be used to increment a number field, or maybe you want to disable the native HTML validation for your fields or forms.

However, some decisions are not configurable. For example, you can't disable the keyboard interaction of a checkbox, nor the keyboard navigability of a select field's list box, as those will hurt your users.

Of course, nothing is set in stone, and we can always revisit decisions and make them configurable based on your feedback and use-cases.

### What Are You Getting

Formwerk offers a different approach to building forms. It provides a set of composables that help you build specific form components in a way that you are in full control over the markup and styling.

Each composable offers:

- First-class accessibility support with meticulous attention to common ARIA patterns.
- An adaptive API that adapts to the way you like to build forms. Hidden labels but still want the field accessible? We got you covered.
- Value tracking and collection, even with non-input elements.
- Behavior and user interaction via keyboard that adheres to each component's native HTML counterpart standard. Custom checkboxes behave exactly the same as native checkboxes.
- Multi-level form validation with native HTML constraints and custom validation schemas with popular libraries like Yup and Zod.
- First-class internationalization and RTL support.
- A consistent API for both simple and complex form components.

We don't intend to do everything, but rather we want to offer a solid foundation that helps you build high-quality forms that are both accessible and delightful to use.

That means there is no UI, no styles, no markup. That's up to you to build.

### Who Is Formwerk For?

Formwerk is for builders who want to build design systems from scratch and want to have a solid foundational baseline so that they can focus on the business logic and the brand design for many years to come. At the same time, if Formwerk doesn't work for them, they can easily dismantle it from their components.

Formwerk is also for UI library developers who want to offer a solid offering of form components to their users. No point for those authors to re-implement the same behavior that users expect today in form components. In other words, if you as an author use Formwerk, you can focus on your library's main offering: delightful UI and a great developer experience.

Formwerk is not for:

- Those who use existing UI libraries.
- Those who are looking to prototype fast. Building with Formwerk is fast, but not as fast as using a UI library.

## Why Not ....?

All those libraries are excellent at what they do, and you won't go wrong with any of them, assuming you understand the trade-offs.

### vee-validate

I'm the author of vee-validate, and I'm proud of what we've built there for 7+ years now. It does many things well.

However, I consider it to be a bit low-level for building form components. There is still a lot of stuff you have to implement yourself. vee-validate doesn't cover accessibility, internationalization, interaction, nor behaviors, which is why many users pair it with other UI libraries.

Formwerk is an attempt to offer a more complete solution for building forms by stepping up the abstraction level a notch or two. Formwerk takes a lot of key learnings from vee-validate and applies them broadly to form building.

### FormKit

> FormKit is more than a UI library. It is comprehensive with a lot of features and great developer experience.

FormKit is a great library that tackles everything about forms really well, including UI. But this is where FormKit and Formwerk differ; we think UI is personal and should be tailored to your brand. No matter how much you can configure or override by slots or by props, you are one design away from considering a rewrite. Granted, this does not happen often.

This "reward early" approach will definitely help you build forms 10x faster. But if you have to dismantle it, you'll be punished. Formwerk, on the other hand, is as easy to dismantle as it is to build with.

Formwerk doesn't offer any UI. You own your markup, you own your styles. For everything else, Formwerk has you covered. You can build your UI with either plain CSS, Tailwind, or that cool new thing you found on BlueSky last week. There is nothing to override, nothing to configure.

### Vuelidate

A great option for validation. But out of all the options available, it is one with the lowest level of abstraction.

This means you have control over every other aspect. Albeit by omission rather than design, this means you have to implement everything except the validation.

### Tanstack Forms

Formwerk and Tanstack forms agree on offering a headless approach to form building. However Tankstack lives on the lower end of the abstraction scale.

This means while it offers the tools needed to build fields, it doesn't cater to each field's unique needs in terms of accessibility, interaction, and behavior.

Formwerk addresses form concerns like internationalization on a broader scale. It goes beyond just localized messages, ensuring that international users can interact with forms naturally. This includes support for different numbering systems, various date formats and calendars, and more.

On the other hand, Formwerk offers less flexibility in certain aspects like when to validate a field, but that's mostly due to philosophical differences, you can read more about it in the [Validation](/guides/forms/validation/) guide.
