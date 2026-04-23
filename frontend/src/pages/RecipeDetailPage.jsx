// RecipeDetailPage.jsx - fetches and shows a single recipe with its reviews
import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { getRecipeById, getReviewsByRecipe, deleteRecipe, createReview } from '../services/api';
import RecipeDetail from '../components/recipes/RecipeDetail';

// convert backend fields to what RecipeDetail expects
function normalizeRecipe(r, reviews) {
  const avgRating = reviews.length > 0
    ? reviews.reduce((sum, rv) => sum + rv.rating, 0) / reviews.length
    : 0;
  return {
    ...r,
    author:      r.author_name,
    authorId:    r.user_id,
    createdAt:   r.created_at,
    rating:      Math.round(avgRating * 10) / 10,
    reviewCount: reviews.length,
  };
}

// convert review fields for ReviewList component
function normalizeReview(rv) {
  return {
    ...rv,
    user: rv.reviewer_name,
    date: rv.created_at ? rv.created_at.split('T')[0] : '',
  };
}

export default function RecipeDetailPage({ onToast }) {
  const { id }     = useParams();
  const navigate   = useNavigate();
  const { user }   = useAuth();

  const [recipe,  setRecipe]  = useState(null);
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error,   setError]   = useState(null);

  // load recipe and its reviews together when the page opens
  useEffect(() => {
    async function load() {
      try {
        const [recipeData, reviewsData] = await Promise.all([
          getRecipeById(id),
          getReviewsByRecipe(id),
        ]);
        const normalized = reviewsData.map(normalizeReview);
        setReviews(normalized);
        setRecipe(normalizeRecipe(recipeData, reviewsData));
      } catch {
        setError('Recipe not found or could not be loaded.');
      } finally {
        setLoading(false);
      }
    }
    load();
  }, [id]);

  async function handleDelete(recipeId) {
    try {
      await deleteRecipe(recipeId);
      onToast('Recipe deleted.', 'info');
      navigate('/recipes');
    } catch (err) {
      onToast(err.message || 'Could not delete recipe.', 'error');
    }
  }

  async function handleAddReview(recipeId, reviewData) {
    try {
      const newReview = await createReview(recipeId, reviewData.rating, reviewData.comment);
      const normalized = normalizeReview({ ...newReview, reviewer_name: user.name });

      const updatedReviews = [normalized, ...reviews];
      setReviews(updatedReviews);

      // recalculate the average rating shown in the header
      const avg = updatedReviews.reduce((sum, rv) => sum + rv.rating, 0) / updatedReviews.length;
      setRecipe((prev) => ({
        ...prev,
        rating:      Math.round(avg * 10) / 10,
        reviewCount: updatedReviews.length,
      }));

      onToast('Review posted!');
    } catch (err) {
      onToast(err.message || 'Could not post review.', 'error');
    }
  }

  if (loading) return <p style={s.status}>Loading recipe...</p>;
  if (error)   return <p style={s.errorText}>{error}</p>;
  if (!recipe) return null;

  return (
    <RecipeDetail
      recipe={recipe}
      reviews={reviews}
      currentUser={user}
      onBack={() => navigate('/recipes')}
      onEdit={(r) => navigate('/recipes/' + r.id + '/edit')}
      onDelete={handleDelete}
      onAddReview={handleAddReview}
      onLoginRequired={() => navigate('/auth/login')}
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
  errorText: {
    color: '#FF5C2B',
    fontSize: '0.95rem',
    textAlign: 'center',
    padding: '80px 24px',
  },
};
