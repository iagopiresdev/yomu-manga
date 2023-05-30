import { z } from 'zod';

export const TopMangaSchema = z.array(z.object({
    title: z.string(),
    picture_url: z.string().url(),
    myanimelist_url: z.string().url(),
    myanimelist_id: z.number(),
    rank: z.number(),
    score: z.number(),
    type: z.string(),
    aired_on: z.string(),
    members: z.number(),
  }));

export type TopMangaDTO = z.infer<typeof TopMangaSchema>;