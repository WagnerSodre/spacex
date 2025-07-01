import { DynamicTool } from 'langchain/tools';
import fetch from 'node-fetch';

export const getNextLaunchTool = new DynamicTool({
  name: 'get_next_spacex_launch',
  description: 'Retorna dados sobre o próximo lançamento da SpaceX',
  func: async () => {
    const res = await fetch('http://localhost:3000/launch/next');
    const data = await res.json();
    return JSON.stringify(data);
  }
});

export const getLatestLaunchesTool = new DynamicTool({
  name: 'get_latest_spacex_launches',
  description: 'Retorna o lançamento mais recente da SpaceX',
  func: async () => {
    const res = await fetch('http://localhost:3000/launch/latest');
    const data = await res.json();
    return JSON.stringify(data);
  }
});
