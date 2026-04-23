// RecipeFormPage.jsx - handles both creating a new recipe and editing an existing one
// If a recipe ID is in the URL, it loads that recipe and switches to edit mode
import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getRecipeById, createRecipe, updateRecipe } from '../services/api';
import RecipeForm from '../components/recipes/RecipeForm';

export default function RecipeFormPage({ onToast }) {
  const { id }   = useParams();   // only present when editing
  const navigate = useNavigate();
  const isEdit   = Boolean(id);

  const [existingRecipe, setExistingRecipe] = useState(null);
  const [loading, setLoading] = useState(isEdit); // only need to load for edits

  // if editing, fetch the current recipe data to pre-fill the form
  useEffect(() => {
    if (!isEdit) return;
    getRecipeById(id)
      .then((data) => setExistingRecipe(data))
      .catch(() => {
        onToast('Could not load recipe for editing.', 'error');
        navigate('/recipes');
      })
      .finally(() => setLoading(false));
  }, [id]);

  async function handleSubmit(formData) {
    try {
      if (isEdit) {
        await updateRecipe(id, formData);
        onToast('Recipe updated.');
        navigate('/recipes/' + id);
      } else {
        const newRecipe = await createRecipe(formData);
        onToast('Recipe published successfully!');
        navigate('/recipes/' + newRecipe.id);
      }
    } catch (err) {
      onToast(err.message || 'Could not save recipe.', 'error');
    }
  }

  if (loading) return <p style={s.status}>Loading recipe...</p>;

  return (
    <RecipeForm
      recipe={existingRecipe}
      onSubmit={handleSubmit}
      onCancel={() => isEdit ? navigate('/recipes/' + id) : navigate('/recipes')}
      title={isEdit ? 'Edit Recipe' : 'Share a New Recipe'}
    />
  );
}

const s = {
  status: {
    color: '#505060',
    fontSize: '0.95rem',
    textAlign: 'center',
    padding: '80px 24px',
  },
};
