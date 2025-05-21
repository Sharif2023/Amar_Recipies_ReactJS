import { Routes, Route } from 'react-router-dom';
import Home from '../pages/Home';
import Login from '../pages/Login';
import Register from '../pages/Register';
import AddRecipe from '../pages/AddRecipe';
import RecipeDetail from '../pages/RecipeDetail';
import AdminDashboard from '../pages/AdminDashboard';

const AppRoutes = () => (
  <Routes>
    <Route path="/" element={<Home />} />
    <Route path="/login" element={<Login />} />
    <Route path="/register" element={<Register />} />
    <Route path="/add-recipe" element={<AddRecipe />} />
    <Route path="/recipe/:id" element={<RecipeDetail />} />
    <Route path="/admin" element={<AdminDashboard />} />
  </Routes>
);
export default AppRoutes;
