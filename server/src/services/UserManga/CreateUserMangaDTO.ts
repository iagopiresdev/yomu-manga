import * as z from 'zod';

export const CreateUserMangaDTO = z.object({
  userId: z.string(),
  mangaId: z.string(),
});
