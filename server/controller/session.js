import db from '../db.js';

/**
 * API endpoint to verify if a user is currently logged in.
 * Responds with the username from the session if available.
 * Used for frontend session checks (e.g., navbar display, redirects).
 * code was done through personal experience
 * 
 * @author Leslie Zhang
 */
export const checkLogin = async (req, res) => {
  console.log("Checking session username:", req.session.username);

  // Respond with session username (or null/undefined if not logged in)
  res.status(200).json(req.session.username);
};

/**
 * Returns full session details for the currently logged-in user.
 * Useful for fetching user info in frontend after login without re-querying DB.
 */
export const getSessionUser = async (req, res) => {
  console.log("Session Username:", req.session.username);
  console.log("Session Email:", req.session.email);
  console.log("Session User ID:", req.session.userId);

  // Respond with a full session user object
  res.status(200).json({
    username: req.session.username,
    email: req.session.email,
    id: req.session.userId,
  });
};
