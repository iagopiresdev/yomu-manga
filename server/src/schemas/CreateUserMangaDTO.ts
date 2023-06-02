import * as z from 'zod';

export const UserMangaSchema = z.object({
  userId: z.string().optional(),
  mangaId: z.string(),
  status: z.string().optional(),
  chaptersRead: z.number().optional(),
});

export type CreateUserMangaDTO = z.infer<typeof UserMangaSchema>;
