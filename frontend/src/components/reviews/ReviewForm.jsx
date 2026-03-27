// ReviewForm — controlled form for adding a new review
import { useState } from 'react';
import StarRating from '../ui/StarRating';

export default function ReviewForm({ onSubmit, onLoginRequired, currentUser }) {
  const [rating, setRating]     = useState(0);
  const [comment, setComment]   = useState('');
  const [error, setError]       = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!currentUser) {
      onLoginRequired();
      return;
    }

    if (rating === 0) {
      setError('Please select a star rating before submitting.');
      return;
    }

    onSubmit({ rating, comment: comment.trim() });
    setRating(0);
    setComment('');
    setError('');
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 3000);
  };

  if (submitted) {
    return (
      <div style={s.success} className="animate-up">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" width="22" height="22">
          <path d="M20 6L9 17l-5-5" />
        </svg>
        Review submitted — thank you!
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} style={s.form} noValidate>
      <h4 style={s.title}>Leave a Review</h4>

      {/* Star picker */}
      <div style={s.field}>
        <label style={s.label}>Your Rating *</label>
        <div style={s.starPicker}>
          <StarRating value={rating} onChange={setRating} size={28} />
          {rating > 0 && (
            <span style={s.ratingLabel}>{['', 'Poor', 'Fair', 'Good', 'Great', 'Excellent'][rating]}</span>
          )}
        </div>
      </div>

      {/* Comment */}
      <div style={s.field}>
        <label style={s.label} htmlFor="review-comment">Comment (optional)</label>
        <textarea
          id="review-comment"
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          placeholder="What did you think of this recipe?"
          rows={3}
          style={s.textarea}
          maxLength={500}
        />
        <span style={s.charCount}>{comment.length}/500</span>
      </div>

      {error && <p style={s.error}>{error}</p>}

      <button type="submit" style={s.submitBtn}>
        {currentUser ? 'Post Review' : 'Sign in to Review'}
      </button>
    </form>
  );
}

const s = {
  form: {
    backgroundColor: '#fff',
    border: '1.5px solid #E4DAD0',
    borderRadius: '12px',
    padding: '20px',
    marginTop: '8px',
  },
  title: {
    fontSize: '1rem',
    fontWeight: '700',
    fontFamily: "Georgia, serif",
    color: '#1A1A1A',
    marginBottom: '16px',
    margin: '0 0 16px 0',
  },
  field: {
    marginBottom: '14px',
    display: 'flex',
    flexDirection: 'column',
    gap: '6px',
  },
  label: {
    fontSize: '0.82rem',
    fontWeight: '600',
    color: '#4A4A4A',
    textTransform: 'uppercase',
    letterSpacing: '0.05em',
  },
  starPicker: {
    display: 'flex',
    alignItems: 'center',
    gap: '12px',
  },
  ratingLabel: {
    fontSize: '0.875rem',
    fontWeight: '500',
    color: '#C94B2C',
  },
  textarea: {
    padding: '10px 14px',
    border: '1.5px solid #E4DAD0',
    borderRadius: '8px',
    fontSize: '0.9rem',
    color: '#1A1A1A',
    resize: 'vertical',
    minHeight: '80px',
    outline: 'none',
    lineHeight: 1.6,
    transition: 'border-color 0.2s ease',
    fontFamily: 'inherit',
  },
  charCount: {
    fontSize: '0.72rem',
    color: '#9E9080',
    textAlign: 'right',
  },
  error: {
    fontSize: '0.83rem',
    color: '#C94B2C',
    margin: '0 0 12px 0',
    padding: '8px 12px',
    backgroundColor: '#FAE9E4',
    borderRadius: '6px',
  },
  submitBtn: {
    padding: '10px 20px',
    backgroundColor: '#1B4D5C',
    color: '#fff',
    border: 'none',
    borderRadius: '8px',
    fontSize: '0.875rem',
    fontWeight: '600',
    cursor: 'pointer',
    transition: 'background-color 0.2s ease',
    width: '100%',
  },
  success: {
    display: 'flex',
    alignItems: 'center',
    gap: '10px',
    padding: '14px 18px',
    backgroundColor: '#E8F5EC',
    color: '#2D6A4F',
    borderRadius: '10px',
    border: '1px solid #B7DFCA',
    fontSize: '0.9rem',
    fontWeight: '500',
    marginTop: '8px',
  },
};
