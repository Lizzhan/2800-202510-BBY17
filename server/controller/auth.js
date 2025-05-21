import bcrypt from 'bcrypt';
import db from '../db.js';

/**
 * Handles user registration
 * - Hashes the password
 * - Stores user in the database
 * code was done through peronal experience
 * @author Leslie Zhang
 */
export const register = (req, res) => {
  const salt = bcrypt.genSaltSync(12); // generate salt
  const hash = bcrypt.hashSync(req.body.password, salt); // hash password

  const q = "INSERT INTO users (email, password, username) VALUES (?, ?, ?)";
  const values = [req.body.email, hash, req.body.username];

  db.query(q, values, (err, data) => {
    if (err) return res.json(err); // return error if DB insert fails
    res.status(200).json("User Registered");
  });
};

/**
 * Handles user login
 * - Verifies username and password
 * - Sets session if login is successful
 */
export const login = (req, res) => {
  const q = "SELECT * FROM users WHERE username = ?";

  db.query(q, [req.body.username], (err, data) => {
    if (err) {
      console.error("Database error during login:", err);
      return res.status(500).json("Database error");
    }

    if (data.length === 0) {
      return res.status(404).json("User not found");
    }

    const user = data[0];

    // Verify the password
    const isPasswordCorrect = bcrypt.compareSync(req.body.password, user.password);
    if (!isPasswordCorrect) {
      return res.status(400).json("Wrong password");
    }

    // Save session details
    req.session.authenticated = true;
    req.session.userId = user.user_id;
    req.session.username = user.username;
    req.session.email = user.email;

    console.log("User logged in:", req.session.userId);

    req.session.cookie.maxAge = 60 * 60 * 1000; // session expires in 1 hour

    res.status(200).json("User logged in successfully");
  });
};

/**
 * Handles user logout
 * - Destroys session
 * - Clears cookie
 */
export const logout = (req, res) => {
  req.session.destroy(err => {
    if (err) {
      console.error("Session destroy error:", err);
      return res.status(500).json({ message: "Logout failed" });
    }

    res.clearCookie("ilovecookies", {
      path: "/",
      httpOnly: true,
      sameSite: "lax",
      secure: false, // set to true if using HTTPS
    });

    res.status(200).json({ message: "User logged out" });
  });
};

/**
 * Gets the current authenticated user based on session
 */
export const getCurrentUser = (req, res) => {
  if (req.session.username) {
    res.json({
      id: req.session.userId,
      username: req.session.username,
      email: req.session.email
    });
  } else {
    res.status(401).json({ error: 'Not logged in' });
  }
};

/**
 * Placeholder for future user info update functionality
 */
export const updateInfo = (req, res) => {
  // TODO: Implement profile info update
};
