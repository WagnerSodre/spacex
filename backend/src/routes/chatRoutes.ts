import { Router } from 'express';
import { chatWithBot } from '../controllers/chatController';

const router = Router();

router.post('/', chatWithBot);

export default router;
