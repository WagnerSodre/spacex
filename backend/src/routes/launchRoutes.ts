import { Router } from 'express';
import {
  getNextLaunch,
  getLatestLaunch,
  getUpcomingLaunches,
  getPastLaunches
} from '../controllers/launchController';

const router = Router();

router.get('/next', getNextLaunch);
router.get('/latest', getLatestLaunch);
router.get('/upcoming', getUpcomingLaunches);
router.get('/past', getPastLaunches);

export default router;
