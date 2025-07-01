import { ChatGoogleGenerativeAI } from '@langchain/google-genai';
import { HumanMessage, SystemMessage } from '@langchain/core/messages';
import { getNextLaunchTool, getLatestLaunchesTool } from '../tools/spacexTools';

export async function askSpaceXBot(question: string) {
  const chat = new ChatGoogleGenerativeAI({
    apiKey: process.env.GOOGLE_API_KEY,
    model: 'gemini-2.0-flash',
    temperature: 0.3
  });

  let toolData = '';

  // Exemplo simples: só trata perguntas sobre o próximo lançamento
  if (question.toLowerCase().includes('ximo lançamento')) {
    const raw = await getNextLaunchTool.func("");
    toolData = `Dados do próximo lançamento: ${raw}`;
  }

  if (question.toLowerCase().includes('ltimo lançamento')) {
    const raw = await getLatestLaunchesTool.func("");
    toolData = `Dados do último lançamento: ${raw}`;
  }

  const response = await chat.call([
    new SystemMessage("Você é um assistente especialista em lançamentos da SpaceX. Use os dados fornecidos para responder com precisão."),
    new HumanMessage(`${toolData}\n\nUsuário: ${question}`)
  ]);

  return response.text;
}
