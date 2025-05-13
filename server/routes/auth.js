import {register, login, logout} from '../controller/auth.js'
import { 
    validateRegisterInput, 
    validateLoginInput,
    checkIfEmailAlreadyUsed, 
    checkIfUsernameAlreadyUsed, 
    checkIfUserExists } from '../middleware/auth.js';
import express from 'express';

const router = express.Router();

//localhost:3000/api/auth/register
router.post("/register", [validateRegisterInput, checkIfEmailAlreadyUsed, checkIfUsernameAlreadyUsed], register);

//localhost:3000/api/auth/login
router.post("/login", [validateLoginInput, checkIfUserExists], login);

//localhost:3000/api/auth/logout
router.post("/logout", logout);

export default router;