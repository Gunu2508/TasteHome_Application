// NotFound.jsx - shown for any URL that doesn't match a real route
import { useNavigate } from 'react-router-dom';

export default function NotFound() {
  const navigate = useNavigate();

  return (
    <div style={s.page}>
      <div style={s.card} className="animate-up">
        <h1 style={s.code}>404</h1>
        <h2 style={s.title}>Page not found</h2>
        <p style={s.text}>
          Looks like this recipe went missing - or maybe it was never here.
          Head back home and find something delicious instead.
        </p>
        <div style={s.btnRow}>
          <button style={s.primaryBtn} onClick={() => navigate('/')}>
            Go back home
          </button>
          <button style={s.secondaryBtn} onClick={() => navigate('/recipes')}>
            Browse recipes
          </button>
        </div>
      </div>
    </div>
  );
}

const s = {
  page: {
    minHeight: 'calc(100vh - 128px)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#0C0C10',
    padding: '40px 24px',
  },
  card: {
    textAlign: 'center',
    maxWidth: '460px',
  },
  code: {
    fontSize: '7rem',
    fontWeight: '800',
    fontFamily: "Georgia, 'Times New Roman', serif",
    color: '#FF5C2B',
    margin: '0 0 4px',
    lineHeight: 1,
    letterSpacing: '-4px',
  },
  title: {
    fontSize: '1.8rem',
    fontWeight: '700',
    fontFamily: "Georgia, 'Times New Roman', serif",
    color: '#E8E8EF',
    margin: '0 0 14px',
  },
  text: {
    fontSize: '0.95rem',
    color: '#505060',
    lineHeight: 1.7,
    margin: '0 0 32px',
  },
  btnRow: {
    display: 'flex',
    justifyContent: 'center',
    gap: '12px',
    flexWrap: 'wrap',
  },
  primaryBtn: {
    padding: '12px 28px',
    backgroundColor: '#FF5C2B',
    color: '#fff',
    border: 'none',
    borderRadius: '9px',
    fontSize: '0.95rem',
    fontWeight: '600',
    cursor: 'pointer',
  },
  secondaryBtn: {
    padding: '12px 28px',
    background: 'none',
    border: '1.5px solid #33333F',
    borderRadius: '9px',
    fontSize: '0.95rem',
    fontWeight: '500',
    color: '#9090A4',
    cursor: 'pointer',
  },
};
