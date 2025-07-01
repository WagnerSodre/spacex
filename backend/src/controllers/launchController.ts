import { Request, Response } from 'express';
import {
  fetchNextLaunch,
  fetchLatestLaunch,
  fetchUpcomingLaunches,
  fetchPastLaunches
} from '../services/launchService';

export const getNextLaunch = async (_req: Request, res: Response) => {
  try {
    const data = await fetchNextLaunch();
    res.json(data);
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ error: 'Erro ao buscar o próximo lançamento.' });
  }
};

export const getLatestLaunch = async (_req: Request, res: Response) => {
  try {
    const data = await fetchLatestLaunch();
    res.json(data);
  } catch (error) {
    res.status(500).json({ error: 'Erro ao buscar o último lançamento.' });
  }
};

export const getUpcomingLaunches = async (_req: Request, res: Response) => {
  try {
    const data = await fetchUpcomingLaunches();
    res.json(data);
  } catch (error) {
    res.status(500).json({ error: 'Erro ao buscar os próximos lançamentos.' });
  }
};

export const getPastLaunches = async (_req: Request, res: Response) => {
  try {
    const data = await fetchPastLaunches();
    res.json(data);
  } catch (error) {
    res.status(500).json({ error: 'Erro ao buscar os lançamentos passados.' });
  }
};