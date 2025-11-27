import React from 'react';
import styled from 'styled-components';
import { useTheme } from '../contexts/ThemeContext';
import { FiBarChart } from 'react-icons/fi';

const AnalyticsContainer = styled.div`
  padding: 2rem 0;
`;

const Analytics = () => {
  const { theme } = useTheme();

  return (
    <AnalyticsContainer>
      <div style={{ textAlign: 'center', padding: '4rem 0' }}>
        <FiBarChart style={{ fontSize: '4rem', marginBottom: '1rem', color: theme === 'dark' ? '#a0aec0' : '#6b7280' }} />
        <h1 style={{ color: theme === 'dark' ? '#e2e8f0' : '#1a202c', marginBottom: '1rem' }}>
          Analytics
        </h1>
        <p style={{ color: theme === 'dark' ? '#a0aec0' : '#6b7280' }}>
          View detailed statistics and insights about your forum activity
        </p>
      </div>
    </AnalyticsContainer>
  );
};

export default Analytics;