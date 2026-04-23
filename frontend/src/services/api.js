// api.js - all fetch calls to the TasteHome backend go through here
const BASE = import.meta.env.VITE_API_URL || 'https://tastehome-api-fdse.onrender.com';

function getToken() {
  return localStorage.getItem('tastehome_token');
}

// shared fetch wrapper - attaches auth header automatically when logged in
async function apiFetch(path, options = {}) {
  const token = getToken();
  const headers = { 'Content-Type': 'application/json' };
  if (token) {
    headers['Authorization'] = 'Bearer ' + token;
  }
  const response = await fetch(BASE + path, { ...options, headers });
  const data = await response.json();
  if (!response.ok) {
    throw new Error(data.message || 'Something went wrong. Please try again.');
  }
  return data;
}

// Auth
export function loginUser(email, password) {
  return apiFetch('/api/auth/login', { method: 'POST', body: JSON.stringify({ email, password }) });
}
export function registerUser(name, email, password) {
  return apiFetch('/api/auth/register', { method: 'POST', body: JSON.stringify({ name, email, password }) });
}

// Recipes
export function getAllRecipes() { return apiFetch('/api/recipes'); }
export function getRecipeById(id) { return apiFetch('/api/recipes/' + id); }
export function createRecipe(data) { return apiFetch('/api/recipes', { method: 'POST', body: JSON.stringify(data) }); }
export function updateRecipe(id, data) { return apiFetch('/api/recipes/' + id, { method: 'PUT', body: JSON.stringify(data) }); }
export function deleteRecipe(id) { return apiFetch('/api/recipes/' + id, { method: 'DELETE' }); }

// Reviews
export function getReviewsByRecipe(recipeId) { return apiFetch('/api/recipes/' + recipeId + '/reviews'); }
export function createReview(recipeId, rating, comment) {
  return apiFetch('/api/recipes/' + recipeId + '/reviews', { method: 'POST', body: JSON.stringify({ rating, comment }) });
}
