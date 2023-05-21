import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

export const getAll = async (req: Request, res: Response) => {
  try {
      const mangas = await prisma.manga.findMany();
      res.status(200).json(mangas);
  } catch (error) {
      if (error instanceof Error) {
          res.status(400).json({ error: error.message });
      } else {
          res.status(400).json({ error: 'An unknown error occurred' });
      }
  }
}



export async function create(req, res) {
  // create manga logic goes here
}

export async function getOne(req, res) {
  // get one manga logic goes here
}

export async function update(req, res) {
  // update manga logic goes here
}

export async function deletee(req, res) {
  // delete manga logic goes here
}
