import React from 'react';
import styled from 'styled-components';
import { useTheme } from '../contexts/ThemeContext';
import { FiAward } from 'react-icons/fi';

const AchievementsContainer = styled.div`
  padding: 2rem 0;
`;

const Achievements = () => {
  const { theme } = useTheme();

  return (
    <AchievementsContainer>
      <div style={{ textAlign: 'center', padding: '4rem 0' }}>
        <FiAward style={{ fontSize: '4rem', marginBottom: '1rem', color: theme === 'dark' ? '#a0aec0' : '#6b7280' }} />
        <h1 style={{ color: theme === 'dark' ? '#e2e8f0' : '#1a202c', marginBottom: '1rem' }}>
          Achievements
        </h1>
        <p style={{ color: theme === 'dark' ? '#a0aec0' : '#6b7280' }}>
          Track your progress and unlock badges for your contributions
        </p>
      </div>
    </AchievementsContainer>
  );
};

export default Achievements;