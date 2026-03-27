// AuthPage — Login and Register tabs in a clean split card
import { useState } from 'react';

export default function AuthPage({ mode, onLogin, onRegister, onSwitchMode, onBack }) {
  return (
    <div style={s.page}>
      <div style={s.card} className="animate-up">
        {/* Left panel — branding */}
        <div style={s.brandPanel}>
          <div style={s.brandContent}>
            <svg style={s.brandIcon} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M3 11l19-9-9 19-2-8-8-2z" />
            </svg>
            <h1 style={s.brandName}>TasteHome</h1>
            <p style={s.brandTagline}>
              "Every recipe is a story waiting to be tasted."
            </p>
            <div style={s.brandFeatures}>
              {['Share your recipes', 'Rate & review dishes', 'Connect with home cooks'].map((f) => (
                <div key={f} style={s.feature}>
                  <span style={s.featureCheck}>✓</span>
                  <span>{f}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right panel — form */}
        <div style={s.formPanel}>
          {/* Back button */}
          <button style={s.backBtn} onClick={onBack} type="button">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" width="15" height="15">
              <path d="M19 12H5M12 19l-7-7 7-7" />
            </svg>
            Back to Home
          </button>

          {/* Tab switcher */}
          <div style={s.tabs}>
            <button
              style={{ ...s.tab, ...(mode === 'login' ? s.tabActive : {}) }}
              onClick={() => onSwitchMode('login')}
              type="button"
            >
              Sign In
            </button>
            <button
              style={{ ...s.tab, ...(mode === 'register' ? s.tabActive : {}) }}
              onClick={() => onSwitchMode('register')}
              type="button"
            >
              Join Free
            </button>
          </div>

          {/* Forms */}
          {mode === 'login'
            ? <LoginForm onLogin={onLogin} onSwitch={() => onSwitchMode('register')} />
            : <RegisterForm onRegister={onRegister} onSwitch={() => onSwitchMode('login')} />
          }
        </div>
      </div>
    </div>
  );
}

// ---- LoginForm ----
function LoginForm({ onLogin, onSwitch }) {
  const [email, setEmail]       = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors]     = useState({});
  const [showPass, setShowPass] = useState(false);

  const validate = () => {
    const e = {};
    if (!email.trim())              e.email    = 'Email is required.';
    else if (!/\S+@\S+\.\S+/.test(email)) e.email = 'Enter a valid email address.';
    if (!password)                  e.password = 'Password is required.';
    else if (password.length < 6)  e.password = 'Password must be at least 6 characters.';
    return e;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const errs = validate();
    setErrors(errs);
    if (Object.keys(errs).length > 0) return;
    onLogin({ email, password });
  };

  return (
    <form onSubmit={handleSubmit} style={sf.form} noValidate className="animate-fade">
      <h2 style={sf.title}>Welcome back</h2>
      <p style={sf.subtitle}>Sign in to your TasteHome account.</p>

      <InputField
        label="Email Address"
        id="login-email"
        type="email"
        value={email}
        onChange={setEmail}
        placeholder="you@example.com"
        error={errors.email}
        icon={
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="16" height="16">
            <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
            <polyline points="22,6 12,13 2,6" />
          </svg>
        }
      />

      <PasswordField
        label="Password"
        id="login-pass"
        value={password}
        onChange={setPassword}
        show={showPass}
        onToggle={() => setShowPass((v) => !v)}
        error={errors.password}
      />

      <button type="submit" style={sf.submitBtn}>
        Sign In
      </button>

      <p style={sf.switchText}>
        Don't have an account?{' '}
        <button type="button" style={sf.switchLink} onClick={onSwitch}>
          Join free
        </button>
      </p>
    </form>
  );
}

// ---- RegisterForm ----
function RegisterForm({ onRegister, onSwitch }) {
  const [name, setName]         = useState('');
  const [email, setEmail]       = useState('');
  const [password, setPassword] = useState('');
  const [confirm, setConfirm]   = useState('');
  const [errors, setErrors]     = useState({});
  const [showPass, setShowPass] = useState(false);

  const validate = () => {
    const e = {};
    if (!name.trim())              e.name     = 'Your name is required.';
    if (!email.trim())             e.email    = 'Email is required.';
    else if (!/\S+@\S+\.\S+/.test(email)) e.email = 'Enter a valid email address.';
    if (!password)                 e.password = 'Choose a password.';
    else if (password.length < 6) e.password = 'Password must be at least 6 characters.';
    if (confirm !== password)      e.confirm  = 'Passwords do not match.';
    return e;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const errs = validate();
    setErrors(errs);
    if (Object.keys(errs).length > 0) return;
    onRegister({ name, email, password });
  };

  return (
    <form onSubmit={handleSubmit} style={sf.form} noValidate className="animate-fade">
      <h2 style={sf.title}>Create your account</h2>
      <p style={sf.subtitle}>Join a community of home cooks — it's free.</p>

      <InputField
        label="Full Name"
        id="reg-name"
        type="text"
        value={name}
        onChange={setName}
        placeholder="e.g. Gunveer Singh"
        error={errors.name}
        icon={
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="16" height="16">
            <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
            <circle cx="12" cy="7" r="4" />
          </svg>
        }
      />

      <InputField
        label="Email Address"
        id="reg-email"
        type="email"
        value={email}
        onChange={setEmail}
        placeholder="you@example.com"
        error={errors.email}
        icon={
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="16" height="16">
            <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
            <polyline points="22,6 12,13 2,6" />
          </svg>
        }
      />

      <PasswordField
        label="Password"
        id="reg-pass"
        value={password}
        onChange={setPassword}
        show={showPass}
        onToggle={() => setShowPass((v) => !v)}
        error={errors.password}
        placeholder="Min. 6 characters"
      />

      <InputField
        label="Confirm Password"
        id="reg-confirm"
        type={showPass ? 'text' : 'password'}
        value={confirm}
        onChange={setConfirm}
        placeholder="Re-enter your password"
        error={errors.confirm}
        icon={
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="16" height="16">
            <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
            <path d="M7 11V7a5 5 0 0 1 10 0v4" />
          </svg>
        }
      />

      <button type="submit" style={sf.submitBtn}>
        Create Account
      </button>

      <p style={sf.switchText}>
        Already have an account?{' '}
        <button type="button" style={sf.switchLink} onClick={onSwitch}>
          Sign in
        </button>
      </p>
    </form>
  );
}

// ---- Shared sub-components ----
function InputField({ label, id, type, value, onChange, placeholder, error, icon }) {
  return (
    <div style={sf.field}>
      <label style={sf.label} htmlFor={id}>{label}</label>
      <div style={sf.inputWrap}>
        <span style={sf.inputIcon}>{icon}</span>
        <input
          id={id}
          type={type}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder}
          style={{ ...sf.input, borderColor: error ? '#C94B2C' : '#E4DAD0' }}
          autoComplete={type === 'email' ? 'email' : type === 'password' ? 'current-password' : 'name'}
        />
      </div>
      {error && <p style={sf.fieldError}>{error}</p>}
    </div>
  );
}

function PasswordField({ label, id, value, onChange, show, onToggle, error, placeholder }) {
  return (
    <div style={sf.field}>
      <label style={sf.label} htmlFor={id}>{label}</label>
      <div style={sf.inputWrap}>
        <span style={sf.inputIcon}>
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="16" height="16">
            <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
            <path d="M7 11V7a5 5 0 0 1 10 0v4" />
          </svg>
        </span>
        <input
          id={id}
          type={show ? 'text' : 'password'}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder || 'Enter your password'}
          style={{ ...sf.input, paddingRight: '44px', borderColor: error ? '#C94B2C' : '#E4DAD0' }}
          autoComplete="current-password"
        />
        <button type="button" style={sf.eyeBtn} onClick={onToggle} aria-label="Toggle password visibility">
          {show
            ? <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="16" height="16"><path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24"/><line x1="1" y1="1" x2="23" y2="23"/></svg>
            : <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="16" height="16"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/></svg>
          }
        </button>
      </div>
      {error && <p style={sf.fieldError}>{error}</p>}
    </div>
  );
}

// Shared form styles
const sf = {
  form: {
    display: 'flex',
    flexDirection: 'column',
    gap: '16px',
    flex: 1,
  },
  title: {
    fontSize: '1.5rem',
    fontWeight: '700',
    fontFamily: "Georgia, serif",
    color: '#1A1A1A',
    margin: '0 0 2px',
  },
  subtitle: {
    fontSize: '0.875rem',
    color: '#6E6E6E',
    margin: '0 0 8px',
  },
  field: {
    display: 'flex',
    flexDirection: 'column',
    gap: '5px',
  },
  label: {
    fontSize: '0.78rem',
    fontWeight: '700',
    color: '#3A3A3A',
    textTransform: 'uppercase',
    letterSpacing: '0.05em',
  },
  inputWrap: {
    position: 'relative',
  },
  inputIcon: {
    position: 'absolute',
    left: '12px',
    top: '50%',
    transform: 'translateY(-50%)',
    color: '#9E9080',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
  },
  input: {
    width: '100%',
    padding: '11px 14px 11px 38px',
    border: '1.5px solid',
    borderRadius: '9px',
    fontSize: '0.925rem',
    color: '#1A1A1A',
    outline: 'none',
    backgroundColor: '#FDFCFA',
    transition: 'border-color 0.2s ease',
    fontFamily: 'inherit',
  },
  eyeBtn: {
    position: 'absolute',
    right: '12px',
    top: '50%',
    transform: 'translateY(-50%)',
    background: 'none',
    border: 'none',
    cursor: 'pointer',
    color: '#9E9080',
    display: 'flex',
    alignItems: 'center',
    padding: 0,
  },
  fieldError: {
    fontSize: '0.775rem',
    color: '#C94B2C',
    margin: 0,
  },
  submitBtn: {
    padding: '12px',
    backgroundColor: '#C94B2C',
    color: '#fff',
    border: 'none',
    borderRadius: '9px',
    fontSize: '0.95rem',
    fontWeight: '600',
    cursor: 'pointer',
    marginTop: '4px',
    transition: 'background-color 0.2s ease',
  },
  switchText: {
    fontSize: '0.85rem',
    color: '#6E6E6E',
    textAlign: 'center',
    margin: 0,
  },
  switchLink: {
    background: 'none',
    border: 'none',
    color: '#C94B2C',
    fontWeight: '600',
    fontSize: '0.85rem',
    cursor: 'pointer',
    padding: 0,
  },
};

const s = {
  page: {
    minHeight: 'calc(100vh - 64px)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    padding: '40px 24px',
  },
  card: {
    width: '100%',
    maxWidth: '900px',
    display: 'grid',
    gridTemplateColumns: '1fr 1fr',
    borderRadius: '20px',
    overflow: 'hidden',
    boxShadow: '0 8px 48px rgba(0,0,0,0.12)',
    border: '1px solid #E4DAD0',
    minHeight: '560px',
  },
  brandPanel: {
    background: 'linear-gradient(145deg, #1B4D5C 0%, #0F3040 100%)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    padding: '48px 40px',
  },
  brandContent: {
    color: '#fff',
    display: 'flex',
    flexDirection: 'column',
    gap: '20px',
  },
  brandIcon: {
    width: '36px',
    height: '36px',
    color: '#F4A27A',
  },
  brandName: {
    fontFamily: "Georgia, serif",
    fontSize: '1.8rem',
    fontWeight: '700',
    color: '#fff',
    margin: 0,
  },
  brandTagline: {
    fontSize: '1rem',
    color: 'rgba(255,255,255,0.7)',
    fontStyle: 'italic',
    fontFamily: "Georgia, serif",
    lineHeight: 1.6,
    margin: 0,
  },
  brandFeatures: {
    display: 'flex',
    flexDirection: 'column',
    gap: '10px',
    marginTop: '8px',
  },
  feature: {
    display: 'flex',
    alignItems: 'center',
    gap: '10px',
    fontSize: '0.875rem',
    color: 'rgba(255,255,255,0.85)',
  },
  featureCheck: {
    width: '20px',
    height: '20px',
    backgroundColor: 'rgba(201, 75, 44, 0.3)',
    borderRadius: '50%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: '0.72rem',
    color: '#F4A27A',
    flexShrink: 0,
  },
  formPanel: {
    backgroundColor: '#fff',
    padding: '40px',
    display: 'flex',
    flexDirection: 'column',
    gap: '20px',
  },
  backBtn: {
    display: 'inline-flex',
    alignItems: 'center',
    gap: '5px',
    background: 'none',
    border: 'none',
    fontSize: '0.82rem',
    color: '#6E6E6E',
    cursor: 'pointer',
    padding: 0,
    alignSelf: 'flex-start',
  },
  tabs: {
    display: 'flex',
    gap: '4px',
    backgroundColor: '#F8F4EE',
    borderRadius: '10px',
    padding: '4px',
  },
  tab: {
    flex: 1,
    padding: '8px',
    background: 'none',
    border: 'none',
    borderRadius: '7px',
    fontSize: '0.875rem',
    fontWeight: '500',
    color: '#6E6E6E',
    cursor: 'pointer',
    transition: 'all 0.15s ease',
  },
  tabActive: {
    backgroundColor: '#fff',
    color: '#1A1A1A',
    fontWeight: '600',
    boxShadow: '0 1px 4px rgba(0,0,0,0.08)',
  },
};
