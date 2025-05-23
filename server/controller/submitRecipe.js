import db from '../db.js'


/**
 * Controller to submit a new recipe 
 * 
 * @author James Smith
 * @author https://chat.openai.com
 */
export const submitRecipe = (req, res) => {
    try {
        const author_id = req.session.userId;

        if (!author_id) {
            console.error("No user ID found in session:", req.session);
            return res.status(401).json({ error: "Authentication required" });
        }

        const { recipe_title, description, steps, ingredients = [], tags = [] } = req.body;

        // Insert the recipe
        db.query(
            'INSERT INTO recipes (recipe_title, description, steps, author_id, num_of_favorites) VALUES (?, ?, ?, ?, 0)',
            [recipe_title, description, steps, author_id],
            (err, recipeResult) => {
                if (err) {
                    console.error('Error inserting recipe:', err);
                    return res.status(500).json({ error: 'Database insert failed' });
                }

                const recipeId = recipeResult.insertId;
                let errorOccurred = false;
                let completedOperations = 0;
                const totalOperations = ingredients.length + tags.length;

                // Helper function to check if all operations are done
                const checkCompletion = () => {
                    if (++completedOperations === totalOperations) {
                        if (errorOccurred) {
                            res.status(500).json({ 
                                error: 'Recipe created but some ingredients/tags failed to save' 
                            });
                        } else {
                            res.status(201).json({ 
                                message: 'Recipe submitted successfully', 
                                id: recipeId 
                            });
                        }
                    }
                };

                // Insert ingredients
                ingredients.forEach(ingId => {
                    db.query(
                        'INSERT INTO recipe_ingredients (recipe_id, ingredient_id) VALUES (?, ?)',
                        [recipeId, ingId],
                        (err) => {
                            if (err) {
                                console.error(`Error inserting ingredient ${ingId}:`, err);
                                errorOccurred = true;
                            }
                            checkCompletion();
                        }
                    );
                });

                // Insert tags
                tags.forEach(tagId => {
                    db.query(
                        'INSERT INTO recipe_tags (recipe_id, tag_id) VALUES (?, ?)',
                        [recipeId, tagId],
                        (err) => {
                            if (err) {
                                console.error(`Error inserting tag ${tagId}:`, err);
                                errorOccurred = true;
                            }
                            checkCompletion();
                        }
                    );
                });

                // Handle case where there are no ingredients or tags
                if (totalOperations === 0) {
                    res.status(201).json({ 
                        message: 'Recipe submitted successfully', 
                        id: recipeId 
                    });
                }
            }
        );
    } catch (err) {
        console.error('Error in submitRecipe:', err);
        res.status(500).json({ 
            error: err.message || 'Failed to submit recipe' 
        });
    }
};