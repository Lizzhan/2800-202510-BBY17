import dotenv from 'dotenv';
import express from 'express';
import session from 'express-session';
import MySQLStore from 'express-mysql-session';
import cors from 'cors';
import db from './db.js';
import authRoute from './routes/auth.js';
import recipeAIRoutes from './routes/funnyRecipe.js';
import recipeRegularAiRoutes from './routes/regularRecipe.js';
import fridgeRoutes from './routes/getFridge.js';
import ingredientRoutes from './routes/allUserIngredient.js';

import ingredientRoute from './routes/autosuggestsearchbar.js';
import tagsRoute from './routes/tags.js';
import saveRecipeRoutes from './routes/savedRecipe.js';
import recipeRoutes from './routes/recipe.js';
import matchRecipeRoutes from './routes/suggestRecipe.js';
import sessionRoute from './routes/session.js'
import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';

dotenv.config({
  path: '../.env'
});

const app = express();
const MySQLSessionStore = MySQLStore(session);
const sessionStore = new MySQLSessionStore({}, db);
const PORT = process.env.PORT || 3000;

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.use(express.static(path.join(__dirname, '../dist')));

// Fallback: send index.html for SPA
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../dist/index.html'));
});

app.use(express.json());
app.use(cors({
  // origin: 'http://localhost:5173', // or your frontend URL
  origin: true,
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
app.use('/api', matchRecipeRoutes);

app.get('/ping', (req, res) => {
  res.send('pong');
});


// Server start
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
