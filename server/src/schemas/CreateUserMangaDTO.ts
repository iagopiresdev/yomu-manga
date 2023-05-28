import * as z from 'zod';

export const UserMangaSchema = z.object({
  userId: z.string(),
  mangaId: z.string(),
  status: z.string(),
  chaptersRead: z.number(),
});

export type CreateUserMangaDTO = z.infer<typeof UserMangaSchema>;
