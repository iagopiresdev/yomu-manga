import { Router } from 'express';
import { OpenAiProvider } from '../providers/OpenAiProvider';
import { authMiddleware } from '../middlewares/ensureAuth';

const router = Router();
const openAiProvider = new OpenAiProvider();

router.post('/', async (req, res) => {
    try {
        const manga = req.body.mangas.join(", ");

        const response = await openAiProvider.getMangaListRecomendation(manga);
        res.json(response);

    } catch (err) {
        res.status(500).send(err);
    }
});

router.post('/chat', authMiddleware, async (req, res) => {
    try {
        const question = req.body.question;
        const context = req.body.context;
        
        const response = await openAiProvider.getChatAnswer(question, context);
        res.json(response);

    } catch (err) {
        res.status(500).send(err);
    }
});

router.post('/chat/recommendation', async (req, res) => {
    try {
        const question = "What manga should I read next?";
        const context = `I have read the following mangas: ${req.body.mangas.join(", ")}.`;

        const response = await openAiProvider.getRecommendation(question, context);
        res.json(response);

    } catch (err) {
        res.status(500).send(err);
    }
});


export default router;
