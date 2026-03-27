// Footer — simple branded footer
export default function Footer() {
  return (
    <footer style={s.footer}>
      <div style={s.inner}>
        <div style={s.brand}>
          <svg style={s.icon} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M3 11l19-9-9 19-2-8-8-2z" />
          </svg>
          <span style={s.name}>TasteHome</span>
        </div>

        <p style={s.tagline}>Cook. Share. Inspire.</p>

        <div style={s.links}>
          <span style={s.link}>About</span>
          <span style={s.sep}>·</span>
          <span style={s.link}>Privacy</span>
          <span style={s.sep}>·</span>
          <span style={s.link}>Contact</span>
        </div>

        <p style={s.copy}>© {new Date().getFullYear()} TasteHome — Sprint 2 Frontend Demo</p>
      </div>
    </footer>
  );
}

const s = {
  footer: {
    borderTop: '1px solid #E4DAD0',
    backgroundColor: '#F0EAE0',
    marginTop: 'auto',
  },
  inner: {
    maxWidth: '1200px',
    margin: '0 auto',
    padding: '36px 24px',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    gap: '10px',
  },
  brand: {
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
  },
  icon: {
    width: '22px',
    height: '22px',
    color: '#C94B2C',
  },
  name: {
    fontSize: '1.1rem',
    fontWeight: '700',
    fontFamily: "Georgia, 'Times New Roman', serif",
    color: '#1A1A1A',
  },
  tagline: {
    fontSize: '0.875rem',
    color: '#6E6E6E',
    fontStyle: 'italic',
    fontFamily: "Georgia, 'Times New Roman', serif",
  },
  links: {
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
  },
  link: {
    fontSize: '0.82rem',
    color: '#6E6E6E',
    cursor: 'pointer',
    transition: 'color 0.2s',
  },
  sep: {
    color: '#C9BFB4',
    fontSize: '0.8rem',
  },
  copy: {
    fontSize: '0.78rem',
    color: '#9E9080',
    marginTop: '4px',
  },
};
