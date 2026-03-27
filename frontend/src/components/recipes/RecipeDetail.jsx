// RecipeDetail — full recipe view with two-column magazine layout
import { useState } from 'react';
import StarRating from '../ui/StarRating';
import ReviewList from '../reviews/ReviewList';
import ReviewForm from '../reviews/ReviewForm';
import { CATEGORY_COLORS } from '../../data/mockData';

export default function RecipeDetail({
  recipe,
  reviews,
  currentUser,
  onBack,
  onEdit,
  onDelete,
  onAddReview,
  onLoginRequired,
}) {
  const [confirmDelete, setConfirmDelete] = useState(false);
  const color = CATEGORY_COLORS[recipe.category] || '#94A3B8';
  const isOwner = currentUser && currentUser.id === recipe.authorId;

  return (
    <div style={s.page} className="animate-fade">
      {/* Breadcrumb / back */}
      <div style={s.topBar}>
        <button style={s.backBtn} onClick={onBack}>
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" width="16" height="16">
            <path d="M19 12H5M12 19l-7-7 7-7" />
          </svg>
          All Recipes
        </button>
      </div>

      {/* Hero band */}
      <div style={{
        ...s.heroBand,
        background: `linear-gradient(135deg, ${color}25 0%, #0C0C10 60%)`,
        borderBottom: `1px solid ${color}30`,
      }}>
        <div style={s.heroInner}>
          <div style={s.heroLeft}>
            <span style={{ ...s.catPill, backgroundColor: `${color}22`, border: `1px solid ${color}55`, color: '#E8E8EF' }}>
              {recipe.category}
            </span>
            <h1 style={s.title}>{recipe.title}</h1>
            <p style={s.description}>{recipe.description}</p>
            <div style={s.heroMeta}>
              <div style={s.metaItem}>
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="15" height="15">
                  <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
                  <circle cx="12" cy="7" r="4" />
                </svg>
                {recipe.author}
              </div>
              <div style={s.metaItem}>
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="15" height="15">
                  <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
                  <line x1="16" y1="2" x2="16" y2="6" />
                  <line x1="8" y1="2" x2="8" y2="6" />
                  <line x1="3" y1="10" x2="21" y2="10" />
                </svg>
                {new Date(recipe.createdAt).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
              </div>
              <div style={s.ratingRow}>
                <StarRating value={recipe.rating} size={15} />
                <span style={s.ratingNum}>{recipe.rating > 0 ? recipe.rating.toFixed(1) : 'No ratings'}</span>
                <span style={s.reviewCountBadge}>({recipe.reviewCount} review{recipe.reviewCount !== 1 ? 's' : ''})</span>
              </div>
            </div>
          </div>

          {/* Initial block */}
          <div style={{ ...s.initialBlock, backgroundColor: `${color}20`, border: `1px solid ${color}40` }}>
            <span style={s.initialLetter}>{recipe.title.charAt(0)}</span>
          </div>
        </div>
      </div>

      {/* Owner actions */}
      {isOwner && (
        <div style={s.ownerBar}>
          <div style={s.ownerBarInner}>
            <span style={s.ownerLabel}>You own this recipe</span>
            <div style={s.ownerBtns}>
              <button style={s.editBtn} onClick={() => onEdit(recipe)}>
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="14" height="14">
                  <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" />
                  <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z" />
                </svg>
                Edit
              </button>
              {!confirmDelete ? (
                <button style={s.deleteBtn} onClick={() => setConfirmDelete(true)}>
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="14" height="14">
                    <polyline points="3 6 5 6 21 6" />
                    <path d="M19 6l-1 14H6L5 6" />
                    <path d="M10 11v6M14 11v6" />
                    <path d="M9 6V4h6v2" />
                  </svg>
                  Delete
                </button>
              ) : (
                <div style={s.confirmRow}>
                  <span style={s.confirmText}>Are you sure?</span>
                  <button style={s.confirmYes} onClick={() => onDelete(recipe.id)}>Yes, delete</button>
                  <button style={s.confirmNo} onClick={() => setConfirmDelete(false)}>Cancel</button>
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Main two-column body */}
      <div style={s.body}>
        {/* Left column: ingredients + instructions */}
        <div style={s.mainCol}>
          <section style={s.section}>
            <h2 style={s.sectionTitle}>
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="18" height="18">
                <path d="M9 11l3 3L22 4" />
                <path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11" />
              </svg>
              Ingredients
            </h2>
            <ul style={s.ingredientList}>
              {recipe.ingredients.split('\n').filter(Boolean).map((item, i) => (
                <li key={i} style={s.ingredientItem}>
                  <span style={s.ingredientBullet} />
                  {item.trim()}
                </li>
              ))}
            </ul>
          </section>

          <section style={s.section}>
            <h2 style={s.sectionTitle}>
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="18" height="18">
                <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z" />
                <path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z" />
              </svg>
              Instructions
            </h2>
            <ol style={s.instructionList}>
              {recipe.instructions.split('\n').filter(Boolean).map((step, i) => (
                <li key={i} style={s.instructionItem}>
                  <span style={s.stepNumber}>{i + 1}</span>
                  <span style={s.stepText}>{step.replace(/^\d+\.\s*/, '').trim()}</span>
                </li>
              ))}
            </ol>
          </section>
        </div>

        {/* Right sidebar: reviews */}
        <aside style={s.sidebar}>
          <section>
            <h2 style={s.sectionTitle}>
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="18" height="18">
                <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
              </svg>
              Reviews <span style={s.reviewBadge}>{reviews.length}</span>
            </h2>
            <ReviewForm
              onSubmit={(data) => onAddReview(recipe.id, data)}
              currentUser={currentUser}
              onLoginRequired={onLoginRequired}
            />
            <div style={{ marginTop: '20px' }}>
              <ReviewList reviews={reviews} />
            </div>
          </section>
        </aside>
      </div>
    </div>
  );
}

const s = {
  page: {
    minHeight: '60vh',
  },
  topBar: {
    maxWidth: '1200px',
    margin: '0 auto',
    padding: '20px 24px 0',
  },
  backBtn: {
    display: 'inline-flex',
    alignItems: 'center',
    gap: '6px',
    background: 'none',
    border: 'none',
    fontSize: '0.875rem',
    fontWeight: '500',
    color: '#9090A4',
    cursor: 'pointer',
    padding: '6px 0',
    transition: 'color 0.2s ease',
  },
  heroBand: {
    marginTop: '12px',
  },
  heroInner: {
    maxWidth: '1200px',
    margin: '0 auto',
    padding: '40px 24px',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    gap: '40px',
  },
  heroLeft: {
    flex: 1,
  },
  catPill: {
    display: 'inline-block',
    padding: '4px 12px',
    borderRadius: '999px',
    fontSize: '0.74rem',
    fontWeight: '600',
    textTransform: 'uppercase',
    letterSpacing: '0.07em',
    marginBottom: '14px',
  },
  title: {
    fontFamily: "Georgia, 'Times New Roman', serif",
    fontSize: 'clamp(1.8rem, 4vw, 2.8rem)',
    fontWeight: '700',
    lineHeight: 1.15,
    margin: '0 0 14px 0',
    color: '#E8E8EF',
  },
  description: {
    fontSize: '1rem',
    color: '#9090A4',
    lineHeight: 1.7,
    margin: '0 0 24px 0',
    maxWidth: '480px',
  },
  heroMeta: {
    display: 'flex',
    flexWrap: 'wrap',
    gap: '16px',
    alignItems: 'center',
  },
  metaItem: {
    display: 'flex',
    alignItems: 'center',
    gap: '5px',
    fontSize: '0.85rem',
    color: '#9090A4',
    fontWeight: '500',
  },
  ratingRow: {
    display: 'flex',
    alignItems: 'center',
    gap: '6px',
  },
  ratingNum: {
    fontSize: '0.9rem',
    fontWeight: '700',
    color: '#E8E8EF',
  },
  reviewCountBadge: {
    fontSize: '0.78rem',
    color: '#505060',
  },
  initialBlock: {
    width: '110px',
    height: '110px',
    backdropFilter: 'blur(4px)',
    borderRadius: '20px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    flexShrink: 0,
  },
  initialLetter: {
    fontSize: '3.5rem',
    fontWeight: '800',
    fontFamily: "Georgia, serif",
    color: 'rgba(255,255,255,0.85)',
    lineHeight: 1,
  },
  ownerBar: {
    backgroundColor: '#0E0E13',
    borderBottom: '1px solid #252530',
  },
  ownerBarInner: {
    maxWidth: '1200px',
    margin: '0 auto',
    padding: '12px 24px',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    gap: '16px',
    flexWrap: 'wrap',
  },
  ownerLabel: {
    fontSize: '0.82rem',
    color: '#505060',
    fontStyle: 'italic',
  },
  ownerBtns: {
    display: 'flex',
    alignItems: 'center',
    gap: '10px',
  },
  editBtn: {
    display: 'flex',
    alignItems: 'center',
    gap: '5px',
    padding: '7px 14px',
    backgroundColor: '#22D3EE',
    color: '#0C0C10',
    border: 'none',
    borderRadius: '7px',
    fontSize: '0.82rem',
    fontWeight: '700',
    cursor: 'pointer',
  },
  deleteBtn: {
    display: 'flex',
    alignItems: 'center',
    gap: '5px',
    padding: '7px 14px',
    backgroundColor: 'transparent',
    color: '#FF5C2B',
    border: '1.5px solid #FF5C2B',
    borderRadius: '7px',
    fontSize: '0.82rem',
    fontWeight: '600',
    cursor: 'pointer',
  },
  confirmRow: {
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
  },
  confirmText: {
    fontSize: '0.82rem',
    color: '#FF5C2B',
    fontWeight: '500',
  },
  confirmYes: {
    padding: '6px 12px',
    backgroundColor: '#FF5C2B',
    color: '#fff',
    border: 'none',
    borderRadius: '6px',
    fontSize: '0.8rem',
    fontWeight: '600',
    cursor: 'pointer',
  },
  confirmNo: {
    padding: '6px 12px',
    background: 'none',
    border: '1px solid #252530',
    borderRadius: '6px',
    fontSize: '0.8rem',
    color: '#9090A4',
    cursor: 'pointer',
  },
  body: {
    maxWidth: '1200px',
    margin: '0 auto',
    padding: '48px 24px',
    display: 'grid',
    gridTemplateColumns: '1fr 420px',
    gap: '48px',
    alignItems: 'start',
  },
  mainCol: {
    display: 'flex',
    flexDirection: 'column',
    gap: '40px',
  },
  sidebar: {
    position: 'sticky',
    top: '80px',
  },
  section: {
    display: 'flex',
    flexDirection: 'column',
    gap: '16px',
  },
  sectionTitle: {
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
    fontSize: '1.2rem',
    fontWeight: '700',
    fontFamily: "Georgia, 'Times New Roman', serif",
    color: '#E8E8EF',
    margin: 0,
    paddingBottom: '12px',
    borderBottom: '2px solid #252530',
  },
  reviewBadge: {
    backgroundColor: 'rgba(255,92,43,0.15)',
    color: '#FF5C2B',
    borderRadius: '999px',
    padding: '2px 8px',
    fontSize: '0.78rem',
    fontWeight: '600',
  },
  ingredientList: {
    listStyle: 'none',
    display: 'flex',
    flexDirection: 'column',
    gap: '10px',
  },
  ingredientItem: {
    display: 'flex',
    alignItems: 'flex-start',
    gap: '10px',
    fontSize: '0.95rem',
    color: '#C8C8D0',
    lineHeight: 1.5,
  },
  ingredientBullet: {
    width: '6px',
    height: '6px',
    borderRadius: '50%',
    backgroundColor: '#FF5C2B',
    flexShrink: 0,
    marginTop: '8px',
  },
  instructionList: {
    listStyle: 'none',
    display: 'flex',
    flexDirection: 'column',
    gap: '16px',
  },
  instructionItem: {
    display: 'flex',
    gap: '14px',
    alignItems: 'flex-start',
  },
  stepNumber: {
    width: '28px',
    height: '28px',
    borderRadius: '50%',
    backgroundColor: '#FF5C2B',
    color: '#fff',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontWeight: '700',
    fontSize: '0.8rem',
    flexShrink: 0,
    marginTop: '2px',
  },
  stepText: {
    fontSize: '0.95rem',
    color: '#C8C8D0',
    lineHeight: 1.65,
    flex: 1,
  },
};
