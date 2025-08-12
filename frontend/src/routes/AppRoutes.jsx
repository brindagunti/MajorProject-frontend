import { Routes, Route } from 'react-router-dom';
import Home from '../pages/Home.jsx';
import Login from '../pages/Login.jsx';
import Signup from '../pages/Signup';
import Predict from '../pages/Predict';
import Chat from '../pages/Chat';
import Find from '../pages/Find';
import Book from '../pages/Book';
import Profile from '../pages/Profile';

export default function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Signup />} />
      <Route path="/predict" element={<Predict />} />
      <Route path="/chat" element={<Chat />} />
      <Route path="/find" element={ <Find />} />
      <Route path="/book" element={<Book />} />
      <Route path="/profile" element={<Profile />} />
    </Routes>
  );
}
