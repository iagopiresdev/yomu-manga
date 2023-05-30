import { Router } from 'express';
import { MangaAPIProvider } from '../providers/MangaAPIProvider'; // Use the correct path
import { authMiddleware } from '../middlewares/ensureAuth';

const router = Router();
const mangaAPI = new MangaAPIProvider();

// Add endpoints to the router

// Endpoint to search for manga by name
router.get('/search/:name', authMiddleware, async (req, res) => {
  try {
    const result = await mangaAPI.searchMangaByName(req.params.name);
    res.json(result);
  } catch (err) {
    res.status(500).send((err as Error).toString());
  }
});

// Endpoint to get manga details by id
router.get('/:id', authMiddleware, async (req, res) => {
  try {
    const result = await mangaAPI.getMangaById(req.params.id);
    res.json(result);
  } catch (err) {
    res.status(500).send((err as Error).toString());
  }
});


router.get('/top/:type', authMiddleware, async (req, res) => {
    try {
      const type = req.params.type as 'all' | 'manga' | 'doujin' | 'manhwa' | 'manhua' | 'favorite' | 'bypopularity' | undefined;
      if (type === undefined || !['all', 'manga', 'doujin', 'manhwa', 'manhua', 'favorite', 'bypopularity'].includes(type)) {
        return res.status(400).send('Invalid type');
      }
      const result = await mangaAPI.getTopManga(type);
      res.json(result);
    } catch (err) {
      res.status(500).send((err as Error).toString());
    }
  });
  
  

// Endpoint to get manga recommendations by manga id
router.get('/:id/recommendations', authMiddleware, async (req, res) => {
  try {
    const result = await mangaAPI.getMangaRecommendations(req.params.id);
    res.json(result);
  } catch (err) {
    res.status(500).send((err as Error).toString());
  }
});

export default router;
