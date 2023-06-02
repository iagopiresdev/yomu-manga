import { z } from 'zod';

const MangaSearchResultSchema = z.array(
  z.object({    
    myanimelist_id: z.number(),
    myanimelist_url: z.string().url(),
    title: z.string(),
    description: z.string().optional(),
    picture_url: z.string().url(),

  })
);

export type MangaSearchResultDTO = z.infer<typeof MangaSearchResultSchema>;
