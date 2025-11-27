import React from 'react';
import styled from 'styled-components';
import { useTheme } from '../contexts/ThemeContext';
import { FiShield } from 'react-icons/fi';

const PrivacyContainer = styled.div`
  padding: 2rem 0;
`;

const Privacy = () => {
  const { theme } = useTheme();

  return (
    <PrivacyContainer>
      <div style={{ textAlign: 'center', padding: '4rem 0' }}>
        <FiShield style={{ fontSize: '4rem', marginBottom: '1rem', color: theme === 'dark' ? '#a0aec0' : '#6b7280' }} />
        <h1 style={{ color: theme === 'dark' ? '#e2e8f0' : '#1a202c', marginBottom: '1rem' }}>
          Privacy & Security
        </h1>
        <p style={{ color: theme === 'dark' ? '#a0aec0' : '#6b7280' }}>
          Manage your privacy settings and account security
        </p>
      </div>
    </PrivacyContainer>
  );
};

export default Privacy;