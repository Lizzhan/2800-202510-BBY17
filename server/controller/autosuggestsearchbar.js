
import db from '../db.js'; // Import database connection

/**
 * Controller to get all ingredients from the database.
 * 
 * @author
 * 
 * @route GET /api/ingredients
 * @returns {Array} List of ingredient objects, ordered alphabetically.
 */
export const GetAllIngredients =(req, res) => {
    const q = "SELECT * FROM ingredients ORDER BY ingredient ASC"
    db.query(q, (err,data) => {
        if(err) return res.json(err)
        return res.status(200).json(data);
    }
    )
};


