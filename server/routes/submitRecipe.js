// Imports express framework
import express from 'express';

// Import controller function that handles recipe submission
import {submitRecipe } from '../controller/submitRecipe.js';  

/**
 * Defines routes for handling recipe submission requests.
 * 
 * @author James Smith
 * @module routes/submit
 */
const router = express.Router();

// Define a POST route at the root path that uses the submitRecipe controller
router.post('/', submitRecipe);

// Export the router to be used in the main app
export default router;