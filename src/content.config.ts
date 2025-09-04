import { z, defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';

const blog = defineCollection({
    loader: glob({
        pattern: '**/*.md',
        base: './src/content/blog',
    }),
    schema: z.object({
        title: z.string(),
        description: z.string(),
        date: z.date(),
        slug: z.string().optional(),
        og_image: z.string().optional(),
        author: z.object({
            name: z.string(),
            avatar: z.string().url(),
            link: z.string().url(),
        })
    }),
});

export const collections = { blog };