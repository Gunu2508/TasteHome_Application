// ProfilePage.jsx - shows the logged-in user's own recipes
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
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

export default function ProfilePage() {
  const navigate = useNavigate();
  const { user } = useAuth();

  const [myRecipes, setMyRecipes] = useState([]);
  const [loading,   setLoading]   = useState(true);
  const [error,     setError]     = useState(null);

  useEffect(() => {
    getAllRecipes()
      .then((data) => {
        // only keep recipes that belong to this user
        const mine = data
          .map(normalizeRecipe)
          .filter((r) => r.authorId === user.id);
        setMyRecipes(mine);
      })
      .catch(() => setError('Could not load your recipes.'))
      .finally(() => setLoading(false));
  }, [user.id]);

  return (
    <div style={s.page}>
      {/* profile header */}
      <div style={s.hero}>
        <div style={s.heroInner}>
          <div style={s.avatar}>{user.name.charAt(0).toUpperCase()}</div>
          <div>
            <h1 style={s.name}>{user.name}</h1>
            <p style={s.email}>{user.email}</p>
            <p style={s.recipeCount}>
              {myRecipes.length} recipe{myRecipes.length !== 1 ? 's' : ''} shared
            </p>
          </div>
        </div>
      </div>

      {/* recipe list */}
      <section style={s.section}>
        <div style={s.sectionHeader}>
          <h2 style={s.sectionTitle}>My Recipes</h2>
          <button style={s.addBtn} onClick={() => navigate('/recipes/new')}>
            + Add New Recipe
          </button>
        </div>

        {loading && <p style={s.status}>Loading your recipes...</p>}
        {error   && <p style={s.errorText}>{error}</p>}

        {!loading && !error && myRecipes.length === 0 && (
          <div style={s.empty}>
            <p style={s.emptyText}>You have not shared any recipes yet.</p>
            <button style={s.addBtn} onClick={() => navigate('/recipes/new')}>
              Share your first recipe
            </button>
          </div>
        )}

        {!loading && !error && myRecipes.length > 0 && (
          <RecipeGrid
            recipes={myRecipes}
            onSelect={(r) => navigate('/recipes/' + r.id)}
          />
        )}
      </section>
    </div>
  );
}

const s = {
  page: {
    minHeight: '60vh',
  },
  hero: {
    borderBottom: '1px solid #252530',
    backgroundColor: '#0E0E13',
  },
  heroInner: {
    maxWidth: '1200px',
    margin: '0 auto',
    padding: '48px 24px',
    display: 'flex',
    alignItems: 'center',
    gap: '24px',
  },
  avatar: {
    width: '72px',
    height: '72px',
    borderRadius: '50%',
    backgroundColor: '#22D3EE',
    color: '#0C0C10',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontWeight: '800',
    fontSize: '1.8rem',
    flexShrink: 0,
  },
  name: {
    fontSize: '1.6rem',
    fontWeight: '700',
    fontFamily: "Georgia, serif",
    color: '#E8E8EF',
    margin: '0 0 4px',
  },
  email: {
    fontSize: '0.875rem',
    color: '#505060',
    margin: '0 0 4px',
  },
  recipeCount: {
    fontSize: '0.82rem',
    color: '#9090A4',
    margin: 0,
  },
  section: {
    maxWidth: '1200px',
    margin: '0 auto',
    padding: '48px 24px',
  },
  sectionHeader: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: '28px',
  },
  sectionTitle: {
    fontSize: '1.4rem',
    fontWeight: '700',
    fontFamily: "Georgia, serif",
    color: '#E8E8EF',
    margin: 0,
  },
  addBtn: {
    padding: '9px 18px',
    backgroundColor: '#FF5C2B',
    color: '#fff',
    border: 'none',
    borderRadius: '8px',
    fontSize: '0.875rem',
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
  empty: {
    textAlign: 'center',
    padding: '60px 0',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    gap: '20px',
  },
  emptyText: {
    color: '#505060',
    fontSize: '0.95rem',
    margin: 0,
  },
};
