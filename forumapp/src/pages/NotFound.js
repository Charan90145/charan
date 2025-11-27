import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { useTheme } from '../contexts/ThemeContext';
import { FiHome, FiArrowLeft } from 'react-icons/fi';

const NotFoundContainer = styled.div`
  min-height: 60vh;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 2rem 1rem;
  text-align: center;
`;

const NotFoundContent = styled.div`
  max-width: 500px;
`;

const NotFoundTitle = styled.h1`
  font-size: 6rem;
  font-weight: 700;
  color: ${props => props.theme === 'dark' ? '#e2e8f0' : '#1a202c'};
  margin-bottom: 1rem;
  line-height: 1;

  @media (max-width: 768px) {
    font-size: 4rem;
  }
`;

const NotFoundSubtitle = styled.h2`
  font-size: 1.5rem;
  font-weight: 600;
  color: ${props => props.theme === 'dark' ? '#a0aec0' : '#6b7280'};
  margin-bottom: 1rem;
`;

const NotFoundDescription = styled.p`
  color: ${props => props.theme === 'dark' ? '#a0aec0' : '#6b7280'};
  margin-bottom: 2rem;
  line-height: 1.6;
`;

const ActionButtons = styled.div`
  display: flex;
  gap: 1rem;
  justify-content: center;
  flex-wrap: wrap;
`;

const ActionButton = styled(Link)`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.75rem 1.5rem;
  background: ${props => props.primary 
    ? 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)' 
    : 'transparent'
  };
  color: ${props => props.primary ? 'white' : '#667eea'};
  border: 2px solid #667eea;
  border-radius: 0.5rem;
  text-decoration: none;
  font-weight: 500;
  font-size: 0.875rem;
  transition: all 0.2s ease;

  &:hover {
    transform: translateY(-1px);
    box-shadow: ${props => props.primary 
      ? '0 4px 12px rgba(102, 126, 234, 0.4)' 
      : '0 2px 4px rgba(102, 126, 234, 0.2)'
    };
  }
`;

const NotFound = () => {
  const { theme } = useTheme();

  return (
    <NotFoundContainer>
      <NotFoundContent>
        <NotFoundTitle theme={theme}>404</NotFoundTitle>
        <NotFoundSubtitle theme={theme}>Page Not Found</NotFoundSubtitle>
        <NotFoundDescription theme={theme}>
          Sorry, the page you are looking for doesn't exist or has been moved.
        </NotFoundDescription>
        <ActionButtons>
          <ActionButton to="/forum" primary>
            <FiHome />
            Go to Forum
          </ActionButton>
          <ActionButton to="/" onClick={() => window.history.back()}>
            <FiArrowLeft />
            Go Back
          </ActionButton>
        </ActionButtons>
      </NotFoundContent>
    </NotFoundContainer>
  );
};

export default NotFound;