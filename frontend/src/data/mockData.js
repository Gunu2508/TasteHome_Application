// ------------------------------------------------------------------
// Mock data for TasteHome Sprint 2 (Frontend only — no API calls)
// ------------------------------------------------------------------

export const CATEGORY_COLORS = {
  Breakfast:   '#F59E0B',
  Lunch:       '#10B981',
  Dinner:      '#EF4444',
  Dessert:     '#8B5CF6',
  Snack:       '#F97316',
  Vegetarian:  '#22C55E',
  Soup:        '#0EA5E9',
  All:         '#94A3B8',
};

export const categories = [
  'All', 'Breakfast', 'Lunch', 'Dinner', 'Dessert', 'Snack', 'Vegetarian', 'Soup',
];

export const initialRecipes = [
  {
    id: 1,
    title: 'Spiced Lamb Kofta',
    description: 'Middle Eastern ground lamb patties loaded with aromatic spices — perfect on the grill or in a cast-iron pan.',
    ingredients: `500g ground lamb
1 medium onion, grated
3 garlic cloves, minced
1 tsp ground cumin
1 tsp ground coriander
½ tsp cinnamon
1 tsp smoked paprika
2 tbsp fresh mint, chopped
Salt and black pepper to taste`,
    instructions: `1. Combine all ingredients in a large bowl and mix thoroughly.
2. Divide mixture into 8 equal portions and shape each around a metal skewer.
3. Refrigerate for 30 minutes to firm up.
4. Grill over medium-high heat for 3–4 minutes per side until cooked through.
5. Serve with warm pita, tzatziki, and a tomato-cucumber salad.`,
    category: 'Dinner',
    author: 'Gunveer',
    authorId: 1,
    rating: 4.5,
    reviewCount: 12,
    createdAt: '2024-01-15',
  },
  {
    id: 2,
    title: 'Cardamom Kheer',
    description: 'A velvety slow-cooked Indian rice pudding fragrant with cardamom, saffron, and topped with crushed pistachios.',
    ingredients: `¼ cup basmati rice, soaked 30 min
1 litre whole milk
½ cup sugar
½ tsp cardamom powder
Pinch of saffron
1 tsp rose water
2 tbsp pistachios, crushed`,
    instructions: `1. Bring milk to a boil in a heavy-bottomed pot over medium heat.
2. Drain soaked rice and add to milk; reduce heat to low.
3. Stir frequently for 35–40 minutes until mixture thickens.
4. Add sugar and cardamom; stir for 5 more minutes.
5. Remove from heat; stir in saffron water and rose water.
6. Chill for 2 hours and serve topped with crushed pistachios.`,
    category: 'Dessert',
    author: 'Gunveer',
    authorId: 1,
    rating: 4.8,
    reviewCount: 8,
    createdAt: '2024-02-03',
  },
  {
    id: 3,
    title: 'Miso Ramen Bowl',
    description: 'A rich umami broth with springy ramen noodles, a jammy soft-boiled egg, and crisp seasonal vegetables.',
    ingredients: `2 portions ramen noodles
3 tbsp white miso paste
4 cups chicken or vegetable broth
2 tbsp soy sauce
1 tsp sesame oil
2 garlic cloves, minced
1-inch fresh ginger, grated
2 soft-boiled eggs
Green onions, sliced
Nori sheets`,
    instructions: `1. Heat sesame oil in a pot; sauté garlic and ginger for 1 minute.
2. Pour in broth and bring to a gentle simmer.
3. Remove from heat; whisk in miso paste (do not boil after adding miso).
4. Cook noodles separately per package directions; drain.
5. Divide noodles into bowls; ladle hot broth over top.
6. Add halved soft-boiled eggs, green onions, and nori. Serve immediately.`,
    category: 'Lunch',
    author: 'Chef Tanaka',
    authorId: 2,
    rating: 4.9,
    reviewCount: 23,
    createdAt: '2024-02-20',
  },
  {
    id: 4,
    title: 'Avocado Toast Deluxe',
    description: 'Thick-cut sourdough loaded with smashed avocado, a runny poached egg, and everything bagel seasoning.',
    ingredients: `2 thick slices sourdough bread
2 ripe avocados
1 tbsp lemon juice
2 large eggs
1 tsp everything bagel seasoning
Red pepper flakes
Micro greens
Salt and black pepper`,
    instructions: `1. Toast sourdough slices until deep golden and crisp.
2. Halve avocados; scoop flesh into a bowl and mash with lemon juice, salt, and pepper.
3. Poach eggs: bring water to a gentle simmer, add a splash of vinegar, and swirl. Drop in eggs; cook 3 minutes.
4. Spread avocado generously over toast.
5. Top each slice with a poached egg.
6. Finish with everything bagel seasoning, red pepper flakes, and micro greens.`,
    category: 'Breakfast',
    author: 'Sara M.',
    authorId: 3,
    rating: 4.2,
    reviewCount: 15,
    createdAt: '2024-03-01',
  },
  {
    id: 5,
    title: 'Butternut Squash Soup',
    description: 'A silky, warming soup made with oven-roasted butternut squash, coconut milk, and a hint of warming curry.',
    ingredients: `1 large butternut squash, halved
400ml coconut milk
3 cups vegetable broth
1 medium onion, diced
4 garlic cloves
1-inch fresh ginger
1 tsp curry powder
2 tbsp pepitas, toasted
Olive oil, salt, pepper`,
    instructions: `1. Roast squash halves cut-side down at 400°F (200°C) for 45 minutes until tender.
2. Sauté onion, garlic, and ginger in olive oil until soft.
3. Scoop squash flesh into the pot; add broth.
4. Blend until completely smooth using an immersion blender.
5. Stir in coconut milk and curry powder; simmer 10 minutes.
6. Adjust seasoning. Serve topped with toasted pepitas and a swirl of coconut milk.`,
    category: 'Soup',
    author: 'Marco V.',
    authorId: 4,
    rating: 4.6,
    reviewCount: 19,
    createdAt: '2024-03-10',
  },
  {
    id: 6,
    title: 'Chickpea Masala',
    description: 'A hearty, protein-packed vegetarian curry swimming in a spiced tomato gravy. Ready in 30 minutes.',
    ingredients: `2 cans chickpeas, drained
1 can crushed tomatoes
1 large onion, finely diced
4 garlic cloves, minced
1-inch ginger, grated
2 tsp garam masala
1 tsp turmeric
1 tsp ground cumin
1 tsp ground coriander
Fresh coriander to garnish
Naan or basmati rice to serve`,
    instructions: `1. Heat oil in a deep pan; fry onion until deep golden, about 12 minutes.
2. Add garlic and ginger; cook 2 minutes.
3. Add all spices; stir and cook 30 seconds until fragrant.
4. Pour in crushed tomatoes; simmer 15 minutes stirring occasionally.
5. Add drained chickpeas; simmer 10 more minutes.
6. Taste and adjust salt. Finish with fresh coriander and serve with naan.`,
    category: 'Vegetarian',
    author: 'Gunveer',
    authorId: 1,
    rating: 4.7,
    reviewCount: 31,
    createdAt: '2024-03-15',
  },
];

export const initialReviews = [
  {
    id: 1,
    recipeId: 1,
    user: 'Alex K.',
    rating: 5,
    comment: 'Made these for a dinner party and everyone raved! The cinnamon really makes the difference.',
    date: '2024-02-01',
  },
  {
    id: 2,
    recipeId: 1,
    user: 'Priya S.',
    rating: 4,
    comment: 'Excellent flavour. I added extra fresh mint and a bit of chili flake. Will repeat.',
    date: '2024-02-15',
  },
  {
    id: 3,
    recipeId: 3,
    user: 'Jamie L.',
    rating: 5,
    comment: 'Best ramen I have ever made at home. The miso broth is deeply satisfying.',
    date: '2024-03-05',
  },
  {
    id: 4,
    recipeId: 6,
    user: 'Tanya B.',
    rating: 5,
    comment: 'A weeknight staple now. My whole family loves this — even the kids!',
    date: '2024-03-20',
  },
  {
    id: 5,
    recipeId: 2,
    user: 'Ravi N.',
    rating: 5,
    comment: 'Exactly like my grandmother used to make. The rose water is the secret.',
    date: '2024-03-22',
  },
];
