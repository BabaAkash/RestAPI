import express from 'express';
import { Router } from 'express';

import {randomJoke} from '../controller/randomJoke';

const router: Router = express.Router();

router.get('/random-joke',randomJoke);

export default router;