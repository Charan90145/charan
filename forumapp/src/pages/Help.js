import React from 'react';
import styled from 'styled-components';
import { useTheme } from '../contexts/ThemeContext';
import { FiHelpCircle } from 'react-icons/fi';

const HelpContainer = styled.div`
  padding: 2rem 0;
`;

const Help = () => {
  const { theme } = useTheme();

  return (
    <HelpContainer>
      <div style={{ textAlign: 'center', padding: '4rem 0' }}>
        <FiHelpCircle style={{ fontSize: '4rem', marginBottom: '1rem', color: theme === 'dark' ? '#a0aec0' : '#6b7280' }} />
        <h1 style={{ color: theme === 'dark' ? '#e2e8f0' : '#1a202c', marginBottom: '1rem' }}>
          Help & Support
        </h1>
        <p style={{ color: theme === 'dark' ? '#a0aec0' : '#6b7280' }}>
          Get help, find answers, and contact support
        </p>
      </div>
    </HelpContainer>
  );
};

export default Help;