import React, { useMemo, useEffect, useState } from 'react';
import styled from 'styled-components';
import { useTheme } from '../contexts/ThemeContext';
import { useParams } from 'react-router-dom';
import { FiMapPin, FiLink, FiCalendar } from 'react-icons/fi';
import PostCard from '../components/PostCard';

const ProfileContainer = styled.div`
  padding: 2rem 0;
`;

const Card = styled.div`
  max-width: 900px;
  margin: 0 auto;
  background: ${props => props.theme === 'dark' ? '#1f2937' : '#ffffff'};
  border: 1px solid ${props => props.theme === 'dark' ? '#374151' : '#e5e7eb'};
  border-radius: 1rem;
  padding: 2rem;
`;

const SectionTitle = styled.h2`
  font-size: 1.25rem;
  font-weight: 600;
  margin: 1.5rem 0 1rem;
  color: ${props => props.theme === 'dark' ? '#e2e8f0' : '#1f2937'};
`;

const Header = styled.div`
  display: flex;
  gap: 1.5rem;
  align-items: center;
  margin-bottom: 1.5rem;
`;

const Avatar = styled.div`
  width: 96px;
  height: 96px;
  border-radius: 50%;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  font-weight: 700;
  font-size: 2rem;
`;

const Name = styled.h1`
  margin: 0;
  font-size: 1.75rem;
  color: ${props => props.theme === 'dark' ? '#e2e8f0' : '#1f2937'};
`;

const Username = styled.div`
  color: ${props => props.theme === 'dark' ? '#9ca3af' : '#6b7280'};
  font-size: 0.95rem;
`;

const Bio = styled.p`
  margin-top: 0.5rem;
  color: ${props => props.theme === 'dark' ? '#cbd5e1' : '#4b5563'};
`;

const Meta = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 1rem 1.5rem;
  margin-top: 0.75rem;
  color: ${props => props.theme === 'dark' ? '#a0aec0' : '#6b7280'};
  font-size: 0.9rem;
`;

const StatGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(140px, 1fr));
  gap: 1rem;
  margin-top: 1.5rem;
`;

const StatCard = styled.div`
  border: 1px solid ${props => props.theme === 'dark' ? '#374151' : '#e5e7eb'};
  border-radius: 0.75rem;
  padding: 1rem;
  background: ${props => props.theme === 'dark' ? '#111827' : '#f9fafb'};
`;

const StatLabel = styled.div`
  color: ${props => props.theme === 'dark' ? '#9ca3af' : '#6b7280'};
  font-size: 0.8rem;
`;

const StatValue = styled.div`
  color: ${props => props.theme === 'dark' ? '#e5e7eb' : '#111827'};
  font-size: 1.25rem;
  font-weight: 700;
`;

const Profile = () => {
  const { theme } = useTheme();
  const { username } = useParams();
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  // Mock user data; replace with API call later
  const user = useMemo(() => {
    if (!username) return null;
    const seed = username.toLowerCase();
    return {
      username,
      name: seed.replace(/[_.-]/g, ' ').replace(/\b\w/g, c => c.toUpperCase()),
      bio: 'Passionate developer and community contributor. I love sharing knowledge and building useful tools.',
      location: 'Hyderabad, IN',
      website: 'https://example.com',
      joined: '2024-02-15',
      stats: {
        posts: 42,
        followers: 128,
        following: 76,
        reputation: 1250
      }
    };
  }, [username]);

  useEffect(() => {
    // Mock fetch - replace with API call filtered by username
    setLoading(true);
    const mock = [
      {
        id: 'p1',
        title: `Hello from ${username}`,
        content: 'This is a demo post content for the profile page.',
        author: { username: username || 'user', avatar: null, reputation: 120 },
        category: 'General',
        tags: ['intro', 'community'],
        votes: 12,
        comments: 3,
        views: 154,
        createdAt: '2024-01-18T09:30:00Z',
        isPinned: false,
        isSolved: false
      },
      {
        id: 'p2',
        title: 'My recent project update',
        content: 'Sharing progress on my latest project and challenges faced...',
        author: { username: username || 'user', avatar: null, reputation: 120 },
        category: 'Projects',
        tags: ['react', 'updates'],
        votes: 8,
        comments: 1,
        views: 99,
        createdAt: '2024-01-16T11:10:00Z',
        isPinned: false,
        isSolved: true
      }
    ];
    const t = setTimeout(() => {
      setPosts(mock);
      setLoading(false);
    }, 400);
    return () => clearTimeout(t);
  }, [username]);

  return (
    <ProfileContainer>
      <Card theme={theme}>
        <Header>
          <Avatar>{(user?.username || '?').charAt(0).toUpperCase()}</Avatar>
          <div>
            <Name theme={theme}>{user?.name || 'User Profile'}</Name>
            <Username theme={theme}>@{user?.username || 'user'}</Username>
            {user?.bio && <Bio theme={theme}>{user.bio}</Bio>}
            <Meta theme={theme}>
              {user?.location && (
                <span><FiMapPin style={{ marginRight: '0.375rem' }} /> {user.location}</span>
              )}
              {user?.website && (
                <span><FiLink style={{ marginRight: '0.375rem' }} /> <a href={user.website} target="_blank" rel="noreferrer" style={{ color: '#667eea', textDecoration: 'none' }}>{user.website}</a></span>
              )}
              {user?.joined && (
                <span><FiCalendar style={{ marginRight: '0.375rem' }} /> Joined {new Date(user.joined).toLocaleDateString()}</span>
              )}
            </Meta>
          </div>
        </Header>

        <StatGrid>
          <StatCard theme={theme}>
            <StatLabel theme={theme}>Posts</StatLabel>
            <StatValue theme={theme}>{user?.stats.posts ?? '-'}</StatValue>
          </StatCard>
          <StatCard theme={theme}>
            <StatLabel theme={theme}>Followers</StatLabel>
            <StatValue theme={theme}>{user?.stats.followers ?? '-'}</StatValue>
          </StatCard>
          <StatCard theme={theme}>
            <StatLabel theme={theme}>Following</StatLabel>
            <StatValue theme={theme}>{user?.stats.following ?? '-'}</StatValue>
          </StatCard>
          <StatCard theme={theme}>
            <StatLabel theme={theme}>Reputation</StatLabel>
            <StatValue theme={theme}>{user?.stats.reputation ?? '-'}</StatValue>
          </StatCard>
        </StatGrid>
      </Card>

      <Card theme={theme} style={{ marginTop: '1rem' }}>
        <SectionTitle theme={theme}>Recent Posts</SectionTitle>
        {loading ? (
          <div style={{ color: theme === 'dark' ? '#9ca3af' : '#6b7280' }}>Loading...</div>
        ) : posts.length === 0 ? (
          <div style={{ color: theme === 'dark' ? '#9ca3af' : '#6b7280' }}>No posts yet.</div>
        ) : (
          <div style={{ display: 'grid', gap: '1rem' }}>
            {posts.map(p => (
              <PostCard key={p.id} post={p} theme={theme} />
            ))}
          </div>
        )}
      </Card>
    </ProfileContainer>
  );
};

export default Profile;