/**
 * App.jsx — Root component for TasteHome Frontend (Sprint 2)
 *
 * All global state lives here and is passed down as props.
 * Navigation is state-based (no React Router — that is Sprint 3).
 *
 * Views:  home | recipes | detail | add | edit | auth | profile
 */
import { useState } from 'react';

import Header       from './components/layout/Header';
import Footer       from './components/layout/Footer';
import HeroSection  from './components/home/HeroSection';
import CategoryStrip from './components/home/CategoryStrip';
import RecipeGrid   from './components/recipes/RecipeGrid';
import RecipeDetail from './components/recipes/RecipeDetail';
import RecipeForm   from './components/recipes/RecipeForm';
import AuthPage     from './components/auth/AuthPage';
import UserProfile  from './components/profile/UserProfile';

import { initialRecipes, initialReviews, categories } from './data/mockData';

export default function App() {
  // ─── View state ──────────────────────────────────────────────────
  const [view, setView]                   = useState('home');
  const [authMode, setAuthMode]           = useState('login');

  // ─── Data state ──────────────────────────────────────────────────
  const [recipes, setRecipes]             = useState(initialRecipes);
  const [reviews, setReviews]             = useState(initialReviews);

  // ─── Selection state ─────────────────────────────────────────────
  const [selectedRecipeId, setSelectedRecipeId] = useState(null);
  const [editingRecipeId, setEditingRecipeId]   = useState(null);

  // ─── Filter state ────────────────────────────────────────────────
  const [searchQuery, setSearchQuery]     = useState('');
  const [activeCategory, setActiveCategory] = useState('All');

  // ─── Auth state ──────────────────────────────────────────────────
  const [user, setUser]                   = useState(null);

  // ─── Toast notification ──────────────────────────────────────────
  const [toast, setToast]                 = useState(null);

  const showToast = (message, type = 'success') => {
    setToast({ message, type });
    setTimeout(() => setToast(null), 3200);
  };

  // ─── Navigation helper ───────────────────────────────────────────
  const navigate = (nextView, data = null) => {
    if (nextView === 'detail' && data)  setSelectedRecipeId(data.id);
    if (nextView === 'edit'   && data)  setEditingRecipeId(data.id);
    if (nextView === 'auth'   && data)  setAuthMode(data);
    setView(nextView);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // ─── Recipe handlers ─────────────────────────────────────────────
  const handleAddRecipe = (formData) => {
    const newRecipe = {
      id:          Date.now(),
      ...formData,
      author:      user?.name || 'Anonymous',
      authorId:    user?.id   || 0,
      rating:      0,
      reviewCount: 0,
      createdAt:   new Date().toISOString().split('T')[0],
    };
    setRecipes((prev) => [newRecipe, ...prev]);
    navigate('recipes');
    showToast('Recipe published successfully!');
  };

  const handleEditRecipe = (formData) => {
    setRecipes((prev) =>
      prev.map((r) => r.id === editingRecipeId ? { ...r, ...formData } : r)
    );
    navigate('detail', { id: editingRecipeId });
    showToast('Recipe updated.');
  };

  const handleDeleteRecipe = (recipeId) => {
    setRecipes((prev)  => prev.filter((r) => r.id !== recipeId));
    setReviews((prev)  => prev.filter((r) => r.recipeId !== recipeId));
    navigate('recipes');
    showToast('Recipe deleted.', 'info');
  };

  // ─── Review handler ──────────────────────────────────────────────
  const handleAddReview = (recipeId, reviewData) => {
    const newReview = {
      id:       Date.now(),
      recipeId,
      user:     user?.name || 'Anonymous',
      ...reviewData,
      date:     new Date().toISOString().split('T')[0],
    };
    const updatedReviews = [...reviews, newReview];
    setReviews(updatedReviews);

    // Recalculate average rating for this recipe
    const recipeReviews = updatedReviews.filter((r) => r.recipeId === recipeId);
    const avg = recipeReviews.reduce((acc, r) => acc + r.rating, 0) / recipeReviews.length;
    setRecipes((prev) =>
      prev.map((r) =>
        r.id === recipeId
          ? { ...r, rating: Math.round(avg * 10) / 10, reviewCount: recipeReviews.length }
          : r
      )
    );
    showToast('Review posted!');
  };

  // ─── Auth handlers ───────────────────────────────────────────────
  const handleLogin = (credentials) => {
    const loggedIn = { id: 99, name: credentials.email.split('@')[0], email: credentials.email };
    setUser(loggedIn);
    navigate('home');
    showToast(`Welcome back, ${loggedIn.name}!`);
  };

  const handleRegister = (userData) => {
    const newUser = { id: Date.now(), name: userData.name, email: userData.email };
    setUser(newUser);
    navigate('home');
    showToast(`Welcome to TasteHome, ${newUser.name}!`);
  };

  const handleLogout = () => {
    setUser(null);
    navigate('home');
    showToast('Signed out successfully.', 'info');
  };

  // ─── Derived data ────────────────────────────────────────────────
  const filteredRecipes = recipes.filter((r) => {
    const matchCat = activeCategory === 'All' || r.category === activeCategory;
    const q = searchQuery.toLowerCase();
    const matchSearch = !q ||
      r.title.toLowerCase().includes(q)       ||
      r.description.toLowerCase().includes(q) ||
      r.category.toLowerCase().includes(q)    ||
      r.author.toLowerCase().includes(q);
    return matchCat && matchSearch;
  });

  const selectedRecipe  = recipes.find((r) => r.id === selectedRecipeId)  || null;
  const editingRecipe   = recipes.find((r) => r.id === editingRecipeId)   || null;

  // ─── Render ──────────────────────────────────────────────────────
  const renderView = () => {
    switch (view) {
      case 'home':
        return (
          <>
            <HeroSection
              onExplore={() => navigate('recipes')}
              onAddRecipe={() => user ? navigate('add') : navigate('auth', 'login')}
            />
            <CategoryStrip
              categories={categories}
              activeCategory={activeCategory}
              onSelect={(cat) => {
                setActiveCategory(cat);
                navigate('recipes');
              }}
            />
            <section style={styles.section}>
              <div style={styles.sectionHeader}>
                <h2 style={styles.sectionTitle}>Recently Added</h2>
                <button style={styles.seeAll} onClick={() => navigate('recipes')}>
                  See all recipes →
                </button>
              </div>
              <RecipeGrid
                recipes={recipes.slice(0, 4)}
                onSelect={(r) => navigate('detail', r)}
                compact
              />
            </section>
          </>
        );

      case 'recipes':
        return (
          <section style={styles.section}>
            <div style={styles.sectionHeader}>
              <h2 style={styles.sectionTitle}>All Recipes</h2>
            </div>
            <RecipeGrid
              recipes={filteredRecipes}
              onSelect={(r) => navigate('detail', r)}
              searchQuery={searchQuery}
              onSearch={setSearchQuery}
              activeCategory={activeCategory}
              categories={categories}
              onCategoryChange={setActiveCategory}
            />
          </section>
        );

      case 'detail':
        return selectedRecipe ? (
          <RecipeDetail
            recipe={selectedRecipe}
            reviews={reviews.filter((r) => r.recipeId === selectedRecipe.id)}
            currentUser={user}
            onBack={() => navigate('recipes')}
            onEdit={(r) => navigate('edit', r)}
            onDelete={handleDeleteRecipe}
            onAddReview={handleAddReview}
            onLoginRequired={() => navigate('auth', 'login')}
          />
        ) : null;

      case 'add':
        return (
          <RecipeForm
            onSubmit={handleAddRecipe}
            onCancel={() => navigate('recipes')}
            title="Share a New Recipe"
          />
        );

      case 'edit':
        return editingRecipe ? (
          <RecipeForm
            recipe={editingRecipe}
            onSubmit={handleEditRecipe}
            onCancel={() => navigate('detail', editingRecipe)}
            title="Edit Recipe"
          />
        ) : null;

      case 'auth':
        return (
          <AuthPage
            mode={authMode}
            onLogin={handleLogin}
            onRegister={handleRegister}
            onSwitchMode={setAuthMode}
            onBack={() => navigate('home')}
          />
        );

      case 'profile':
        return user ? (
          <UserProfile
            user={user}
            recipes={recipes.filter((r) => r.authorId === user.id)}
            reviews={reviews.filter((r) => r.user === user.name)}
            onViewRecipe={(r) => navigate('detail', r)}
            onAddRecipe={() => navigate('add')}
          />
        ) : null;

      default:
        return null;
    }
  };

  return (
    <div style={styles.app}>
      {/* Toast notification */}
      {toast && (
        <div
          style={{
            ...styles.toast,
            backgroundColor: toast.type === 'info' ? '#1B3A5C' : '#1B4D3E',
          }}
          className="animate-fade"
          role="alert"
        >
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" width="16" height="16">
            {toast.type === 'info'
              ? <path d="M12 8v4M12 16h.01M12 22c5.52 0 10-4.48 10-10S17.52 2 12 2 2 6.48 2 12s4.48 10 10 10z" />
              : <path d="M20 6L9 17l-5-5" />
            }
          </svg>
          {toast.message}
        </div>
      )}

      <Header
        user={user}
        currentView={view}
        onNavigate={navigate}
        onLogout={handleLogout}
      />

      <main style={styles.main}>
        {renderView()}
      </main>

      <Footer />
    </div>
  );
}

const styles = {
  app: {
    minHeight: '100vh',
    display: 'flex',
    flexDirection: 'column',
    backgroundColor: '#F8F4EE',
    fontFamily: "'Segoe UI', system-ui, -apple-system, BlinkMacSystemFont, sans-serif",
    color: '#1A1A1A',
  },
  main: {
    flex: 1,
  },
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
    color: '#1A1A1A',
  },
  seeAll: {
    background: 'none',
    border: 'none',
    color: '#C94B2C',
    fontSize: '0.9rem',
    fontWeight: '600',
    cursor: 'pointer',
    letterSpacing: '0.01em',
  },
  toast: {
    position: 'fixed',
    top: '20px',
    right: '20px',
    zIndex: 9999,
    display: 'flex',
    alignItems: 'center',
    gap: '10px',
    padding: '13px 20px',
    borderRadius: '10px',
    color: '#fff',
    fontSize: '0.9rem',
    fontWeight: '500',
    boxShadow: '0 4px 20px rgba(0,0,0,0.18)',
    animation: 'toastIn 0.3s ease both',
    maxWidth: '340px',
  },
};
