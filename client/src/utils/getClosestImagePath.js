//Full list of available stock meal images in the Public/Meals folder.
const stockImages = [
  "alfredo-chicken-pasta-parsli-linguine-penne.jpeg",
  "beef-burger.jpeg",
  "beef-steak-potato-mash.jpeg",
  "beef-stew.jpeg",
  "beef-soup.jpeg",
  "beef-tacos.jpeg",
  "beet-salad.jpeg",
  "burrito.jpeg",
  "chicken-breast-mashed-potato-vegetable-roasted.jpg",
  "chicken-burger.jpeg",
  "chicken-carrot-mushroom.jpg",
  "chicken-soup.jpeg",
  "chicken-stew.jpeg",
  "chicken-wing-wings-rice.jpg",
  "fish-tacos.jpeg",
  "fried-rice.jpeg",
  "garden-salad.jpeg",
  "lamb-shank.jpeg",
  "margerita-pizza.jpeg",
  "mushroom-soup.jpeg",
  "pasta.jpeg",
  "pepperoni-pizza.jpeg",
  "salmon-salad.jpeg",
  "sandwich.jpeg",
  "Spaghetti.jpeg",
  "squash-entree.jpeg",
  "steak-mashed-potatoes-potato-beans.jpeg",
  "stir-fry.jpeg",
  "Sushi.jpeg",
  "vegetable-soup.jpeg",
  "white-fish-tomato.jpeg"
];

/**
 * Function to return the closest matching image path based on the title of a recipe.
 * First, checks if there's no title provided, in which case it returns the path of
 * the default image. If the title is provided, it normalizes the title by separating
 * words and removing punctuation. Then, it compares the normalized title with dashes
 * to replace spaces. It loops through the available stock images, normalizes each image name,
 * and counts the number of matching words. The image with the highest number of matches is
 * then returned. If no matches are found, the default image path is returned. For ties,
 * the first image's path in the list is returned.
 * 
 * @param {*} title The title of the recipe to match with an image.
 * @returns the path of the closest matching image or the default image path.
 */
export function getClosestImagePath(title) {
  // If no title is provided, return the default fallback image
  if (!title) return 'public/meals/default.jpeg';

  // Normalize the input string: lowercase, remove punctuation, replace spaces with dashes
  const normalize = str =>
    str.toLowerCase().replace(/[^\w\s]/gi, '').replace(/\s+/g, '-');

  // Normalize the input title and split into a Set of keywords
  const titleWords = new Set(normalize(title).split('-'));

  let bestMatch = null;     // Best matching image filename
  let bestScore = 0;        // Highest number of matching words found

  // Loop through each stock image to compare with the title
  for (const filename of stockImages) {
    // Remove file extension to get the base name
    const baseName = filename.replace(/\.(jpeg|jpg)$/, '');

    // Split image filename into a Set of keywords
    const imageWords = new Set(baseName.toLowerCase().split('-'));

    // Find common words between the title and image filename
    const commonWords = [...imageWords].filter(word => titleWords.has(word));
    const score = commonWords.length;

    // Update the best match if this image has more common keywords
    if (score > bestScore) {
      bestScore = score;
      bestMatch = filename;
    }
  }

  // Returns the best matching image path, or default if no match found
  return bestMatch ? `../public/meals/${bestMatch}` : '../public/meals/default.jpeg';
}
