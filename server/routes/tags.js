import express from 'express';
import { GetTags } from '../controller/tags.js';

const router = express.Router();

router.get('/GetTags', GetTags);
export default router;