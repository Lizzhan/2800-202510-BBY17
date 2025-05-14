import dotenv from 'dotenv';
import express from 'express';
import session from 'express-session';
import MySQLStore from 'express-mysql-session';
import cors from 'cors'
import db from './db.js';
import authRoute from './routes/auth.js'
import recipeAIRoutes from './routes/funnyRecipe.js';
import recipeRegularAiRoutes from './routes/regularRecipe.js';

dotenv.config({
    path: '../.env'
});

const app = express();
const MySQLSessionStore = MySQLStore(session);
const sessionStore = new MySQLSessionStore({}, db);
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(cors());
app.use(session({ 
  key: 'ilovecookies',
  secret: process.env.SESSION_SECRET,
  store: sessionStore,
  saveUninitialized: false, 
  resave: false,
  cookie: {
    httpOnly: true,
    //encryption
    }
  }
));
//intermediate routes
//a request is sent to localhost:3000/api/auth/...
app.use('/api/auth', authRoute);
app.use('/api/funnyRecipe', recipeAIRoutes);
app.use('/api/regularRecipe', recipeRegularAiRoutes);



// Start server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

