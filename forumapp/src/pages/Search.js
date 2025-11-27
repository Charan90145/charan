import React from 'react';
import styled from 'styled-components';
import { useTheme } from '../contexts/ThemeContext';

const SearchContainer = styled.div`
  padding: 2rem 0;
`;

const Search = () => {
  const { theme } = useTheme();

  return (
    <SearchContainer>
      <div style={{ textAlign: 'center', padding: '4rem 0' }}>
        <h1 style={{ color: theme === 'dark' ? '#e2e8f0' : '#1a202c' }}>
          Search Results
        </h1>
        <p style={{ color: theme === 'dark' ? '#a0aec0' : '#6b7280' }}>
          This page will show search results for posts and users
        </p>
      </div>
    </SearchContainer>
  );
};

export default Search;