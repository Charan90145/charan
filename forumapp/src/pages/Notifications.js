import React from 'react';
import styled from 'styled-components';
import { useTheme } from '../contexts/ThemeContext';
import { FiBell } from 'react-icons/fi';

const NotificationsContainer = styled.div`
  padding: 2rem 0;
`;

const Notifications = () => {
  const { theme } = useTheme();

  return (
    <NotificationsContainer>
      <div style={{ textAlign: 'center', padding: '4rem 0' }}>
        <FiBell style={{ fontSize: '4rem', marginBottom: '1rem', color: theme === 'dark' ? '#a0aec0' : '#6b7280' }} />
        <h1 style={{ color: theme === 'dark' ? '#e2e8f0' : '#1a202c', marginBottom: '1rem' }}>
          Notifications
        </h1>
        <p style={{ color: theme === 'dark' ? '#a0aec0' : '#6b7280' }}>
          Stay updated with forum activity and mentions
        </p>
      </div>
    </NotificationsContainer>
  );
};

export default Notifications;