import { z } from 'zod';

export const InformationSchema = z.object({
  authors: z.array(z.object({ url: z.string(), name: z.string() })),
  volumes: z.string(),
  status: z.string(),
  published: z.string(),
  serialization: z.array(z.object({ url: z.string(), name: z.string() })),
  demographic: z.array(z.object({ url: z.string(), name: z.string() })),
  genres: z.array(z.object({ url: z.string(), name: z.string() })),
  chapters: z.string(),
  themes: z.array(z.object({ url: z.string(), name: z.string() })),
  type: z.array(z.object({ url: z.string(), name: z.string() })),
});

export const StatisticsSchema = z.object({
  popularity: z.number(),
  favorites: z.number(),
  score: z.number(),
  members: z.number(),
  ranked: z.number(),
});

export const CharactersSchema = z.array(
  z.object({
    picture_url: z.string(),
    name: z.string(),
    myanimelist_url: z.string(),
  })
);

export const MangaByIdSchema = z.object({
  picture_url: z.string(),
  alternative_titles: z.object({
    english: z.string().optional(),
    synonyms: z.string().optional(),
    japanese: z.string().optional(),
  }),
  information: InformationSchema,
  statistics: StatisticsSchema,
  title_en: z.string().optional(),
  characters: CharactersSchema,
  synopsis: z.string(),
  title_ov: z.string(),
});

export type MangaByIdDTO = z.infer<typeof MangaByIdSchema>;
