import { Router } from 'express';
import { generarTexto, cargarProductoConIA} from '../controllers/ia.controller.js';

const router = Router();

router.post('/', cargarProductoConIA);

export default router;
