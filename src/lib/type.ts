import { z } from 'zod';

export const ArticleSchema = z.object({
  author: z.string().nullable(), // Si l'auteur peut être null
  title: z.string(),
  description: z.string().nullable(), // Si la description peut être null
  url: z.string().url(),
  urlToImage: z.string().url().nullable(), // Si l'image peut être null
  publishedAt: z.string(), // Vous pouvez utiliser `z.date()` si vous parsez en Date
  content: z.array(z.string()), // Tableau de chaînes
});

export const ParamsSchema = z.object({
  id: z.string(),
});
export const UserSchema = z.object({
  id: z.string(),
  year: z.number(),
  job: z.string(),
  name: z.string(),
  created_at: z.string(),
});
// Types dérivés des schémas Zod
export type Article = z.infer<typeof ArticleSchema>;
export type Params = z.infer<typeof ParamsSchema>;
export type User = z.infer<typeof UserSchema>;