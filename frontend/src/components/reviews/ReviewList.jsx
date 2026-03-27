// ReviewList — renders a list of reviews for a recipe
import StarRating from '../ui/StarRating';

export default function ReviewList({ reviews }) {
  if (reviews.length === 0) {
    return (
      <div style={s.empty}>
        <p style={s.emptyText}>No reviews yet. Be the first to share your thoughts!</p>
      </div>
    );
  }

  return (
    <div style={s.list}>
      {reviews.map((review) => (
        <div key={review.id} style={s.card} className="animate-up">
          <div style={s.cardHeader}>
            <div style={s.avatar}>
              {review.user.charAt(0).toUpperCase()}
            </div>
            <div style={s.reviewerInfo}>
              <span style={s.reviewer}>{review.user}</span>
              <span style={s.date}>
                {new Date(review.date).toLocaleDateString('en-US', {
                  month: 'short',
                  day: 'numeric',
                  year: 'numeric',
                })}
              </span>
            </div>
            <StarRating value={review.rating} size={14} />
          </div>
          {review.comment && (
            <p style={s.comment}>"{review.comment}"</p>
          )}
        </div>
      ))}
    </div>
  );
}

const s = {
  list: {
    display: 'flex',
    flexDirection: 'column',
    gap: '12px',
  },
  card: {
    backgroundColor: '#1C1C24',
    border: '1px solid #252530',
    borderRadius: '10px',
    padding: '14px 16px',
  },
  cardHeader: {
    display: 'flex',
    alignItems: 'center',
    gap: '10px',
    marginBottom: '8px',
  },
  avatar: {
    width: '32px',
    height: '32px',
    borderRadius: '50%',
    backgroundColor: '#22D3EE',
    color: '#0C0C10',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontWeight: '800',
    fontSize: '0.8rem',
    flexShrink: 0,
  },
  reviewerInfo: {
    flex: 1,
    display: 'flex',
    flexDirection: 'column',
    gap: '1px',
  },
  reviewer: {
    fontSize: '0.88rem',
    fontWeight: '600',
    color: '#E8E8EF',
  },
  date: {
    fontSize: '0.74rem',
    color: '#505060',
  },
  comment: {
    fontSize: '0.875rem',
    color: '#9090A4',
    lineHeight: 1.6,
    margin: 0,
    fontStyle: 'italic',
    paddingLeft: '42px',
  },
  empty: {
    padding: '28px',
    backgroundColor: '#141419',
    borderRadius: '10px',
    border: '1px dashed #252530',
    textAlign: 'center',
  },
  emptyText: {
    fontSize: '0.875rem',
    color: '#505060',
    margin: 0,
    fontStyle: 'italic',
  },
};
