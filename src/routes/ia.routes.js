import { Router } from 'express';
import { generarTexto } from '../controllers/ia.controller.js';

const router = Router();

router.post('/', generarTexto);

export default router;
