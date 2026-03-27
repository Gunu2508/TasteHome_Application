// HeroSection — editorial two-column landing hero
import { CATEGORY_COLORS, initialRecipes } from '../../data/mockData';

export default function HeroSection({ onExplore, onAddRecipe }) {
  // Use first 4 recipes for the decorative tile grid
  const tiles = initialRecipes.slice(0, 4);

  return (
    <section style={s.hero}>
      {/* Ambient glow blobs */}
      <div style={s.glowOrange} />
      <div style={s.glowCyan} />

      <div style={s.inner}>
        {/* Left: text */}
        <div style={s.left} className="animate-up">
          <span style={s.badge}>Community Recipe Platform</span>
          <h1 style={s.heading}>
            Cook.<br />
            Share.<br />
            <em style={s.headingAccent}>Inspire.</em>
          </h1>
          <p style={s.sub}>
            Discover handcrafted recipes from home cooks around the world.
            Add your own creations, leave honest reviews, and build your
            culinary legacy — one dish at a time.
          </p>
          <div style={s.ctaRow}>
            <button style={s.ctaPrimary} onClick={onExplore}>
              Explore Recipes
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" width="16" height="16">
                <path d="M5 12h14M12 5l7 7-7 7" />
              </svg>
            </button>
            <button style={s.ctaSecondary} onClick={onAddRecipe}>
              Share a Recipe
            </button>
          </div>

          <div style={s.statsRow}>
            <Stat value="6+" label="Recipes" />
            <div style={s.statDivider} />
            <Stat value="5★" label="Avg Rating" />
            <div style={s.statDivider} />
            <Stat value="100%" label="Homemade" />
          </div>
        </div>

        {/* Right: recipe tile grid */}
        <div style={s.right} className="animate-fade">
          <div style={s.tileGrid}>
            {tiles.map((recipe, i) => (
              <div
                key={recipe.id}
                style={{
                  ...s.tile,
                  backgroundColor: CATEGORY_COLORS[recipe.category] || '#94A3B8',
                  animationDelay: `${i * 0.08}s`,
                }}
                className="animate-up"
              >
                <span style={s.tileInitial}>
                  {recipe.title.charAt(0)}
                </span>
                <div style={s.tileInfo}>
                  <span style={s.tileTitle}>{recipe.title}</span>
                  <span style={s.tileCat}>{recipe.category}</span>
                </div>
              </div>
            ))}
          </div>
          {/* Decorative ring */}
          <div style={s.ring} />
        </div>
      </div>

      {/* Bottom wave separator */}
      <svg style={s.wave} viewBox="0 0 1440 60" preserveAspectRatio="none">
        <path d="M0,30 C360,60 1080,0 1440,30 L1440,60 L0,60 Z" fill="#0C0C10" />
      </svg>
    </section>
  );
}

function Stat({ value, label }) {
  return (
    <div style={{ textAlign: 'center' }}>
      <div style={{ fontSize: '1.4rem', fontWeight: '700', color: '#FF5C2B', fontFamily: "Georgia, serif" }}>{value}</div>
      <div style={{ fontSize: '0.76rem', color: '#505060', textTransform: 'uppercase', letterSpacing: '0.06em' }}>{label}</div>
    </div>
  );
}

const s = {
  hero: {
    background: 'linear-gradient(135deg, #120B06 0%, #0C0C10 55%, #08101A 100%)',
    position: 'relative',
    overflow: 'hidden',
    paddingBottom: '20px',
  },
  glowOrange: {
    position: 'absolute',
    top: '-80px',
    left: '-60px',
    width: '420px',
    height: '420px',
    borderRadius: '50%',
    background: 'radial-gradient(circle, rgba(255,92,43,0.12) 0%, transparent 70%)',
    pointerEvents: 'none',
  },
  glowCyan: {
    position: 'absolute',
    bottom: '40px',
    right: '10%',
    width: '360px',
    height: '360px',
    borderRadius: '50%',
    background: 'radial-gradient(circle, rgba(34,211,238,0.07) 0%, transparent 70%)',
    pointerEvents: 'none',
  },
  inner: {
    maxWidth: '1200px',
    margin: '0 auto',
    padding: '80px 24px 60px',
    display: 'grid',
    gridTemplateColumns: '1fr 1fr',
    gap: '60px',
    alignItems: 'center',
    position: 'relative',
    zIndex: 1,
  },
  left: {
    color: '#E8E8EF',
  },
  badge: {
    display: 'inline-block',
    padding: '5px 14px',
    backgroundColor: 'rgba(255, 92, 43, 0.12)',
    border: '1px solid rgba(255, 92, 43, 0.3)',
    borderRadius: '999px',
    fontSize: '0.78rem',
    fontWeight: '600',
    color: '#FF8A65',
    letterSpacing: '0.06em',
    textTransform: 'uppercase',
    marginBottom: '20px',
  },
  heading: {
    fontFamily: "Georgia, 'Times New Roman', serif",
    fontSize: 'clamp(2.8rem, 5vw, 4rem)',
    fontWeight: '700',
    lineHeight: 1.1,
    marginBottom: '24px',
    color: '#E8E8EF',
  },
  headingAccent: {
    color: '#FF5C2B',
    fontStyle: 'italic',
  },
  sub: {
    fontSize: '1.0rem',
    color: '#9090A4',
    lineHeight: 1.75,
    marginBottom: '36px',
    maxWidth: '420px',
  },
  ctaRow: {
    display: 'flex',
    gap: '14px',
    flexWrap: 'wrap',
    marginBottom: '40px',
  },
  ctaPrimary: {
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
    padding: '13px 26px',
    backgroundColor: '#FF5C2B',
    color: '#fff',
    border: 'none',
    borderRadius: '10px',
    fontSize: '0.95rem',
    fontWeight: '600',
    cursor: 'pointer',
    transition: 'background-color 0.2s ease, transform 0.15s ease',
    boxShadow: '0 0 20px rgba(255,92,43,0.3)',
  },
  ctaSecondary: {
    padding: '13px 26px',
    backgroundColor: 'transparent',
    color: '#E8E8EF',
    border: '1.5px solid #33333F',
    borderRadius: '10px',
    fontSize: '0.95rem',
    fontWeight: '500',
    cursor: 'pointer',
    transition: 'border-color 0.2s ease, background-color 0.2s ease',
  },
  statsRow: {
    display: 'flex',
    alignItems: 'center',
    gap: '24px',
  },
  statDivider: {
    width: '1px',
    height: '28px',
    backgroundColor: '#252530',
  },
  right: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
  },
  tileGrid: {
    display: 'grid',
    gridTemplateColumns: '1fr 1fr',
    gap: '14px',
    position: 'relative',
    zIndex: 1,
  },
  tile: {
    borderRadius: '16px',
    padding: '20px 16px',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    minHeight: '140px',
    cursor: 'default',
    transition: 'transform 0.2s ease, box-shadow 0.2s ease',
    boxShadow: '0 4px 24px rgba(0,0,0,0.5)',
    border: '1px solid rgba(255,255,255,0.06)',
  },
  tileInitial: {
    fontSize: '2.2rem',
    fontWeight: '800',
    fontFamily: "Georgia, serif",
    color: 'rgba(255,255,255,0.9)',
    lineHeight: 1,
  },
  tileInfo: {
    display: 'flex',
    flexDirection: 'column',
    gap: '3px',
  },
  tileTitle: {
    fontSize: '0.85rem',
    fontWeight: '600',
    color: '#fff',
    lineHeight: 1.3,
    display: '-webkit-box',
    WebkitLineClamp: 2,
    WebkitBoxOrient: 'vertical',
    overflow: 'hidden',
  },
  tileCat: {
    fontSize: '0.72rem',
    color: 'rgba(255,255,255,0.65)',
    fontWeight: '500',
    textTransform: 'uppercase',
    letterSpacing: '0.06em',
  },
  ring: {
    position: 'absolute',
    width: '320px',
    height: '320px',
    border: '1px solid rgba(255,92,43,0.08)',
    borderRadius: '50%',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    pointerEvents: 'none',
  },
  wave: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    width: '100%',
    height: '60px',
  },
};
