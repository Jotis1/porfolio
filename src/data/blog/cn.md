---
title: "Better class management in TailwindCSS with clsx and tailwindmerge"
description: "Learn how to manage dynamic CSS classes efficiently using clsx and tailwindmerge, optimizing your TailwindCSS styles."
date: 2025-03-15
author: 
  name: "Jotis"
  avatar: "https://github.com/jotis1.png"
  link: "https://github.com/jotis1"
slug: "better-class-management-clsx-tailwindmerge"
---
## Introduction

Sometimes, managing dynamic CSS classes in your components can be a bit tricky (especially with utility-first frameworks like TailwindCSS), **but not for me!** (and soon, not for you either).

Everytime when I write posts like this, I always try to answer the question: _"Ok, but what does this solve?"_ and in this case, the answer is simple:

1. **Cleaner code:** By using `clsx` and `tailwindmerge`, you can keep your logic clean and focused on what matters.
2. **Optimized styles:** Only the necessary classes are applied, which can improve the rendering performance of your components.

Before diving into the examples, let's understand what `clsx` and `tailwindmerge` are and how they can help you manage your classes more efficiently.

- **clsx:** A minimalist library for conditionally concatenating class names. It lets you combine classes without cluttering your logic.
- **tailwindmerge:** A utility that intelligently merges TailwindCSS classes, resolving conflicts and eliminating duplicates, particularly when classes are generated dynamically.

Ok, that was simple, right? Now, time for some code examples!

### Example **#1** - Basic Usage
Imagine you want to add a lot of classes to an element, that will look like this:

```tsx
// ❌ BAD WAY
<div class='flex items-center justify-center px-5 py-1.5 rounded-2xl bg-indigo-400 text-white font-semibold text-sm'>
  Hello, World!
</div>
```

That's a lot of classes! Even this website can't handle that and it just overflows the code component. But with `clsx` and `tailwindmerge`, you can simplify it like this:

```tsx
// ✅ GOOD WAY
<div className={cn(
    'flex items-center justify-center', // Structure classes
    'px-5 py-1.5', // Padding classes
    'rounded-2xl bg-indigo-400', // Decoration classes
    'text-white font-semibold text-sm' // Text classes
)}>
  Hello, World!
</div>
```
> **Note:** You don't need to comment each group of classes, I just did it for better readability.

### Example **#2** - Conditional Classes
Now, let's say you want to add a class conditionally. You can do it like this:

```tsx
// ❌ BAD WAY
const { variant } = props;

<div className={`${variant === 'primary' ? 'bg-indigo-400 text-white' : 'bg-gray-200 text-gray-800'}`}>
  Hello, World!
</div>
```

This is not bad, but it can get messy with more conditions. With `clsx`, you can simplify it like this:

```tsx
// ✅ GOOD WAY
const { variant } = props;

<div className={cn(
    variant === 'primary' && 'bg-indigo-400 text-white',
    variant === 'secondary' && 'bg-gray-200 text-gray-800',
)}>
  Hello, World!
</div>
```

### Example **#3** - Merging TailwindCSS Classes
Imagine you have a component that receives a `className` prop and you want to merge it with TailwindCSS classes. You can do it like this:

```tsx
// ❌ BAD WAY
const { className } = props;

<div className={`${className} px-5 py-1.5 rounded-2xl bg-indigo-400 text-white font-semibold text-sm`}>
  Hello, World!
</div>
```

This is, indeed, pretty bad. Tailwind will probably generate a lot of classes that you don't need. With `tailwindmerge`, you can simplify it like this:

```tsx
// ✅ GOOD WAY
const { className } = props;

<div className={cn(
    className,
    'px-5 py-1.5',
    'rounded-2xl bg-indigo-400',
    'text-white font-semibold text-sm',
)}>
  Hello, World!
</div>
```

## I know why, but how?
Have you noticed the utility function used in the examples? It's `cn`! This simple function combines `clsx` and `tailwindmerge` to streamline your class management. Here's how it looks:

```tsx
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwindmerge';

export const cn = (...classes: ClassValue[]) => clsx(twMerge(classes));
```

And that's it! You can now use `cn` in your components to manage your classes more efficiently.

## Conclusion
By using `clsx` and `tailwindmerge`, you can manage your dynamic CSS classes more efficiently, keeping your code clean and optimized. This can lead to better performance and a more enjoyable development experience.

I hope you found this post helpful! If you have any questions or feedback, feel free to reach out. Happy coding! 🚀

---

Thank for reading and take care with your classes! 😉