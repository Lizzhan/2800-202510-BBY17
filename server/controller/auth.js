import bcrypt from 'bcrypt';
import db from '../db.js'

export const register = async (req, res) => {
    const salt = bcrypt.genSaltSync(12);
    const hash = bcrypt.hashSync(req.body.password, salt);
    const bad = "INSERT VALUES" + req.body;
    const bad2 = `INSERT VALUES ${req.body}`;
    const q = "INSERT INTO users (email, password, username) VALUES (?, ?, ?)";
    const values = [req.body.email, hash, req.body.username];
    await db.query(q, values, (err, data) => {
        if(err) return res.json(err);
        res.status(200).json("User Registered");
    })

};

/*export const login = (req, res) => {
    const q = "SELECT * FROM users WHERE username=?";
    db.query(q, [req.body.username, req.body.password], (err, data) => {
        const isPasswordCorrect = bcrypt.compareSync(req.body.password, data[0].password);
        if(!isPasswordCorrect) return res.status(400).json("WRONG PASSWORD");
        
		req.session.authenticated = true;
		req.session.username = req.body.username;
		console.log(req.session.username);
		req.session.cookie.maxAge = 60 * 60 * 1000;

        res.status(200).json("user logged in");
    })
}; */
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

        const isPasswordCorrect = bcrypt.compareSync(req.body.password, user.password);

        if (!isPasswordCorrect) {
            return res.status(400).json("Wrong password");
        }

        // Session stuff
        req.session.authenticated = true;
        req.session.userId = user.user_id; // or whatever your user id column is called
        req.session.username = user.username; // optional

        console.log("User logged in:", req.session.userId);

        req.session.cookie.maxAge = 60 * 60 * 1000; // 1 hour

        res.status(200).json("User logged in successfully");
    });
};

export const logout = (req, res) => {
    req.session.destroy();
    res.status(200).json("user logged out");
};

export const getCurrentUser = (req, res) => {
  if (req.session.username) {
    res.json({ username: req.session.username });
  } else {
    res.status(401).json({ error: 'Not logged in' });
  }
};