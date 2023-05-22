import { z } from 'zod';

export const MangaSchema = z.object({
  picture_url: z.string(),
  alternative_titles: z.object({
    japanese: z.string(),
    english: z.string(),
  }),
  information: z.object({
    authors: z.array(z.object({ url: z.string(), name: z.string() })),
    volumes: z.string(),
    status: z.string(),
    published: z.string(),
    serialization: z.array(z.object({ url: z.string(), name: z.string() })),
    demographic: z.array(z.object({ url: z.string(), name: z.string() })),
    genres: z.array(z.object({ url: z.string(), name: z.string() })),
    chapters: z.string(),
    theme: z.array(z.object({ url: z.string(), name: z.string() })),
    type: z.array(z.object({ url: z.string(), name: z.string() })),
  }),
  statistics: z.object({
    popularity: z.number(),
    favorites: z.number(),
    score: z.number(),
    members: z.number(),
    ranked: z.number(),
  }),
  title_en: z.string().optional(),
  characters: z.array(
    z.object({
      picture_url: z.string(),
      name: z.string(),
      myanimelist_url: z.string(),
    })
  ),
  synopsis: z.string(),
  title_ov: z.string(),
});

export type CreateMangaDTO = z.infer<typeof MangaSchema>;
