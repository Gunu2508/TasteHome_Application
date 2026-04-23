// HomePage.jsx - landing page that fetches recently added recipes from the API
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { getAllRecipes } from '../services/api';
import HeroSection   from '../components/home/HeroSection';
import CategoryStrip from '../components/home/CategoryStrip';
import RecipeGrid    from '../components/recipes/RecipeGrid';

// the backend sends snake_case; convert to camelCase for our components
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

export default function HomePage() {
  const navigate = useNavigate();
  const { user } = useAuth();

  const [recipes, setRecipes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error,   setError]   = useState(null);

  useEffect(() => {
    getAllRecipes()
      .then((data) => setRecipes(data.map(normalizeRecipe)))
      .catch(() => setError('Could not load recipes. Please try again later.'))
      .finally(() => setLoading(false));
  }, []);

  return (
    <>
      <HeroSection
        onExplore={() => navigate('/recipes')}
        onAddRecipe={() => user ? navigate('/recipes/new') : navigate('/auth/login')}
      />

      <CategoryStrip
        categories={categories}
        activeCategory="All"
        onSelect={(cat) => navigate(cat === 'All' ? '/recipes' : '/recipes?category=' + cat)}
      />

      <section style={s.section}>
        <div style={s.sectionHeader}>
          <h2 style={s.sectionTitle}>Recently Added</h2>
          <button style={s.seeAll} onClick={() => navigate('/recipes')}>
            See all recipes arrow
          </button>
        </div>

        {loading && <p style={s.status}>Loading recipes...</p>}
        {error   && <p style={s.errorText}>{error}</p>}

        {!loading && !error && recipes.length === 0 && (
          <p style={s.status}>No recipes yet - be the first to share one!</p>
        )}

        {!loading && !error && recipes.length > 0 && (
          <RecipeGrid
            recipes={recipes.slice(0, 4)}
            onSelect={(r) => navigate('/recipes/' + r.id)}
            compact
          />
        )}
      </section>
    </>
  );
}

const s = {
  section: {
    maxWidth: '1200px',
    margin: '0 auto',
    padding: '52px 24px',
  },
  sectionHeader: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: '28px',
  },
  sectionTitle: {
    fontSize: '1.6rem',
    fontWeight: '700',
    fontFamily: "Georgia, 'Times New Roman', serif",
    margin: 0,
    color: '#E8E8EF',
  },
  seeAll: {
    background: 'none',
    border: 'none',
    color: '#FF5C2B',
    fontSize: '0.9rem',
    fontWeight: '600',
    cursor: 'pointer',
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
