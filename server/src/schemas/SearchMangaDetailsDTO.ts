import { z } from 'zod';

export const InformationSchema = z.object({
  authors: z.array(z.object({ url: z.string(), name: z.string() })),
  volumes: z.string(),
  status: z.string(),
  published: z.string().optional(),
  serialization: z.array(z.object({ url: z.string(), name: z.string() })).optional(),
  demographic: z.array(z.object({ url: z.string(), name: z.string() })).optional(),
  genres: z.array(z.object({ url: z.string(), name: z.string() })).optional(),
  chapters: z.string(),
  themes: z.array(z.object({ url: z.string(), name: z.string() })).optional(),
  type: z.array(z.object({ url: z.string(), name: z.string() })).optional(),
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
