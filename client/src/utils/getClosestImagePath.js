const stockImages = [
  "alfredo-chicken-pasta-parsli-linguini.jpeg",
  "beef-burger.jpeg",
  "beef-steak-potato-mash.jpeg",
  "beef-stew.jpeg",
  "beef-soup.jpeg",
  "beef-tacos.jpeg",
  "beet-salad.jpeg",
  "burrito.jpeg",
  "chicken-breast-mashed-potato-veg.jpeg",
  "chicken-burger.jpeg",
  "chicken-carrot-mushroom.jpg",
  "chicken-soup.jpeg",
  "chicken-stew.jpeg",
  "chicken-wing-wings-rice.jpg",
  "fish-tacos.jpeg",
  "fried-rice.jpeg",
  "garden-salad.jpeg",
  "lamb-shank.jpeg",
  "margherita-pizza.jpeg",
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

export function getClosestImagePath(title) {
  if (!title) return 'public/meals/default.jpeg';

  const normalize = str => str.toLowerCase().replace(/[^\w\s]/gi, '').replace(/\s+/g, '-');
  const titleWords = new Set(normalize(title).split('-'));

  let bestMatch = null;
  let bestScore = 0;

  for (const filename of stockImages) {
    const baseName = filename.replace(/\.(jpeg|jpg)$/, '');
    const imageWords = new Set(baseName.toLowerCase().split('-'));

    const commonWords = [...imageWords].filter(word => titleWords.has(word));
    const score = commonWords.length;

    if (score > bestScore) {
      bestScore = score;
      bestMatch = filename;
    }
  }

  return bestMatch ? `public/meals/${bestMatch}` : 'public/meals/default.jpeg';
}
