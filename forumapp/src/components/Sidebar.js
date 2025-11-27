import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import styled from 'styled-components';
import { useTheme } from '../contexts/ThemeContext';
import { 
  FiHome, 
  FiTrendingUp, 
  FiTag, 
  FiUsers, 
  FiClock,
  FiStar,
  FiMessageSquare,
  FiBookmark,
  FiSettings,
  FiBell,
  FiUser,
  FiBarChart,
  FiAward,
  FiHelpCircle,
  FiShield
} from 'react-icons/fi';

const SidebarContainer = styled.aside`
  width: 250px;
  background: ${props => props.theme === 'dark' ? '#2d3748' : 'white'};
  border-radius: 0.75rem;
  padding: 1.5rem;
  height: fit-content;
  position: sticky;
  top: 6rem;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);

  @media (max-width: 768px) {
    width: 100%;
    position: static;
    margin-bottom: 1rem;
  }
`;

const SidebarTitle = styled.h3`
  font-size: 1.125rem;
  font-weight: 600;
  color: ${props => props.theme === 'dark' ? '#e2e8f0' : '#1a202c'};
  margin-bottom: 1rem;
`;

const NavigationList = styled.ul`
  list-style: none;
  margin: 0;
  padding: 0;
`;

const NavigationItem = styled.li`
  margin-bottom: 0.25rem;
`;

const NavigationLink = styled(Link)`
  display: flex;
  align-items: center;
  gap: 0.75rem;
  padding: 0.75rem 1rem;
  color: ${props => props.active 
    ? '#667eea' 
    : props.theme === 'dark' ? '#a0aec0' : '#6b7280'
  };
  text-decoration: none;
  border-radius: 0.5rem;
  font-weight: ${props => props.active ? '500' : '400'};
  background: ${props => props.active 
    ? props.theme === 'dark' ? 'rgba(102, 126, 234, 0.1)' : 'rgba(102, 126, 234, 0.05)'
    : 'transparent'
  };
  transition: all 0.2s ease;

  &:hover {
    background: ${props => props.theme === 'dark' ? '#4a5568' : '#f8fafc'};
    color: ${props => props.theme === 'dark' ? '#e2e8f0' : '#1a202c'};
  }
`;

const IconWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 1.25rem;
  height: 1.25rem;
`;

const CategorySection = styled.div`
  margin-top: 2rem;
`;

const DashboardSection = styled.div`
  margin-top: 2rem;
`;

const CategoryTitle = styled.h4`
  font-size: 0.875rem;
  font-weight: 600;
  color: ${props => props.theme === 'dark' ? '#a0aec0' : '#6b7280'};
  text-transform: uppercase;
  letter-spacing: 0.05em;
  margin-bottom: 0.75rem;
`;

const CategoryList = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
`;

const CategoryTag = styled(Link)`
  display: inline-flex;
  align-items: center;
  padding: 0.375rem 0.75rem;
  background: ${props => props.theme === 'dark' ? '#4a5568' : '#f1f5f9'};
  color: ${props => props.theme === 'dark' ? '#e2e8f0' : '#4a5568'};
  text-decoration: none;
  border-radius: 1rem;
  font-size: 0.75rem;
  font-weight: 500;
  transition: all 0.2s ease;

  &:hover {
    background: ${props => props.theme === 'dark' ? '#5a6578' : '#e2e8f0'};
    transform: translateY(-1px);
  }
`;

const StatsSection = styled.div`
  margin-top: 2rem;
  padding-top: 1.5rem;
  border-top: 1px solid ${props => props.theme === 'dark' ? '#4a5568' : '#e2e8f0'};
`;

const StatItem = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0.5rem 0;
  color: ${props => props.theme === 'dark' ? '#a0aec0' : '#6b7280'};
  font-size: 0.875rem;
`;

const StatValue = styled.span`
  font-weight: 600;
  color: ${props => props.theme === 'dark' ? '#e2e8f0' : '#1a202c'};
`;

const Sidebar = () => {
  const { theme } = useTheme();
  const location = useLocation();

  const navigationItems = [
    { path: '/forum', label: 'Home', icon: FiHome },
    { path: '/trending', label: 'Trending', icon: FiTrendingUp },
    { path: '/recent', label: 'Recent', icon: FiClock },
    { path: '/popular', label: 'Popular', icon: FiStar },
    { path: '/bookmarks', label: 'Bookmarks', icon: FiBookmark },
    { path: '/my-posts', label: 'My Posts', icon: FiUser },
    { path: '/notifications', label: 'Notifications', icon: FiBell },
  ];

  const dashboardItems = [
    { path: '/analytics', label: 'Analytics', icon: FiBarChart },
    { path: '/achievements', label: 'Achievements', icon: FiAward },
    { path: '/settings', label: 'Settings', icon: FiSettings },
    { path: '/help', label: 'Help & Support', icon: FiHelpCircle },
    { path: '/privacy', label: 'Privacy', icon: FiShield },
  ];

  const categories = [
    'Technology',
    'Programming',
    'Web Development',
    'Mobile Apps',
    'Data Science',
    'AI/ML',
    'DevOps',
    'Design',
    'General Discussion',
    'Help & Support'
  ];

  const stats = [
    { label: 'Total Posts', value: '2,847' },
    { label: 'Active Users', value: '1,234' },
    { label: 'Categories', value: '10' },
    { label: 'Comments', value: '15,692' }
  ];

  return (
    <SidebarContainer theme={theme}>
      <SidebarTitle theme={theme}>Navigation</SidebarTitle>
      <NavigationList>
        {navigationItems.map((item) => {
          const Icon = item.icon;
          const isActive = location.pathname === item.path;
          
          return (
            <NavigationItem key={item.path}>
              <NavigationLink 
                to={item.path} 
                active={isActive ? 1 : 0}
                theme={theme}
              >
                <IconWrapper>
                  <Icon />
                </IconWrapper>
                {item.label}
              </NavigationLink>
            </NavigationItem>
          );
        })}
      </NavigationList>

      <CategorySection>
        <CategoryTitle theme={theme}>Categories</CategoryTitle>
        <CategoryList>
          {categories.map((category) => (
            <CategoryTag 
              key={category} 
              to={`/category/${category.toLowerCase().replace(/\s+/g, '-')}`}
              theme={theme}
            >
              {category}
            </CategoryTag>
          ))}
        </CategoryList>
      </CategorySection>

      <DashboardSection>
        <CategoryTitle theme={theme}>Dashboard</CategoryTitle>
        <NavigationList>
          {dashboardItems.map((item) => {
            const Icon = item.icon;
            const isActive = location.pathname === item.path;
            
            return (
              <NavigationItem key={item.path}>
                <NavigationLink 
                  to={item.path} 
                  active={isActive ? 1 : 0}
                  theme={theme}
                >
                  <IconWrapper>
                    <Icon />
                  </IconWrapper>
                  {item.label}
                </NavigationLink>
              </NavigationItem>
            );
          })}
        </NavigationList>
      </DashboardSection>

      <StatsSection theme={theme}>
        <SidebarTitle theme={theme}>Forum Stats</SidebarTitle>
        {stats.map((stat) => (
          <StatItem key={stat.label} theme={theme}>
            <span>{stat.label}</span>
            <StatValue theme={theme}>{stat.value}</StatValue>
          </StatItem>
        ))}
      </StatsSection>
    </SidebarContainer>
  );
};

export default Sidebar;