// RecipesPage.jsx - shows all recipes from the API with search and category filter
import { useState, useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { getAllRecipes } from '../services/api';
import RecipeGrid from '../components/recipes/RecipeGrid';

function normalizeRecipe(r) {
  return {
    ...r,
    author:      r.author_name,
    authorId:    r.user_id,
    createdAt:   r.created_at,
    rating:      0,
    reviewCount: 0,
  };
}

const categories = ['All', 'Breakfast', 'Lunch', 'Dinner', 'Dessert', 'Snack', 'Soup', 'Salad', 'Vegetarian'];

export default function RecipesPage() {
  const navigate       = useNavigate();
  const [searchParams] = useSearchParams();

  const [recipes, setRecipes]             = useState([]);
  const [loading, setLoading]             = useState(true);
  const [error,   setError]               = useState(null);
  const [searchQuery, setSearchQuery]     = useState('');
  const [activeCategory, setActiveCategory] = useState(searchParams.get('category') || 'All');

  useEffect(() => {
    getAllRecipes()
      .then((data) => setRecipes(data.map(normalizeRecipe)))
      .catch(() => setError('Could not load recipes. Please try again later.'))
      .finally(() => setLoading(false));
  }, []);

  // filter recipes client-side based on search text and category
  const filtered = recipes.filter((r) => {
    const matchCat = activeCategory === 'All' || r.category === activeCategory;
    const q = searchQuery.toLowerCase().trim();
    const matchSearch = !q ||
      r.title.toLowerCase().includes(q)       ||
      (r.description && r.description.toLowerCase().includes(q)) ||
      (r.category    && r.category.toLowerCase().includes(q))    ||
      r.author.toLowerCase().includes(q);
    return matchCat && matchSearch;
  });

  return (
    <section style={s.section}>
      <div style={s.sectionHeader}>
        <h2 style={s.sectionTitle}>All Recipes</h2>
      </div>

      {loading && <p style={s.status}>Loading recipes...</p>}
      {error   && <p style={s.errorText}>{error}</p>}

      {!loading && !error && (
        <RecipeGrid
          recipes={filtered}
          onSelect={(r) => navigate('/recipes/' + r.id)}
          searchQuery={searchQuery}
          onSearch={setSearchQuery}
          activeCategory={activeCategory}
          categories={categories}
          onCategoryChange={setActiveCategory}
        />
      )}
    </section>
  );
}

const s = {
  section: {
    maxWidth: '1200px',
    margin: '0 auto',
    padding: '52px 24px',
  },
  sectionHeader: {
    marginBottom: '28px',
  },
  sectionTitle: {
    fontSize: '1.6rem',
    fontWeight: '700',
    fontFamily: "Georgia, 'Times New Roman', serif",
    margin: 0,
    color: '#E8E8EF',
  },
  status: {
    color: '#505060',
    fontSize: '0.95rem',
    textAlign: 'center',
    padding: '40px 0',
  },
  errorText: {
    color: '#FF5C2B',
    fontSize: '0.95rem',
    textAlign: 'center',
    padding: '40px 0',
  },
};
