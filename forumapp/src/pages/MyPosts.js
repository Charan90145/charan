import React from 'react';
import styled from 'styled-components';
import { useTheme } from '../contexts/ThemeContext';
import { FiUser } from 'react-icons/fi';

const MyPostsContainer = styled.div`
  padding: 2rem 0;
`;

const MyPosts = () => {
  const { theme } = useTheme();

  return (
    <MyPostsContainer>
      <div style={{ textAlign: 'center', padding: '4rem 0' }}>
        <FiUser style={{ fontSize: '4rem', marginBottom: '1rem', color: theme === 'dark' ? '#a0aec0' : '#6b7280' }} />
        <h1 style={{ color: theme === 'dark' ? '#e2e8f0' : '#1a202c', marginBottom: '1rem' }}>
          My Posts
        </h1>
        <p style={{ color: theme === 'dark' ? '#a0aec0' : '#6b7280' }}>
          View and manage all your posts and contributions
        </p>
      </div>
    </MyPostsContainer>
  );
};

export default MyPosts;