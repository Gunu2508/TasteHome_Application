// CategoryStrip — horizontally scrollable category blocks on the home page
import { CATEGORY_COLORS } from '../../data/mockData';

const CATEGORY_ICONS = {
  Breakfast: '☀️',
  Lunch:     '🥙',
  Dinner:    '🍽️',
  Dessert:   '🍮',
  Snack:     '🥨',
  Vegetarian:'🌿',
  Soup:      '🍲',
};

export default function CategoryStrip({ categories, activeCategory, onSelect }) {
  // Exclude 'All' from the strip — show only named categories
  const named = categories.filter((c) => c !== 'All');

  return (
    <section style={s.section}>
      <div style={s.inner}>
        <h2 style={s.heading}>Browse by Category</h2>
        <div style={s.track}>
          {named.map((cat) => {
            const active = cat === activeCategory;
            const color  = CATEGORY_COLORS[cat] || '#94A3B8';
            return (
              <button
                key={cat}
                onClick={() => onSelect(cat)}
                style={{
                  ...s.card,
                  background: active
                    ? `linear-gradient(135deg, ${color}30 0%, ${color}18 100%)`
                    : '#141419',
                  boxShadow: active
                    ? `0 4px 20px ${color}30, inset 0 0 0 1px ${color}50`
                    : '0 1px 4px rgba(0,0,0,0.4)',
                  border: active ? `1.5px solid ${color}60` : '1.5px solid #252530',
                  transform: active ? 'translateY(-3px)' : 'translateY(0)',
                }}
              >
                <span style={s.emoji}>{CATEGORY_ICONS[cat] || '🍴'}</span>
                <span
                  style={{
                    ...s.label,
                    color: active ? '#E8E8EF' : '#9090A4',
                    fontWeight: active ? '600' : '500',
                  }}
                >
                  {cat}
                </span>
                {active && <div style={{ ...s.activeDot, backgroundColor: CATEGORY_COLORS[cat] || '#FF5C2B' }} />}
              </button>
            );
          })}
        </div>
      </div>
    </section>
  );
}

const s = {
  section: {
    backgroundColor: '#0E0E13',
    borderTop: '1px solid #252530',
    borderBottom: '1px solid #252530',
    padding: '40px 0',
  },
  inner: {
    maxWidth: '1200px',
    margin: '0 auto',
    padding: '0 24px',
  },
  heading: {
    fontSize: '1.3rem',
    fontWeight: '700',
    fontFamily: "Georgia, 'Times New Roman', serif",
    marginBottom: '20px',
    color: '#E8E8EF',
  },
  track: {
    display: 'flex',
    gap: '12px',
    overflowX: 'auto',
    paddingBottom: '8px',
    scrollbarWidth: 'none',
    msOverflowStyle: 'none',
  },
  card: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    gap: '8px',
    padding: '18px 22px',
    borderRadius: '14px',
    cursor: 'pointer',
    flexShrink: 0,
    minWidth: '100px',
    transition: 'all 0.2s ease',
    position: 'relative',
  },
  emoji: {
    fontSize: '1.75rem',
    lineHeight: 1,
  },
  label: {
    fontSize: '0.82rem',
    textTransform: 'uppercase',
    letterSpacing: '0.05em',
    whiteSpace: 'nowrap',
  },
  activeDot: {
    position: 'absolute',
    bottom: '8px',
    width: '5px',
    height: '5px',
    borderRadius: '50%',
  },
};
