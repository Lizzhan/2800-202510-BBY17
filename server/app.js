import dotenv from 'dotenv';
import express from 'express';
import session from 'express-session';
import MySQLStore from 'express-mysql-session';
import cors from 'cors';
import db from './db.js';
import authRoute from './routes/auth.js';
import ingredientRoute from './routes/autosuggestsearchbar.js';
import tagsRoute from './routes/tags.js';
import saveRecipeRoutes from './routes/savedRecipe.js';

dotenv.config({
  path: '../.env'
});

const app = express();
const MySQLSessionStore = MySQLStore(session);
const sessionStore = new MySQLSessionStore({}, db);
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(cors({
  origin: 'http://localhost:5173', // your frontend
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
app.use('/api/ingredients', ingredientRoute);
app.use('/api/tags', tagsRoute);
app.use('/api', saveRecipeRoutes);

// Server start
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
