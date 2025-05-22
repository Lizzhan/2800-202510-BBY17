import dotenv from 'dotenv';
import express from 'express';
import session from 'express-session';
import MySQLStore from 'express-mysql-session';
import cors from 'cors';
import db from './db.js';
import authRoute from './routes/auth.js';
import recipeAIRoutes from './routes/funnyRecipe.js';
import recipeRegularAiRoutes from './routes/regularRecipe.js';
import submitRecipeRoute from './routes/submitRecipe.js';
import userRecipeRoutes from './routes/userRecipes.js';
import fridgeRoutes from './routes/getFridge.js';
import ingredientRoutes from './routes/allUserIngredient.js';

import ingredientRoute from './routes/autosuggestsearchbar.js';
import tagsRoute from './routes/tags.js';
import saveRecipeRoutes from './routes/savedRecipe.js';
import recipeRoutes from './routes/recipe.js';
import matchRecipeRoutes from './routes/suggestRecipe.js';
import sessionRoute from './routes/session.js';



dotenv.config({
  path: '../.env'
});

const app = express();
const MySQLSessionStore = MySQLStore(session);
const sessionStore = new MySQLSessionStore({}, db);
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(cors({
  origin: 'http://ec2-99-79-7-165.ca-central-1.compute.amazonaws.com', // or your frontend URL
  credentials: true
}));
app.use(session({ 
  key: 'ilovecookies',
  secret: process.env.SESSION_SECRET,
  store: sessionStore,
  saveUninitialized: false, 
  resave: false,
  cookie: {
    httpOnly: true,
    secure: false,      // set to true if you are using HTTPS (production)
    sameSite: 'lax'     // important: 'lax' for dev, not 'none'
  }
}));

// Routes
app.use('/api/auth', authRoute);
app.use('/api/session', sessionRoute);
app.use('/api/funnyRecipe', recipeAIRoutes);
app.use('/api/regularRecipe', recipeRegularAiRoutes);
app.use('/api/fridge', fridgeRoutes);
app.use('/api/allingredients', ingredientRoutes);
app.use('/api/ingredients', ingredientRoute);
app.use('/api/tags', tagsRoute);
app.use('/api', saveRecipeRoutes);
app.use('/api',recipeRoutes);
app.use('/api/submitRecipe', submitRecipeRoute);
app.use('/api', matchRecipeRoutes);
app.use('/api/user-recipes', userRecipeRoutes);


// Server start
app.listen(PORT, '0.0.0.0', () => {
  console.log(`Server running on port ${PORT}`);
});
