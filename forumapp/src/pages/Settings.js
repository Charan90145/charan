import React from 'react';
import styled from 'styled-components';
import { useTheme } from '../contexts/ThemeContext';
import { FiSettings } from 'react-icons/fi';

const SettingsContainer = styled.div`
  padding: 2rem 0;
`;

const Settings = () => {
  const { theme } = useTheme();

  return (
    <SettingsContainer>
      <div style={{ textAlign: 'center', padding: '4rem 0' }}>
        <FiSettings style={{ fontSize: '4rem', marginBottom: '1rem', color: theme === 'dark' ? '#a0aec0' : '#6b7280' }} />
        <h1 style={{ color: theme === 'dark' ? '#e2e8f0' : '#1a202c', marginBottom: '1rem' }}>
          Settings
        </h1>
        <p style={{ color: theme === 'dark' ? '#a0aec0' : '#6b7280' }}>
          Customize your forum experience and account preferences
        </p>
      </div>
    </SettingsContainer>
  );
};

export default Settings;