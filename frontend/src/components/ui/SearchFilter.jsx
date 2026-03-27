// SearchFilter — search input + category pill row
import { CATEGORY_COLORS, categories } from '../../data/mockData';

export default function SearchFilter({ searchQuery, onSearch, activeCategory, onCategoryChange }) {
  return (
    <div style={s.wrap}>
      {/* Search bar */}
      <div style={s.searchWrap}>
        <svg style={s.searchIcon} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <circle cx="11" cy="11" r="8" />
          <path d="M21 21l-4.35-4.35" />
        </svg>
        <input
          type="text"
          placeholder="Search recipes, categories…"
          value={searchQuery}
          onChange={(e) => onSearch(e.target.value)}
          style={s.input}
          aria-label="Search recipes"
        />
        {searchQuery && (
          <button style={s.clearBtn} onClick={() => onSearch('')} aria-label="Clear search">
            ×
          </button>
        )}
      </div>

      {/* Category pills */}
      <div style={s.pills}>
        {categories.map((cat) => {
          const active = cat === activeCategory;
          return (
            <button
              key={cat}
              onClick={() => onCategoryChange(cat)}
              style={{
                ...s.pill,
                backgroundColor: active ? (CATEGORY_COLORS[cat] || '#FF5C2B') : 'transparent',
                color: active ? '#fff' : '#9090A4',
                borderColor: active ? (CATEGORY_COLORS[cat] || '#FF5C2B') : '#252530',
              }}
            >
              {cat !== 'All' && (
                <span
                  style={{
                    ...s.dot,
                    backgroundColor: active ? 'rgba(255,255,255,0.6)' : (CATEGORY_COLORS[cat] || '#505060'),
                  }}
                />
              )}
              {cat}
            </button>
          );
        })}
      </div>
    </div>
  );
}

const s = {
  wrap: {
    marginBottom: '32px',
  },
  searchWrap: {
    position: 'relative',
    marginBottom: '16px',
    maxWidth: '480px',
  },
  searchIcon: {
    position: 'absolute',
    left: '14px',
    top: '50%',
    transform: 'translateY(-50%)',
    width: '18px',
    height: '18px',
    color: '#505060',
    pointerEvents: 'none',
  },
  input: {
    width: '100%',
    padding: '11px 40px 11px 42px',
    border: '1.5px solid #252530',
    borderRadius: '10px',
    fontSize: '0.925rem',
    background: '#141419',
    color: '#E8E8EF',
    transition: 'border-color 0.2s ease',
    outline: 'none',
  },
  clearBtn: {
    position: 'absolute',
    right: '12px',
    top: '50%',
    transform: 'translateY(-50%)',
    background: 'none',
    border: 'none',
    fontSize: '1.2rem',
    color: '#505060',
    cursor: 'pointer',
    lineHeight: 1,
    padding: '0 2px',
  },
  pills: {
    display: 'flex',
    flexWrap: 'wrap',
    gap: '8px',
  },
  pill: {
    display: 'inline-flex',
    alignItems: 'center',
    gap: '6px',
    padding: '6px 14px',
    borderRadius: '999px',
    border: '1.5px solid',
    fontSize: '0.84rem',
    fontWeight: '500',
    cursor: 'pointer',
    transition: 'all 0.18s ease',
    whiteSpace: 'nowrap',
  },
  dot: {
    width: '7px',
    height: '7px',
    borderRadius: '50%',
    flexShrink: 0,
  },
};
