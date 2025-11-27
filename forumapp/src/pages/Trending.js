import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { useTheme } from '../contexts/ThemeContext';
import PostCard from '../components/PostCard';
import { store, sortPosts } from '../store';

const Container = styled.div`
  padding: 2rem 0;
`;

const Title = styled.h1`
  font-size: 1.75rem;
  margin-bottom: 1rem;
  color: ${props => props.theme === 'dark' ? '#e2e8f0' : '#1f2937'};
`;

const Trending = () => {
  const { theme } = useTheme();
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    const t = setTimeout(() => {
      const all = store.getAllPosts();
      setPosts(sortPosts(all, 'trending'));
      setLoading(false);
    }, 200);
    return () => clearTimeout(t);
  }, []);

  return (
    <Container>
      <Title theme={theme}>Trending Posts</Title>
      {loading ? (
        <div style={{ color: theme === 'dark' ? '#9ca3af' : '#6b7280' }}>Loading...</div>
      ) : posts.length === 0 ? (
        <div style={{ color: theme === 'dark' ? '#9ca3af' : '#6b7280' }}>No trending posts found.</div>
      ) : (
        <div style={{ display: 'grid', gap: '1rem' }}>
          {posts.map(p => (
            <PostCard key={p.id} post={p} theme={theme} />
          ))}
        </div>
      )}
    </Container>
  );
};

export default Trending;


