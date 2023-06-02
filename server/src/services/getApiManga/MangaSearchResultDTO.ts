import { z } from 'zod';

export const MangaSearchResultItemSchema = z.object({
  title: z.string(),
  description: z.string(),
  picture_url: z.string().url(),
  myanimelist_url: z.string().url(),
  myanimelist_id: z.number(),
});

export const MangaSearchResultSchema = z.array(MangaSearchResultItemSchema);

export type MangaSearchResultDTO = z.infer<typeof MangaSearchResultItemSchema>;
export type MangaSearchResultsDTO = z.infer<typeof MangaSearchResultSchema>;
