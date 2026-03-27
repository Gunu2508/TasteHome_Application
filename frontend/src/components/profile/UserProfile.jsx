// UserProfile — shows user stats and their submitted recipes
import RecipeCard from '../recipes/RecipeCard';

export default function UserProfile({ user, recipes, reviews, onViewRecipe, onAddRecipe }) {
  const avgRating = reviews.length > 0
    ? (reviews.reduce((acc, r) => acc + r.rating, 0) / reviews.length).toFixed(1)
    : null;

  return (
    <div style={s.page} className="animate-fade">
      {/* Profile header */}
      <div style={s.profileHeader}>
        <div style={s.headerInner}>
          <div style={s.avatarLarge}>
            {user.name.charAt(0).toUpperCase()}
          </div>
          <div style={s.userInfo}>
            <h1 style={s.userName}>{user.name}</h1>
            <p style={s.userEmail}>{user.email}</p>
            <span style={s.memberBadge}>Community Member</span>
          </div>
        </div>
      </div>

      {/* Stats bar */}
      <div style={s.statsBar}>
        <div style={s.statsInner}>
          <StatCard value={recipes.length} label="Recipes Shared" icon="📖" />
          <StatCard value={reviews.length} label="Reviews Given" icon="⭐" />
          <StatCard value={avgRating || '—'} label="Avg Review Given" icon="📊" />
        </div>
      </div>

      {/* Content */}
      <div style={s.content}>
        <div style={s.sectionHeader}>
          <h2 style={s.sectionTitle}>
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="20" height="20">
              <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z" />
              <path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z" />
            </svg>
            My Recipes
          </h2>
          <button style={s.addBtn} onClick={onAddRecipe}>
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" width="14" height="14">
              <path d="M12 5v14M5 12h14" />
            </svg>
            Add New Recipe
          </button>
        </div>

        {recipes.length > 0 ? (
          <div style={s.grid}>
            {recipes.map((recipe, i) => (
              <div
                key={recipe.id}
                className="animate-up"
                style={{ animationDelay: `${i * 0.06}s` }}
              >
                <RecipeCard recipe={recipe} onSelect={onViewRecipe} />
              </div>
            ))}
          </div>
        ) : (
          <div style={s.empty}>
            <span style={s.emptyEmoji}>🍽️</span>
            <h3 style={s.emptyTitle}>No recipes yet</h3>
            <p style={s.emptyText}>You haven't shared any recipes. Add your first one!</p>
            <button style={s.emptyAddBtn} onClick={onAddRecipe}>
              Share a Recipe
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

function StatCard({ value, label, icon }) {
  return (
    <div style={st.card}>
      <span style={st.icon}>{icon}</span>
      <span style={st.value}>{value}</span>
      <span style={st.label}>{label}</span>
    </div>
  );
}

const st = {
  card: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    gap: '4px',
    padding: '20px 32px',
    backgroundColor: '#141419',
    borderRadius: '12px',
    border: '1.5px solid #252530',
    textAlign: 'center',
    flex: 1,
  },
  icon: { fontSize: '1.4rem', lineHeight: 1 },
  value: {
    fontSize: '1.8rem',
    fontWeight: '800',
    fontFamily: "Georgia, serif",
    color: '#FF5C2B',
    lineHeight: 1.1,
  },
  label: {
    fontSize: '0.78rem',
    color: '#505060',
    textTransform: 'uppercase',
    letterSpacing: '0.06em',
    fontWeight: '500',
  },
};

const s = {
  page: {
    minHeight: '60vh',
  },
  profileHeader: {
    background: 'linear-gradient(135deg, #1A0C06 0%, #0C0C10 60%, #060E18 100%)',
    padding: '48px 24px',
    borderBottom: '1px solid #252530',
  },
  headerInner: {
    maxWidth: '1200px',
    margin: '0 auto',
    display: 'flex',
    alignItems: 'center',
    gap: '28px',
  },
  avatarLarge: {
    width: '80px',
    height: '80px',
    borderRadius: '50%',
    backgroundColor: '#FF5C2B',
    color: '#fff',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: '2rem',
    fontWeight: '800',
    fontFamily: "Georgia, serif",
    flexShrink: 0,
    border: '3px solid rgba(255,92,43,0.3)',
    boxShadow: '0 0 24px rgba(255,92,43,0.25)',
  },
  userInfo: {
    display: 'flex',
    flexDirection: 'column',
    gap: '6px',
  },
  userName: {
    fontSize: '1.8rem',
    fontWeight: '700',
    fontFamily: "Georgia, serif",
    color: '#E8E8EF',
    margin: 0,
  },
  userEmail: {
    fontSize: '0.9rem',
    color: '#505060',
    margin: 0,
  },
  memberBadge: {
    display: 'inline-block',
    padding: '3px 12px',
    backgroundColor: 'rgba(255,92,43,0.15)',
    border: '1px solid rgba(255,92,43,0.3)',
    borderRadius: '999px',
    fontSize: '0.72rem',
    color: '#FF8A65',
    fontWeight: '600',
    textTransform: 'uppercase',
    letterSpacing: '0.07em',
  },
  statsBar: {
    backgroundColor: '#0E0E13',
    borderBottom: '1px solid #252530',
  },
  statsInner: {
    maxWidth: '1200px',
    margin: '0 auto',
    padding: '24px',
    display: 'flex',
    gap: '16px',
    flexWrap: 'wrap',
  },
  content: {
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
    display: 'flex',
    alignItems: 'center',
    gap: '10px',
    fontSize: '1.35rem',
    fontWeight: '700',
    fontFamily: "Georgia, serif",
    color: '#E8E8EF',
    margin: 0,
  },
  addBtn: {
    display: 'flex',
    alignItems: 'center',
    gap: '6px',
    padding: '9px 16px',
    backgroundColor: '#FF5C2B',
    color: '#fff',
    border: 'none',
    borderRadius: '8px',
    fontSize: '0.875rem',
    fontWeight: '600',
    cursor: 'pointer',
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
    backgroundColor: '#141419',
    borderRadius: '16px',
    border: '1.5px dashed #252530',
  },
  emptyEmoji: { fontSize: '3rem', opacity: 0.3 },
  emptyTitle: {
    fontSize: '1.1rem',
    fontWeight: '600',
    fontFamily: "Georgia, serif",
    color: '#E8E8EF',
    margin: 0,
  },
  emptyText: {
    fontSize: '0.875rem',
    color: '#505060',
    margin: 0,
  },
  emptyAddBtn: {
    padding: '10px 22px',
    backgroundColor: '#FF5C2B',
    color: '#fff',
    border: 'none',
    borderRadius: '8px',
    fontSize: '0.9rem',
    fontWeight: '600',
    cursor: 'pointer',
    marginTop: '8px',
  },
};
