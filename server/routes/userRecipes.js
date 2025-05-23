import express from 'express';
import { getUserRecipes, deleteUserRecipe } from '../controller/userRecipes.js';

const router = express.Router();

/**
 * Route: GET /api/user-recipes
 * 
 * Fetch all recipes created by currently logged in user
 * 
 * Requires:
 * -Valid session w/ 'req.session.userID' set
 * 
 * Returns:
 * - 200 w/ array of user-created recipes
 * - 401 if not logged in
 * - 500 on server or database error
 * 
 * @author James Smith
 * @author https://chat.openai.com
 */
router.get('/', getUserRecipes);

/**
 * Route: DELETE /api/user-recipes/:id
 * 
 * Delete a specific recipe by ID, only if the current user is the author.
 * 
 * Requires:
 * - A valid session with `req.session.userId` set
 * - Ownership verification for the recipe
 * 
 * Returns:
 * - 200 on successful deletion
 * - 401 if not logged in
 * - 403 if user is not the author
 * - 500 on server/database error
 * 
 * @author James Smith
 * @author
 */
router.delete('/:id', deleteUserRecipe);

export default router;