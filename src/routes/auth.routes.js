import { Router } from 'express';
import {
    login,
    registrarUsuario
} from '../controllers/auth.controller.js';

const router = Router();

router.post('/', registrarUsuario);
router.post('/login', login);

export default router;
