// StarRating — renders filled/half/empty stars
// Props:
//   value        (number)  — current rating (0–5, supports .5)
//   onChange     (fn)      — if provided, makes stars interactive
//   size         (number)  — icon size in px (default 16)

import { useState } from 'react';

export default function StarRating({ value = 0, onChange, size = 16 }) {
  const [hovered, setHovered] = useState(0);

  const display = onChange ? (hovered || value) : value;

  return (
    <span style={{ display: 'inline-flex', gap: '2px', lineHeight: 1 }}>
      {[1, 2, 3, 4, 5].map((star) => {
        const filled = display >= star;
        const half   = !filled && display >= star - 0.5;

        return (
          <svg
            key={star}
            width={size}
            height={size}
            viewBox="0 0 24 24"
            fill={filled ? '#C94B2C' : half ? 'url(#half)' : 'none'}
            stroke={filled || half ? '#C94B2C' : '#C9BFB4'}
            strokeWidth="1.8"
            strokeLinecap="round"
            strokeLinejoin="round"
            style={{
              cursor: onChange ? 'pointer' : 'default',
              transition: 'transform 0.1s ease',
              transform: onChange && hovered >= star ? 'scale(1.15)' : 'scale(1)',
            }}
            onMouseEnter={() => onChange && setHovered(star)}
            onMouseLeave={() => onChange && setHovered(0)}
            onClick={() => onChange && onChange(star)}
            aria-label={`${star} star${star !== 1 ? 's' : ''}`}
          >
            <defs>
              <linearGradient id="half" x1="0" x2="1" y1="0" y2="0">
                <stop offset="50%" stopColor="#C94B2C" />
                <stop offset="50%" stopColor="none" stopOpacity="0" />
              </linearGradient>
            </defs>
            <polygon points="12,2 15.09,8.26 22,9.27 17,14.14 18.18,21.02 12,17.77 5.82,21.02 7,14.14 2,9.27 8.91,8.26" />
          </svg>
        );
      })}
    </span>
  );
}
