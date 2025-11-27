import React from 'react';
import styled from 'styled-components';
import { useTheme } from '../contexts/ThemeContext';

const CategoryContainer = styled.div`
  padding: 2rem 0;
`;

const Category = () => {
  const { theme } = useTheme();

  return (
    <CategoryContainer>
      <div style={{ textAlign: 'center', padding: '4rem 0' }}>
        <h1 style={{ color: theme === 'dark' ? '#e2e8f0' : '#1a202c' }}>
          Category Posts
        </h1>
        <p style={{ color: theme === 'dark' ? '#a0aec0' : '#6b7280' }}>
          This page will show posts filtered by category
        </p>
      </div>
    </CategoryContainer>
  );
};

export default Category;