import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';
import { ThemeProvider } from './contexts/ThemeContext';
import Layout from './components/Layout';
import Home from './pages/Home';
import PostDetail from './pages/PostDetail';
import CreatePost from './pages/CreatePost';
import EditPost from './pages/EditPost';
import Login from './pages/Login';
import Register from './pages/Register';
import Profile from './pages/Profile';
import Category from './pages/Category';
import Search from './pages/Search';
import Bookmarks from './pages/Bookmarks';
import MyPosts from './pages/MyPosts';
import Notifications from './pages/Notifications';
import Analytics from './pages/Analytics';
import Achievements from './pages/Achievements';
import Settings from './pages/Settings';
import Help from './pages/Help';
import Privacy from './pages/Privacy';
import NotFound from './pages/NotFound';
import AllPosts from './pages/AllPosts';
import Trending from './pages/Trending';
import Recent from './pages/Recent';
import Popular from './pages/Popular';

function App() {
  return (
    <ThemeProvider>
      <AuthProvider>
        <Layout>
          <Routes>
            <Route path="/" element={<Login />} />
            <Route path="/forum" element={<Home />} />
            <Route path="/posts" element={<AllPosts />} />
            <Route path="/trending" element={<Trending />} />
            <Route path="/recent" element={<Recent />} />
            <Route path="/popular" element={<Popular />} />
            <Route path="/post/:id" element={<PostDetail />} />
            <Route path="/create" element={<CreatePost />} />
            <Route path="/edit/:id" element={<EditPost />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/profile/:username" element={<Profile />} />
            <Route path="/category/:category" element={<Category />} />
            <Route path="/search" element={<Search />} />
            <Route path="/bookmarks" element={<Bookmarks />} />
            <Route path="/my-posts" element={<MyPosts />} />
            <Route path="/notifications" element={<Notifications />} />
            <Route path="/analytics" element={<Analytics />} />
            <Route path="/achievements" element={<Achievements />} />
            <Route path="/settings" element={<Settings />} />
            <Route path="/help" element={<Help />} />
            <Route path="/privacy" element={<Privacy />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </Layout>
      </AuthProvider>
    </ThemeProvider>
  );
}

export default App;