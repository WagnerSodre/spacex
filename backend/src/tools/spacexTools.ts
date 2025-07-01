import { DynamicTool } from 'langchain/tools';
import fetch from 'node-fetch';

const API_BASE_URL = process.env.API_BASE_URL;

export const getNextLaunchTool = new DynamicTool({
  name: 'get_next_spacex_launch',
  description: 'Retorna dados sobre o próximo lançamento da SpaceX',
  func: async () => {
    const res = await fetch(`${API_BASE_URL}/launch/next`);
    const data = await res.json();
    return JSON.stringify(data);
  }
});

export const getLatestLaunchesTool = new DynamicTool({
  name: 'get_latest_spacex_launches',
  description: 'Retorna o lançamento mais recente da SpaceX',
  func: async () => {
    const res = await fetch(`${API_BASE_URL}/launch/latest`);
    const data = await res.json();
    return JSON.stringify(data);
  }
});
