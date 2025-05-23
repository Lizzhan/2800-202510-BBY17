import db from '../db.js';

/**
 * Middleware to validate registration input fields
 * Ensures all required fields (email, username, password) are provided
 * Returns 400 if any are missing
 * code was done through personal experience
 * 
 * @author Leslie Zhang
 */
export const validateRegisterInput = (req, res, next) => {
  if (!req.body.email) return res.status(400).json("email cannot be empty");
  if (!req.body.username) return res.status(400).json("username cannot be empty");
  if (!req.body.password) return res.status(400).json("password cannot be empty");
  next(); // proceed to next middleware
};

/**
 * Middleware to validate login input fields
 * Ensures both username and password are provided
 * Returns 400 if any are missing
 */
export const validateLoginInput = (req, res, next) => {
  if (!req.body.username) return res.status(400).json("username cannot be empty");
  if (!req.body.password) return res.status(400).json("password cannot be empty");
  next();
};

/**
 * Middleware to check if an email is already registered
 * Queries database for existing email
 * Returns 409 Conflict if email exists
 */
export const checkIfEmailAlreadyUsed = (req, res, next) => {
  const q = "SELECT * FROM users WHERE email=?";
  db.query(q, [req.body.email], (err, data) => {
    if (err) return res.json(err);
    if (data.length > 0) return res.status(409).json('This email is already used');
    next();
  });
};

/**
 * Middleware to check if a username is already taken
 * Returns 409 Conflict if username exists in database
 */
export const checkIfUsernameAlreadyUsed = (req, res, next) => {
  const q = "SELECT * FROM users WHERE username=?";
  db.query(q, [req.body.username], (err, data) => {
    if (err) return res.json(err);
    if (data.length > 0) return res.status(409).json('This username is already used');
    next();
  });
};

/**
 * Middleware to check if a user exists by username
 * Used in login flow to validate existence before comparing password
 * Returns 404 if no such user is found
 */
export const checkIfUserExists = (req, res, next) => {
  const q = "SELECT * FROM users WHERE username=?";
  db.query(q, [req.body.username], (err, data) => {
    if (err) return res.json(err);
    if (data.length === 0) return res.status(404).json("user not found");
    next();
  });
};
