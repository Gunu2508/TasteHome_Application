// RecipeGrid — displays recipe cards with optional search/filter controls
import RecipeCard from './RecipeCard';
import SearchFilter from '../ui/SearchFilter';

export default function RecipeGrid({
  recipes,
  onSelect,
  compact = false,
  searchQuery,
  onSearch,
  activeCategory,
  categories,
  onCategoryChange,
}) {
  return (
    <div className="animate-fade">
      {/* Controls — only shown in full (non-compact) mode */}
      {!compact && (
        <SearchFilter
          searchQuery={searchQuery}
          onSearch={onSearch}
          activeCategory={activeCategory}
          onCategoryChange={onCategoryChange}
          categories={categories}
        />
      )}

      {/* Result count */}
      {!compact && (
        <div style={s.resultRow}>
          <span style={s.resultCount}>
            {recipes.length} recipe{recipes.length !== 1 ? 's' : ''}
            {activeCategory !== 'All' && ` in ${activeCategory}`}
            {searchQuery && ` matching "${searchQuery}"`}
          </span>
        </div>
      )}

      {/* Grid */}
      {recipes.length > 0 ? (
        <div style={s.grid}>
          {recipes.map((recipe, i) => (
            <div
              key={recipe.id}
              className="animate-up"
              style={{ animationDelay: `${Math.min(i * 0.06, 0.4)}s` }}
            >
              <RecipeCard recipe={recipe} onSelect={onSelect} />
            </div>
          ))}
        </div>
      ) : (
        <EmptyState searchQuery={searchQuery} activeCategory={activeCategory} />
      )}
    </div>
  );
}

function EmptyState({ searchQuery, activeCategory }) {
  return (
    <div style={s.empty}>
      <div style={s.emptyIcon}>🍽️</div>
      <h3 style={s.emptyTitle}>No recipes found</h3>
      <p style={s.emptyText}>
        {searchQuery
          ? `No results for "${searchQuery}". Try a different keyword.`
          : activeCategory !== 'All'
          ? `No ${activeCategory} recipes yet. Be the first to add one!`
          : 'No recipes yet. Add the first one!'}
      </p>
    </div>
  );
}

const s = {
  resultRow: {
    marginBottom: '20px',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  resultCount: {
    fontSize: '0.85rem',
    color: '#6E6E6E',
  },
  grid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fill, minmax(380px, 1fr))',
    gap: '14px',
  },
  empty: {
    textAlign: 'center',
    padding: '80px 24px',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    gap: '12px',
  },
  emptyIcon: {
    fontSize: '3rem',
    lineHeight: 1,
    opacity: 0.5,
  },
  emptyTitle: {
    fontSize: '1.2rem',
    fontWeight: '600',
    fontFamily: "Georgia, serif",
    color: '#1A1A1A',
    margin: 0,
  },
  emptyText: {
    fontSize: '0.9rem',
    color: '#6E6E6E',
    maxWidth: '320px',
    lineHeight: 1.6,
    margin: 0,
  },
};
