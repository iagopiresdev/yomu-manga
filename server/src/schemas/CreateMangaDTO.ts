import { z } from 'zod';

export const MangaSchema = z.object({
  picture_url: z.string().url().optional(),
  alternative_titles: z.object({
    english: z.string().optional(),
    synonyms: z.string().optional(),
    japanese: z.string().optional(),
  }).optional(),
  information: z.object({
    authors: z.array(
      z.object({
        url: z.string().url().optional(),
        name: z.string().optional(),
      }).optional()
    ).optional(),
    volumes: z.string().optional(),
    status: z.string().optional(),
    published: z.string().optional(),
    serialization: z.union([
      z.array(
        z.object({
          url: z.string().url().optional(),
          name: z.string().optional(),
        }).optional()
      ),
      z.string()
    ]).optional(),
    demographic: z.union([
      z.array(
        z.object({
          url: z.string().url().optional(),
          name: z.string().optional(),
        }).optional()
      ),
      z.string()
    ]).optional(),
    
    genres: z.array(
      z.object({
        url: z.string().url().optional(),
        name: z.string().optional(),
      }).optional()
    ).optional(),
    chapters: z.string().optional(),
    themes: z.array(
      z.object({
        url: z.string().url().optional(),
        name: z.string().optional(),
      }).optional()
    ).optional(),
    type: z.array(
      z.object({
        url: z.string().url().optional(),
        name: z.string().optional(),
      }).optional()
    ).optional(),
  }).optional(),
  statistics: z.object({
    popularity: z.number().optional(),
    favorites: z.number().optional(),
    score: z.number().optional(),
    members: z.number().optional(),
    ranked: z.union([z.number(), z.string()]).optional(),
  }).optional(),  
  title_en: z.string().optional(),
  characters: z.union([z.array(
    z.object({
      picture_url: z.string().url().optional(),
      name: z.string().optional(),
      myanimelist_url: z.string().url().optional(),
    })
  ).optional(), z.record(z.unknown()).optional()]),
  
  synopsis: z.string().optional(),
  title_ov: z.string().optional(),
});

export type CreateMangaDTO = z.infer<typeof MangaSchema>;
