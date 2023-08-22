import express from 'express';
import { Router } from 'express';
import {Auth} from '../authorization/auth';

import {signup, login,logout,userProfile} from '../controller/user';
const router: Router = express.Router();

router.post('/users/signup', signup);
router.post('/users/login', login);
router.get('/users/profile', Auth, userProfile);
router.get('/users/logout', Auth, logout);

export default router;