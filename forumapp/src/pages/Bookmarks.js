import React from 'react';
import styled from 'styled-components';
import { useTheme } from '../contexts/ThemeContext';
import { FiBookmark } from 'react-icons/fi';

const BookmarksContainer = styled.div`
  padding: 2rem 0;
`;

const Bookmarks = () => {
  const { theme } = useTheme();

  return (
    <BookmarksContainer>
      <div style={{ textAlign: 'center', padding: '4rem 0' }}>
        <FiBookmark style={{ fontSize: '4rem', marginBottom: '1rem', color: theme === 'dark' ? '#a0aec0' : '#6b7280' }} />
        <h1 style={{ color: theme === 'dark' ? '#e2e8f0' : '#1a202c', marginBottom: '1rem' }}>
          My Bookmarks
        </h1>
        <p style={{ color: theme === 'dark' ? '#a0aec0' : '#6b7280' }}>
          Your saved posts and discussions will appear here
        </p>
      </div>
    </BookmarksContainer>
  );
};

export default Bookmarks;