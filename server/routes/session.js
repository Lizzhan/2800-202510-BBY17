import express from 'express';
import { checkLogin } from '../controller/session.js';

const router = express.Router();

router.get("/checklogin", checkLogin)

export default router;