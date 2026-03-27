// RecipeCard — horizontal editorial-style card (unique layout)
import StarRating from '../ui/StarRating';
import { CATEGORY_COLORS } from '../../data/mockData';

export default function RecipeCard({ recipe, onSelect }) {
  const color = CATEGORY_COLORS[recipe.category] || '#94A3B8';

  return (
    <article
      style={s.card}
      onClick={() => onSelect(recipe)}
      onMouseEnter={(e) => {
        e.currentTarget.style.transform = 'translateY(-3px)';
        e.currentTarget.style.boxShadow = `0 8px 32px rgba(0,0,0,0.5), inset 0 0 0 1px #33333F`;
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.transform = 'translateY(0)';
        e.currentTarget.style.boxShadow = '0 1px 4px rgba(0,0,0,0.4)';
      }}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => e.key === 'Enter' && onSelect(recipe)}
      aria-label={`View recipe: ${recipe.title}`}
    >
      {/* Left color block */}
      <div style={{ ...s.colorBlock, backgroundColor: color }}>
        <span style={s.initial}>{recipe.title.charAt(0)}</span>
        <span style={s.catLabel}>{recipe.category}</span>
      </div>

      {/* Right content */}
      <div style={s.content}>
        <div style={s.top}>
          <h3 style={s.title}>{recipe.title}</h3>
          <p style={s.desc}>{recipe.description}</p>
        </div>

        <div style={s.meta}>
          <div style={s.metaLeft}>
            <span style={s.author}>
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="13" height="13">
                <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
                <circle cx="12" cy="7" r="4" />
              </svg>
              {recipe.author}
            </span>
            <span style={s.date}>
              {new Date(recipe.createdAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
            </span>
          </div>
          <div style={s.ratingWrap}>
            <StarRating value={recipe.rating} size={13} />
            <span style={s.ratingText}>
              {recipe.rating > 0 ? recipe.rating.toFixed(1) : '—'}
            </span>
            <span style={s.reviewCount}>({recipe.reviewCount})</span>
          </div>
        </div>
      </div>

      {/* Arrow */}
      <div style={s.arrow}>
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="16" height="16">
          <path d="M9 18l6-6-6-6" />
        </svg>
      </div>
    </article>
  );
}

const s = {
  card: {
    display: 'flex',
    alignItems: 'stretch',
    backgroundColor: '#141419',
    borderRadius: '14px',
    border: '1.5px solid #252530',
    boxShadow: '0 1px 4px rgba(0,0,0,0.4)',
    overflow: 'hidden',
    cursor: 'pointer',
    transition: 'transform 0.2s ease, box-shadow 0.2s ease',
  },
  colorBlock: {
    width: '100px',
    flexShrink: 0,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '6px',
    padding: '16px 8px',
  },
  initial: {
    fontSize: '2rem',
    fontWeight: '800',
    fontFamily: "Georgia, serif",
    color: 'rgba(255,255,255,0.95)',
    lineHeight: 1,
  },
  catLabel: {
    fontSize: '0.65rem',
    fontWeight: '600',
    color: 'rgba(255,255,255,0.75)',
    textTransform: 'uppercase',
    letterSpacing: '0.07em',
    textAlign: 'center',
  },
  content: {
    flex: 1,
    padding: '16px 18px',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    gap: '10px',
    minWidth: 0,
  },
  top: {
    display: 'flex',
    flexDirection: 'column',
    gap: '6px',
  },
  title: {
    fontSize: '1.05rem',
    fontWeight: '700',
    fontFamily: "Georgia, 'Times New Roman', serif",
    color: '#E8E8EF',
    margin: 0,
    lineHeight: 1.3,
  },
  desc: {
    fontSize: '0.85rem',
    color: '#9090A4',
    lineHeight: 1.55,
    margin: 0,
    display: '-webkit-box',
    WebkitLineClamp: 2,
    WebkitBoxOrient: 'vertical',
    overflow: 'hidden',
  },
  meta: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    flexWrap: 'wrap',
    gap: '8px',
  },
  metaLeft: {
    display: 'flex',
    alignItems: 'center',
    gap: '12px',
  },
  author: {
    display: 'flex',
    alignItems: 'center',
    gap: '4px',
    fontSize: '0.78rem',
    color: '#9090A4',
    fontWeight: '500',
  },
  date: {
    fontSize: '0.74rem',
    color: '#505060',
  },
  ratingWrap: {
    display: 'flex',
    alignItems: 'center',
    gap: '4px',
  },
  ratingText: {
    fontSize: '0.82rem',
    fontWeight: '600',
    color: '#FF5C2B',
  },
  reviewCount: {
    fontSize: '0.75rem',
    color: '#505060',
  },
  arrow: {
    display: 'flex',
    alignItems: 'center',
    paddingRight: '16px',
    color: '#33333F',
    flexShrink: 0,
  },
};
