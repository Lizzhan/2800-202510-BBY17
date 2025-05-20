import express from 'express';
import { checkLogin, getSessionUser } from '../controller/session.js';

const router = express.Router();

//localhost:3000/api/session/checklogin
router.get("/checklogin", checkLogin)

//localhost:3000/api/session/getuser
router.get("/getUser", getSessionUser)

export default router;