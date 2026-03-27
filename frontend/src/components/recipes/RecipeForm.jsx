// RecipeForm — controlled form for adding or editing a recipe
import { useState } from 'react';
import { categories } from '../../data/mockData';

const EMPTY_FORM = {
  title: '',
  category: '',
  description: '',
  ingredients: '',
  instructions: '',
};

export default function RecipeForm({ recipe, onSubmit, onCancel, title }) {
  const [form, setForm] = useState(recipe ? {
    title:        recipe.title,
    category:     recipe.category,
    description:  recipe.description,
    ingredients:  recipe.ingredients,
    instructions: recipe.instructions,
  } : EMPTY_FORM);

  const [errors, setErrors] = useState({});
  const [touched, setTouched] = useState({});

  const namedCategories = categories.filter((c) => c !== 'All');

  const validate = (data) => {
    const e = {};
    if (!data.title.trim())        e.title        = 'Recipe title is required.';
    if (!data.category)            e.category     = 'Please select a category.';
    if (!data.description.trim())  e.description  = 'A short description is required.';
    if (!data.ingredients.trim())  e.ingredients  = 'Ingredients cannot be empty.';
    if (!data.instructions.trim()) e.instructions = 'Instructions cannot be empty.';
    return e;
  };

  const handleChange = (field, value) => {
    const updated = { ...form, [field]: value };
    setForm(updated);
    if (touched[field]) {
      const newErrors = validate(updated);
      setErrors((prev) => ({ ...prev, [field]: newErrors[field] }));
    }
  };

  const handleBlur = (field) => {
    setTouched((prev) => ({ ...prev, [field]: true }));
    const newErrors = validate(form);
    setErrors((prev) => ({ ...prev, [field]: newErrors[field] }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const allTouched = Object.fromEntries(Object.keys(EMPTY_FORM).map((k) => [k, true]));
    setTouched(allTouched);
    const errs = validate(form);
    setErrors(errs);
    if (Object.keys(errs).length > 0) return;
    onSubmit(form);
  };

  const Field = ({ label, id, required, hint, error, children }) => (
    <div style={s.fieldGroup}>
      <label style={s.label} htmlFor={id}>
        {label} {required && <span style={s.required}>*</span>}
      </label>
      {hint && <p style={s.hint}>{hint}</p>}
      {children}
      {error && <p style={s.fieldError}>{error}</p>}
    </div>
  );

  return (
    <div style={s.page}>
      <div style={s.container} className="animate-up">
        {/* Header */}
        <div style={s.header}>
          <button style={s.backBtn} onClick={onCancel} type="button">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" width="16" height="16">
              <path d="M19 12H5M12 19l-7-7 7-7" />
            </svg>
            Back
          </button>
          <h1 style={s.heading}>{title}</h1>
          <p style={s.subheading}>Fill in the details below to share your recipe with the community.</p>
        </div>

        <form onSubmit={handleSubmit} style={s.form} noValidate>
          {/* Two columns: title + category */}
          <div style={s.row}>
            <Field label="Recipe Title" id="title" required error={errors.title}>
              <input
                id="title"
                type="text"
                value={form.title}
                onChange={(e) => handleChange('title', e.target.value)}
                onBlur={() => handleBlur('title')}
                placeholder="e.g. Spiced Lamb Kofta"
                style={{ ...s.input, borderColor: errors.title ? '#C94B2C' : '#E4DAD0' }}
                maxLength={150}
              />
            </Field>
            <Field label="Category" id="category" required error={errors.category}>
              <select
                id="category"
                value={form.category}
                onChange={(e) => handleChange('category', e.target.value)}
                onBlur={() => handleBlur('category')}
                style={{ ...s.select, borderColor: errors.category ? '#C94B2C' : '#E4DAD0' }}
              >
                <option value="">Select a category…</option>
                {namedCategories.map((cat) => (
                  <option key={cat} value={cat}>{cat}</option>
                ))}
              </select>
            </Field>
          </div>

          <Field
            label="Short Description"
            id="description"
            required
            hint="One or two sentences about the dish — what makes it special?"
            error={errors.description}
          >
            <textarea
              id="description"
              value={form.description}
              onChange={(e) => handleChange('description', e.target.value)}
              onBlur={() => handleBlur('description')}
              placeholder="A warm, creamy bowl of…"
              rows={2}
              style={{ ...s.textarea, borderColor: errors.description ? '#C94B2C' : '#E4DAD0' }}
              maxLength={300}
            />
          </Field>

          <Field
            label="Ingredients"
            id="ingredients"
            required
            hint="Enter one ingredient per line (e.g. 500g ground lamb)"
            error={errors.ingredients}
          >
            <textarea
              id="ingredients"
              value={form.ingredients}
              onChange={(e) => handleChange('ingredients', e.target.value)}
              onBlur={() => handleBlur('ingredients')}
              placeholder={`500g ground lamb\n3 garlic cloves\n1 tsp cumin`}
              rows={7}
              style={{ ...s.textarea, fontFamily: 'monospace', borderColor: errors.ingredients ? '#C94B2C' : '#E4DAD0' }}
            />
          </Field>

          <Field
            label="Instructions"
            id="instructions"
            required
            hint="Number each step for clarity (e.g. 1. Preheat oven…)"
            error={errors.instructions}
          >
            <textarea
              id="instructions"
              value={form.instructions}
              onChange={(e) => handleChange('instructions', e.target.value)}
              onBlur={() => handleBlur('instructions')}
              placeholder={`1. Combine all ingredients in a bowl.\n2. Shape into patties.\n3. Grill for 4 minutes per side.`}
              rows={8}
              style={{ ...s.textarea, borderColor: errors.instructions ? '#C94B2C' : '#E4DAD0' }}
            />
          </Field>

          {/* Action row */}
          <div style={s.actionRow}>
            <button type="button" style={s.cancelBtn} onClick={onCancel}>
              Cancel
            </button>
            <button type="submit" style={s.submitBtn}>
              {recipe ? 'Save Changes' : 'Publish Recipe'}
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" width="16" height="16">
                <path d="M5 12h14M12 5l7 7-7 7" />
              </svg>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

const s = {
  page: {
    backgroundColor: '#F8F4EE',
    minHeight: '100vh',
    padding: '40px 24px 80px',
  },
  container: {
    maxWidth: '780px',
    margin: '0 auto',
  },
  header: {
    marginBottom: '32px',
  },
  backBtn: {
    display: 'inline-flex',
    alignItems: 'center',
    gap: '6px',
    background: 'none',
    border: 'none',
    fontSize: '0.875rem',
    fontWeight: '500',
    color: '#6E6E6E',
    cursor: 'pointer',
    padding: '6px 0',
    marginBottom: '20px',
  },
  heading: {
    fontSize: '2rem',
    fontWeight: '700',
    fontFamily: "Georgia, 'Times New Roman', serif",
    color: '#1A1A1A',
    margin: '0 0 8px 0',
  },
  subheading: {
    fontSize: '0.9rem',
    color: '#6E6E6E',
    margin: 0,
  },
  form: {
    backgroundColor: '#fff',
    borderRadius: '16px',
    border: '1.5px solid #E4DAD0',
    padding: '32px',
    display: 'flex',
    flexDirection: 'column',
    gap: '24px',
  },
  row: {
    display: 'grid',
    gridTemplateColumns: '1fr 200px',
    gap: '20px',
    alignItems: 'start',
  },
  fieldGroup: {
    display: 'flex',
    flexDirection: 'column',
    gap: '6px',
  },
  label: {
    fontSize: '0.82rem',
    fontWeight: '700',
    color: '#3A3A3A',
    textTransform: 'uppercase',
    letterSpacing: '0.05em',
  },
  required: {
    color: '#C94B2C',
  },
  hint: {
    fontSize: '0.78rem',
    color: '#9E9080',
    margin: 0,
    lineHeight: 1.5,
  },
  input: {
    padding: '11px 14px',
    border: '1.5px solid #E4DAD0',
    borderRadius: '8px',
    fontSize: '0.925rem',
    color: '#1A1A1A',
    outline: 'none',
    transition: 'border-color 0.2s ease',
    width: '100%',
    backgroundColor: '#fff',
  },
  select: {
    padding: '11px 14px',
    border: '1.5px solid #E4DAD0',
    borderRadius: '8px',
    fontSize: '0.925rem',
    color: '#1A1A1A',
    outline: 'none',
    width: '100%',
    backgroundColor: '#fff',
    appearance: 'auto',
  },
  textarea: {
    padding: '11px 14px',
    border: '1.5px solid #E4DAD0',
    borderRadius: '8px',
    fontSize: '0.9rem',
    color: '#1A1A1A',
    resize: 'vertical',
    outline: 'none',
    lineHeight: 1.65,
    transition: 'border-color 0.2s ease',
    width: '100%',
    fontFamily: 'inherit',
    backgroundColor: '#fff',
  },
  fieldError: {
    fontSize: '0.78rem',
    color: '#C94B2C',
    margin: 0,
    display: 'flex',
    alignItems: 'center',
    gap: '4px',
  },
  actionRow: {
    display: 'flex',
    justifyContent: 'flex-end',
    gap: '12px',
    paddingTop: '8px',
    borderTop: '1px solid #F0EAE0',
  },
  cancelBtn: {
    padding: '11px 22px',
    background: 'none',
    border: '1.5px solid #E4DAD0',
    borderRadius: '9px',
    fontSize: '0.925rem',
    fontWeight: '500',
    color: '#6E6E6E',
    cursor: 'pointer',
  },
  submitBtn: {
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
    padding: '11px 24px',
    backgroundColor: '#C94B2C',
    color: '#fff',
    border: 'none',
    borderRadius: '9px',
    fontSize: '0.925rem',
    fontWeight: '600',
    cursor: 'pointer',
    transition: 'background-color 0.2s ease',
  },
};
