import { Router } from 'express';
import { obtenerClima } from '../controllers/externo.controller.js';

const router = Router();

router.get('/', obtenerClima);

export default router;
