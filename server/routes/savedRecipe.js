import express from "express";
const router = express.Router();
import { saveRecipe, unsaveRecipe, getSavedRecipes } from "../controller/savedRecipe.js";
import { checkRecipeAlreadySaved } from "../middleware/checkRecipeAlreadySaved.js";


router.post("/save-recipe", checkRecipeAlreadySaved, saveRecipe);
router.post("/unsave-recipe", unsaveRecipe);
router.get("/saved-recipes", getSavedRecipes);


export default router;
