import { Router } from 'express';
import {
    login,
    registrarUsuario
} from '../controllers/auth.controller.js';
import { limitadorLogin } from '../middlewares/rateLimit.middleware.js';

const router = Router();

router.post('/', registrarUsuario);
router.post('/login', limitadorLogin, login);

export default router;
