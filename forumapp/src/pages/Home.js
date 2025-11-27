import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { useTheme } from '../contexts/ThemeContext';
import PostCard from '../components/PostCard';
import FilterBar from '../components/FilterBar';
import { FiTrendingUp, FiClock, FiStar, FiMessageSquare } from 'react-icons/fi';
import { store, sortPosts } from '../store';

const HomeContainer = styled.div`
  padding: 2rem 0;
`;

const WelcomeSection = styled.div`
  background: ${props => props.theme === 'dark' 
    ? 'linear-gradient(135deg, #2d3748 0%, #4a5568 100%)' 
    : 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)'
  };
  color: white;
  padding: 3rem 2rem;
  border-radius: 1rem;
  margin-bottom: 2rem;
  text-align: center;
`;

const WelcomeTitle = styled.h1`
  font-size: 2.5rem;
  font-weight: 700;
  margin-bottom: 1rem;
  background: linear-gradient(45deg, #fff, #e2e8f0);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;

  @media (max-width: 768px) {
    font-size: 2rem;
  }
`;

const WelcomeSubtitle = styled.p`
  font-size: 1.125rem;
  opacity: 0.9;
  max-width: 600px;
  margin: 0 auto 2rem;
  line-height: 1.6;
`;

const WelcomeStats = styled.div`
  display: flex;
  justify-content: center;
  gap: 3rem;
  flex-wrap: wrap;

  @media (max-width: 768px) {
    gap: 2rem;
  }
`;

const StatItem = styled.div`
  text-align: center;
`;

const StatValue = styled.div`
  font-size: 2rem;
  font-weight: 700;
  margin-bottom: 0.25rem;
`;

const StatLabel = styled.div`
  font-size: 0.875rem;
  opacity: 0.8;
`;

const ContentSection = styled.div`
  display: grid;
  grid-template-columns: 1fr 300px;
  gap: 2rem;

  @media (max-width: 1024px) {
    grid-template-columns: 1fr;
  }
`;

const PostsContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
`;

const SectionHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 1.5rem;
  padding-bottom: 1rem;
  border-bottom: 2px solid ${props => props.theme === 'dark' ? '#4a5568' : '#e2e8f0'};
`;

const SectionTitle = styled.h2`
  font-size: 1.5rem;
  font-weight: 600;
  color: ${props => props.theme === 'dark' ? '#e2e8f0' : '#1a202c'};
  display: flex;
  align-items: center;
  gap: 0.5rem;
`;

import { Link } from 'react-router-dom';

const ViewAllLink = styled(Link)`
  color: #667eea;
  text-decoration: none;
  font-weight: 500;
  font-size: 0.875rem;
  transition: color 0.2s ease;

  &:hover {
    color: #5a67d8;
  }
`;

const EmptyState = styled.div`
  text-align: center;
  padding: 4rem 2rem;
  color: ${props => props.theme === 'dark' ? '#a0aec0' : '#6b7280'};
`;

const EmptyIcon = styled.div`
  font-size: 4rem;
  margin-bottom: 1rem;
  opacity: 0.5;
`;

const EmptyTitle = styled.h3`
  font-size: 1.25rem;
  font-weight: 600;
  margin-bottom: 0.5rem;
  color: ${props => props.theme === 'dark' ? '#e2e8f0' : '#1a202c'};
`;

const EmptyDescription = styled.p`
  font-size: 0.875rem;
  line-height: 1.6;
`;

const Home = () => {
  const { theme } = useTheme();
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState('trending');

  // Load from local store
  useEffect(() => {
    const all = store.getAllPosts();
    const sorted = sortPosts(all, filter);
    setPosts(sorted);
    setLoading(false);
  }, [filter]);

  const getFilterIcon = (filterType) => {
    switch (filterType) {
      case 'trending': return <FiTrendingUp />;
      case 'recent': return <FiClock />;
      case 'popular': return <FiStar />;
      default: return <FiMessageSquare />;
    }
  };

  if (loading) {
    return (
      <HomeContainer>
        <div style={{ textAlign: 'center', padding: '4rem 0' }}>
          <div style={{ fontSize: '2rem', marginBottom: '1rem' }}>⏳</div>
          <p>Loading posts...</p>
        </div>
      </HomeContainer>
    );
  }

  return (
    <HomeContainer>
      <WelcomeSection theme={theme}>
        <WelcomeTitle>Welcome to Forum App</WelcomeTitle>
        <WelcomeSubtitle>
          Join our community of developers, designers, and tech enthusiasts. 
          Share knowledge, ask questions, and collaborate on amazing projects.
        </WelcomeSubtitle>
        <WelcomeStats>
          <StatItem>
            <StatValue>2,847</StatValue>
            <StatLabel>Posts</StatLabel>
          </StatItem>
          <StatItem>
            <StatValue>1,234</StatValue>
            <StatLabel>Active Users</StatLabel>
          </StatItem>
          <StatItem>
            <StatValue>15,692</StatValue>
            <StatLabel>Comments</StatLabel>
          </StatItem>
        </WelcomeStats>
      </WelcomeSection>

      <ContentSection>
        <div>
          <SectionHeader theme={theme}>
            <SectionTitle theme={theme}>
              {getFilterIcon(filter)}
              {filter.charAt(0).toUpperCase() + filter.slice(1)} Posts
            </SectionTitle>
            <ViewAllLink to="/posts">View All</ViewAllLink>
          </SectionHeader>

          <FilterBar filter={filter} onFilterChange={setFilter} theme={theme} />

          <PostsContainer>
            {posts.length > 0 ? (
              posts.map((post) => (
                <PostCard key={post.id} post={post} theme={theme} />
              ))
            ) : (
              <EmptyState theme={theme}>
                <EmptyIcon>📝</EmptyIcon>
                <EmptyTitle theme={theme}>No posts found</EmptyTitle>
                <EmptyDescription theme={theme}>
                  Be the first to start a discussion in this category!
                </EmptyDescription>
              </EmptyState>
            )}
          </PostsContainer>
        </div>

        <div>
          {/* Additional sidebar content can go here */}
        </div>
      </ContentSection>
    </HomeContainer>
  );
};

export default Home;