import axios from 'axios';
import { getCache, setCache } from '../utils/cache';
import { withPending } from '../utils/pending';

const api = axios.create({
  baseURL: process.env.SPACEX_API
});

export const fetchNextLaunch = async () => {
  const cacheKey = 'nextLaunch';
  const cached = await getCache(cacheKey);
  if (cached) return cached;

  return withPending(cacheKey, async () => {
    const { data } = await api.get('/launches/next');
    try {
        await setCache(cacheKey, data, 300);
    } catch (e) {
        console.warn(`Erro ao salvar no cache (${cacheKey}):`, e);
    }
    return data;
  });
};

export const fetchLatestLaunch = async () => {
  const cacheKey = 'latestLaunch';
  const cached = await getCache(cacheKey);
  if (cached) return cached;

  return withPending(cacheKey, async () => {
    const { data } = await api.get('/launches/latest');
    try {
        await setCache(cacheKey, data, 300);
    } catch (e) {
        console.warn(`Erro ao salvar no cache (${cacheKey}):`, e);
    }
    return data;
  });
};

export const fetchUpcomingLaunches = async () => {
  const cacheKey = 'upcomingLaunches';
  const cached = await getCache(cacheKey);
  if (cached) return cached;

  return withPending(cacheKey, async () => {
    const { data } = await api.get('/launches/upcoming');
    try {
        await setCache(cacheKey, data, 300);
    } catch (e) {
        console.warn(`Erro ao salvar no cache (${cacheKey}):`, e);
    }
    return data;
  });
};

export const fetchPastLaunches = async () => {
  const cacheKey = 'pastLaunches';
  const cached = await getCache(cacheKey);
  if (cached) return cached;

  return withPending(cacheKey, async () => {
    const { data } = await api.get('/launches/past');
    try {
        await setCache(cacheKey, data, 300);
    } catch (e) {
        console.warn(`Erro ao salvar no cache (${cacheKey}):`, e);
    }
    return data;
  });
};
