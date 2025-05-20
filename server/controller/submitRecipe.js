import db from '../db.js'

export const submitRecipe = (req, res) => 
    {
    const author_id = req.session.user_id || 27;
    console.warn("Using temporary author_id:", author_id);

    const { recipe_title, description, steps, ingredients = [], tags = [] } = req.body;
    //const author_id = req.body.author_id;

    // if (!req.session.user_id) 
    // {
    //     console.error("No user session found. Full session:", req.session);
    //     return res.status(401).json({ error: "Authentication required" });
    // }

    console.log("Received data:", {
        recipe_title,
        description,
        steps,
        ingredients,
        tags,
        author_id
    });

    if (!recipe_title || !description || !steps || !author_id) {
        return res.status(400).json({ error: 'Missing required fields' });
    }

    const query = 'INSERT INTO recipes (recipe_title, description, steps, author_id, num_of_favorites) VALUES (?, ?, ?, ?, 0)';

    db.query(query, [recipe_title, description, steps, author_id], (err, result) => {
        if (err) {
            console.error('Error inserting recipe:', err);
            return res.status(500).json({ error: 'Database insert failed' });
        }

        const recipeId = result.insertId;

        // Handle ingredients
        const ingredientPromises = ingredients.map(ingId => {
            return new Promise((resolve, reject) => {

                console.log(`Attempting to insert: recipe_id=${recipeId}, ingredient_id=${ingId}`);

                db.query(
                    'INSERT INTO recipe_ingredients (recipe_id, ingredient_id) VALUES (?, ?)',
                    [recipeId, ingId],
                    (err) => {
                        if (err) {
                            console.error(`❌ FAILED to insert ingredient ${ingId}:`, {
                                error: err,
                                sqlMessage: err.sqlMessage,
                                sqlState: err.sqlState,
                                errno: err.errno,
                                code: err.code
                            });
                            reject(err);
                        } else {
                            console.log(`✅ SUCCESS: Inserted ingredient ${ingId} for recipe ${recipeId}`);
                            console.log('Insert result:', {
                                affectedRows: result.affectedRows,
                                insertId: result.insertId});
                            resolve();
                        }
                    }
                );
            });
        });

        // Handle tags
        const tagPromises = tags.map(tagId => {
            return new Promise((resolve, reject) => {
                db.query(
                    'INSERT INTO recipe_tags (recipe_id, tag_id) VALUES (?, ?)',
                    [recipeId, tagId],
                    (err) => {
                        if (err) {
                            console.error(`Error inserting tag ${tagId}:`, err);
                            reject(err);
                        } else {
                            resolve();
                        }
                    }
                );
            });
        });

        Promise.all([...ingredientPromises, ...tagPromises])
            .then(() => {
                res.status(201).json({ 
                    message: 'Recipe submitted successfully', 
                    id: recipeId 
                });
            })
            .catch(err => {
                console.error('Error inserting ingredients/tags:', err);
                res.status(500).json({ 
                    error: 'Recipe created but some ingredients/tags failed to save' 
                });
            });
    });
};