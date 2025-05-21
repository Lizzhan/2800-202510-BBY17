import db from '../db.js';

// Define the route
export const GetTags =(req, res) => {
    const q = "SELECT * FROM tags"
    db.query(q, (err,data) => {
        if(err) return res.json(err)
        return res.status(200).json(data);
    }
    )
};