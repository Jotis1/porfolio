import { z, defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';

const collectionSchema = z.object({
    title: z.string(),
    description: z.string(),
    date: z.date(),
    slug: z.string(),
    author: z.object({
        name: z.string(),
        avatar: z.string().url(),
        link: z.string().url(),
    }),
});

const blog = defineCollection({
    loader: glob({
        pattern: '**/*.md',
        base: './src/data/blog',
    }),
    schema: collectionSchema,
});

export const collections = { blog };