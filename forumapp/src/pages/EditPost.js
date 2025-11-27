import React from 'react';
import styled from 'styled-components';
import { useTheme } from '../contexts/ThemeContext';

const EditPostContainer = styled.div`
  padding: 2rem 0;
`;

const EditPost = () => {
  const { theme } = useTheme();

  return (
    <EditPostContainer>
      <div style={{ textAlign: 'center', padding: '4rem 0' }}>
        <h1 style={{ color: theme === 'dark' ? '#e2e8f0' : '#1a202c' }}>
          Edit Post
        </h1>
        <p style={{ color: theme === 'dark' ? '#a0aec0' : '#6b7280' }}>
          This page will have a form to edit existing posts
        </p>
      </div>
    </EditPostContainer>
  );
};

export default EditPost;