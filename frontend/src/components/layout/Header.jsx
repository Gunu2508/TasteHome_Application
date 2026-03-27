// Header — sticky top navigation bar
import { useState } from 'react';

export default function Header({ user, currentView, onNavigate, onLogout }) {
  const [menuOpen, setMenuOpen] = useState(false);

  const navLink = (label, view) => {
    const active = currentView === view;
    return (
      <button
        key={view}
        onClick={() => { onNavigate(view); setMenuOpen(false); }}
        style={{
          ...s.navLink,
          color: active ? '#C94B2C' : '#1A1A1A',
          fontWeight: active ? '600' : '500',
          borderBottom: active ? '2px solid #C94B2C' : '2px solid transparent',
        }}
      >
        {label}
      </button>
    );
  };

  return (
    <header style={s.header}>
      <div style={s.inner}>
        {/* Brand */}
        <button style={s.brand} onClick={() => onNavigate('home')}>
          <svg style={s.brandIcon} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M3 11l19-9-9 19-2-8-8-2z" />
          </svg>
          <span style={s.brandName}>TasteHome</span>
        </button>

        {/* Desktop nav */}
        <nav style={s.desktopNav}>
          {navLink('Home', 'home')}
          {navLink('Recipes', 'recipes')}
          {user && navLink('My Profile', 'profile')}
        </nav>

        {/* Auth / user area */}
        <div style={s.authArea}>
          {user ? (
            <>
              <button
                style={s.addBtn}
                onClick={() => onNavigate('add')}
              >
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" width="16" height="16">
                  <path d="M12 5v14M5 12h14" />
                </svg>
                Add Recipe
              </button>
              <div style={s.avatar} title={user.name}>
                {user.name.charAt(0).toUpperCase()}
              </div>
              <button style={s.logoutBtn} onClick={onLogout}>
                Sign out
              </button>
            </>
          ) : (
            <>
              <button style={s.loginBtn} onClick={() => onNavigate('auth', 'login')}>
                Sign in
              </button>
              <button style={s.registerBtn} onClick={() => onNavigate('auth', 'register')}>
                Join free
              </button>
            </>
          )}

          {/* Mobile hamburger */}
          <button
            style={s.hamburger}
            onClick={() => setMenuOpen((v) => !v)}
            aria-label="Toggle menu"
          >
            <span style={{ ...s.bar, transform: menuOpen ? 'translateY(6px) rotate(45deg)' : 'none' }} />
            <span style={{ ...s.bar, opacity: menuOpen ? 0 : 1 }} />
            <span style={{ ...s.bar, transform: menuOpen ? 'translateY(-6px) rotate(-45deg)' : 'none' }} />
          </button>
        </div>
      </div>

      {/* Mobile dropdown nav */}
      {menuOpen && (
        <nav style={s.mobileNav} className="animate-down">
          <button style={s.mobileLink} onClick={() => { onNavigate('home'); setMenuOpen(false); }}>Home</button>
          <button style={s.mobileLink} onClick={() => { onNavigate('recipes'); setMenuOpen(false); }}>Recipes</button>
          {user && <button style={s.mobileLink} onClick={() => { onNavigate('profile'); setMenuOpen(false); }}>My Profile</button>}
          {user && <button style={s.mobileLink} onClick={() => { onNavigate('add'); setMenuOpen(false); }}>+ Add Recipe</button>}
        </nav>
      )}
    </header>
  );
}

const s = {
  header: {
    position: 'sticky',
    top: 0,
    zIndex: 100,
    backgroundColor: 'rgba(248, 244, 238, 0.96)',
    backdropFilter: 'blur(8px)',
    borderBottom: '1px solid #E4DAD0',
    boxShadow: '0 1px 4px rgba(0,0,0,0.04)',
  },
  inner: {
    maxWidth: '1200px',
    margin: '0 auto',
    padding: '0 24px',
    height: '64px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: '24px',
  },
  brand: {
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
    background: 'none',
    border: 'none',
    cursor: 'pointer',
    flexShrink: 0,
  },
  brandIcon: {
    width: '26px',
    height: '26px',
    color: '#C94B2C',
  },
  brandName: {
    fontSize: '1.2rem',
    fontWeight: '700',
    fontFamily: "Georgia, 'Times New Roman', serif",
    color: '#1A1A1A',
    letterSpacing: '-0.02em',
  },
  desktopNav: {
    display: 'flex',
    gap: '4px',
    flex: 1,
    '@media (max-width: 640px)': { display: 'none' },
  },
  navLink: {
    background: 'none',
    border: 'none',
    borderBottom: '2px solid transparent',
    padding: '4px 10px',
    fontSize: '0.92rem',
    cursor: 'pointer',
    transition: 'color 0.15s ease',
    lineHeight: '22px',
  },
  authArea: {
    display: 'flex',
    alignItems: 'center',
    gap: '10px',
    flexShrink: 0,
  },
  addBtn: {
    display: 'flex',
    alignItems: 'center',
    gap: '6px',
    padding: '8px 14px',
    backgroundColor: '#C94B2C',
    color: '#fff',
    border: 'none',
    borderRadius: '8px',
    fontSize: '0.875rem',
    fontWeight: '600',
    cursor: 'pointer',
    transition: 'background-color 0.2s ease',
  },
  avatar: {
    width: '34px',
    height: '34px',
    borderRadius: '50%',
    backgroundColor: '#1B4D5C',
    color: '#fff',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontWeight: '700',
    fontSize: '0.875rem',
    cursor: 'default',
    flexShrink: 0,
  },
  loginBtn: {
    padding: '7px 14px',
    background: 'none',
    border: '1.5px solid #E4DAD0',
    borderRadius: '8px',
    fontSize: '0.875rem',
    fontWeight: '500',
    cursor: 'pointer',
    color: '#1A1A1A',
    transition: 'border-color 0.2s ease',
  },
  registerBtn: {
    padding: '7px 14px',
    backgroundColor: '#C94B2C',
    color: '#fff',
    border: 'none',
    borderRadius: '8px',
    fontSize: '0.875rem',
    fontWeight: '600',
    cursor: 'pointer',
    transition: 'background-color 0.2s ease',
  },
  logoutBtn: {
    padding: '6px 10px',
    background: 'none',
    border: 'none',
    fontSize: '0.82rem',
    color: '#6E6E6E',
    cursor: 'pointer',
    transition: 'color 0.2s ease',
  },
  hamburger: {
    display: 'none',
    flexDirection: 'column',
    gap: '5px',
    background: 'none',
    border: 'none',
    cursor: 'pointer',
    padding: '4px',
  },
  bar: {
    display: 'block',
    width: '22px',
    height: '2px',
    backgroundColor: '#1A1A1A',
    borderRadius: '2px',
    transition: 'transform 0.2s ease, opacity 0.2s ease',
  },
  mobileNav: {
    borderTop: '1px solid #E4DAD0',
    padding: '12px 24px',
    display: 'flex',
    flexDirection: 'column',
    gap: '4px',
    backgroundColor: '#F8F4EE',
  },
  mobileLink: {
    background: 'none',
    border: 'none',
    textAlign: 'left',
    padding: '10px 0',
    fontSize: '1rem',
    cursor: 'pointer',
    color: '#1A1A1A',
    borderBottom: '1px solid #F0EAE0',
  },
};
