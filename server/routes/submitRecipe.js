import express from 'express';
import {submitRecipe } from '../controller/submitRecipe.js';  
import db from '../db.js';

const router = express.Router();

router.post('/', submitRecipe);

export default router;