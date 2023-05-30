import { z } from 'zod';

export const MangaSearchResultSchema = z.object({
  myanimelist_url: z.string(),
  title: z.string(),
  description: z.string(),
  picture_url: z.string(),
  myanimelist_id: z.number(),
});

export type MangaSearchResultDTO = z.infer<typeof MangaSearchResultSchema>;
