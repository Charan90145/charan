import React from 'react';
import styled from 'styled-components';
import Header from './Header';
import Sidebar from './Sidebar';
import Footer from './Footer';
import { useTheme } from '../contexts/ThemeContext';

const LayoutContainer = styled.div`
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  background: ${props => props.theme === 'dark' ? '#1a202c' : '#f8fafc'};
  color: ${props => props.theme === 'dark' ? '#e2e8f0' : '#1a202c'};
  transition: all 0.3s ease;
`;

const MainContent = styled.div`
  display: flex;
  flex: 1;
  max-width: 1200px;
  margin: 0 auto;
  width: 100%;
  gap: 2rem;
  padding: 0 1rem;

  @media (max-width: 768px) {
    flex-direction: column;
    gap: 1rem;
    padding: 0 0.5rem;
  }
`;

const ContentArea = styled.main`
  flex: 1;
  min-width: 0;
`;

const Layout = ({ children }) => {
  const { theme } = useTheme();

  return (
    <LayoutContainer theme={theme}>
      <Header />
      <MainContent theme={theme}>
        <Sidebar />
        <ContentArea>
          {children}
        </ContentArea>
      </MainContent>
      <Footer />
    </LayoutContainer>
  );
};

export default Layout;