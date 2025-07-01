import { Request, Response } from 'express';
import { askSpaceXBot } from '../services/chatService';

export const chatWithBot = async (req: Request, res: Response): Promise<void> => {
  const { message } = req.body;

  if (!message) {
    res.status(400).json({ error: 'Mensagem não fornecida.' });
    return;
  }

  try {
    const reply = await askSpaceXBot(message);
    res.json({ reply });
  } catch (error) {
    console.error('Erro no Gemini bot:', error);
    res.status(500).json({ error: 'Erro ao processar a mensagem.' });
  }
};
