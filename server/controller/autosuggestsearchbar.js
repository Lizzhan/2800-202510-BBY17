
import db from '../db.js'; // Import your database connection



// Define the route
export const GetAllIngredients =(req, res) => {
    const q = "SELECT * FROM ingredients ORDER BY ingredient ASC"
    db.query(q, (err,data) => {
        if(err) return res.json(err)
        return res.status(200).json(data);
    }
    )
};


