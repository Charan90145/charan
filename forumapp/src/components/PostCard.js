import React, { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { formatDistanceToNow } from 'date-fns';
import { 
  FiThumbsUp, 
  FiThumbsDown, 
  FiMessageCircle, 
  FiEye, 
  FiFlag, 
  FiCheckCircle,
  FiTag,
  FiUser
} from 'react-icons/fi';

const PostCardContainer = styled.article`
  background: ${props => props.theme === 'dark' ? '#2d3748' : 'white'};
  border: 1px solid ${props => props.theme === 'dark' ? '#4a5568' : '#e2e8f0'};
  border-radius: 0.75rem;
  padding: 1.5rem;
  transition: all 0.2s ease;
  position: relative;

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
    border-color: ${props => props.theme === 'dark' ? '#667eea' : '#cbd5e0'};
  }
`;

const PostHeader = styled.div`
  display: flex;
  align-items: flex-start;
  gap: 1rem;
  margin-bottom: 1rem;
`;

const VoteSection = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.5rem;
  min-width: 3rem;
`;

const VoteButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 2rem;
  height: 2rem;
  border: none;
  border-radius: 50%;
  background: ${props => props.active 
    ? props.type === 'up' ? '#10b981' : '#ef4444'
    : props.theme === 'dark' ? '#4a5568' : '#f1f5f9'
  };
  color: ${props => props.active 
    ? 'white'
    : props.theme === 'dark' ? '#a0aec0' : '#6b7280'
  };
  cursor: pointer;
  transition: all 0.2s ease;

  &:hover {
    background: ${props => props.type === 'up' ? '#10b981' : '#ef4444'};
    color: white;
    transform: scale(1.1);
  }
`;

const VoteCount = styled.span`
  font-weight: 600;
  font-size: 0.875rem;
  color: ${props => props.theme === 'dark' ? '#e2e8f0' : '#1a202c'};
`;

const PostContent = styled.div`
  flex: 1;
  min-width: 0;
`;

const PostMeta = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
  margin-bottom: 0.75rem;
  flex-wrap: wrap;
`;

const AuthorInfo = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
`;

const AuthorAvatar = styled.div`
  width: 2rem;
  height: 2rem;
  border-radius: 50%;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  font-weight: 600;
  font-size: 0.75rem;
`;

const AuthorName = styled(Link)`
  color: #667eea;
  text-decoration: none;
  font-weight: 500;
  font-size: 0.875rem;
  transition: color 0.2s ease;

  &:hover {
    color: #5a67d8;
  }
`;

const PostTime = styled.span`
  color: ${props => props.theme === 'dark' ? '#a0aec0' : '#6b7280'};
  font-size: 0.75rem;
`;

const CategoryTag = styled(Link)`
  display: inline-flex;
  align-items: center;
  gap: 0.25rem;
  padding: 0.25rem 0.75rem;
  background: ${props => props.theme === 'dark' ? '#4a5568' : '#f1f5f9'};
  color: ${props => props.theme === 'dark' ? '#e2e8f0' : '#4a5568'};
  text-decoration: none;
  border-radius: 1rem;
  font-size: 0.75rem;
  font-weight: 500;
  transition: all 0.2s ease;

  &:hover {
    background: #667eea;
    color: white;
  }
`;

const PostTitle = styled(Link)`
  color: ${props => props.theme === 'dark' ? '#e2e8f0' : '#1a202c'};
  text-decoration: none;
  font-size: 1.25rem;
  font-weight: 600;
  line-height: 1.4;
  margin-bottom: 0.75rem;
  display: block;
  transition: color 0.2s ease;

  &:hover {
    color: #667eea;
  }
`;

const PostExcerpt = styled.p`
  color: ${props => props.theme === 'dark' ? '#a0aec0' : '#6b7280'};
  font-size: 0.875rem;
  line-height: 1.6;
  margin-bottom: 1rem;
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  overflow: hidden;
`;

const PostTags = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
  margin-bottom: 1rem;
`;

const Tag = styled.span`
  display: inline-flex;
  align-items: center;
  gap: 0.25rem;
  padding: 0.25rem 0.5rem;
  background: ${props => props.theme === 'dark' ? '#4a5568' : '#f1f5f9'};
  color: ${props => props.theme === 'dark' ? '#a0aec0' : '#6b7280'};
  border-radius: 0.375rem;
  font-size: 0.75rem;
  font-weight: 500;
`;

const PostFooter = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex-wrap: wrap;
  gap: 1rem;
`;

const PostStats = styled.div`
  display: flex;
  align-items: center;
  gap: 1.5rem;
`;

const StatItem = styled.div`
  display: flex;
  align-items: center;
  gap: 0.25rem;
  color: ${props => props.theme === 'dark' ? '#a0aec0' : '#6b7280'};
  font-size: 0.75rem;
  font-weight: 500;
`;

const PostActions = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
`;

const ActionButton = styled.button`
  display: flex;
  align-items: center;
  gap: 0.25rem;
  padding: 0.5rem 1rem;
  border: 1px solid ${props => props.theme === 'dark' ? '#4a5568' : '#e2e8f0'};
  border-radius: 0.5rem;
  background: ${props => props.theme === 'dark' ? '#4a5568' : '#f8fafc'};
  color: ${props => props.theme === 'dark' ? '#a0aec0' : '#6b7280'};
  font-size: 0.75rem;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s ease;

  &:hover {
    background: ${props => props.theme === 'dark' ? '#5a6578' : '#e2e8f0'};
    border-color: ${props => props.theme === 'dark' ? '#667eea' : '#cbd5e0'};
  }
`;

const StatusBadges = styled.div`
  position: absolute;
  top: 1rem;
  right: 1rem;
  display: flex;
  gap: 0.5rem;
`;

const StatusBadge = styled.div`
  display: flex;
  align-items: center;
  gap: 0.25rem;
  padding: 0.25rem 0.5rem;
  background: ${props => props.type === 'pinned' ? '#fbbf24' : '#10b981'};
  color: white;
  border-radius: 0.375rem;
  font-size: 0.75rem;
  font-weight: 500;
`;

const PostCard = ({ post, theme }) => {
  const [vote, setVote] = useState(null); // 'up' | 'down' | null
  const displayedVotes = useMemo(() => {
    if (vote === 'up') return (post.votes || 0) + 1;
    if (vote === 'down') return (post.votes || 0) - 1;
    return post.votes || 0;
  }, [vote, post.votes]);

  const handleVote = (type) => {
    // Toggle behavior: clicking same vote removes it
    setVote((prev) => (prev === type ? null : type));
    // TODO: integrate API call to persist vote
  };

  const handleBookmark = () => {
    // Handle bookmark logic here
    console.log('Bookmark post', post.id);
  };

  const handleShare = () => {
    // Handle share logic here
    console.log('Share post', post.id);
  };

  return (
    <PostCardContainer theme={theme}>
      {post.isPinned && (
        <StatusBadges>
          <StatusBadge type="pinned">
            <FiFlag />
            Pinned
          </StatusBadge>
        </StatusBadges>
      )}
      
      {post.isSolved && (
        <StatusBadges>
          <StatusBadge type="solved">
            <FiCheckCircle />
            Solved
          </StatusBadge>
        </StatusBadges>
      )}

      <PostHeader>
        <VoteSection>
          <VoteButton 
            type="up" 
            active={vote === 'up'}
            onClick={() => handleVote('up')}
            theme={theme}
          >
            <FiThumbsUp />
          </VoteButton>
          <VoteCount theme={theme}>{displayedVotes}</VoteCount>
          <VoteButton 
            type="down" 
            active={vote === 'down'}
            onClick={() => handleVote('down')}
            theme={theme}
          >
            <FiThumbsDown />
          </VoteButton>
        </VoteSection>

        <PostContent>
          <PostMeta>
            <AuthorInfo>
              <AuthorAvatar>
                {post.author.username.charAt(0).toUpperCase()}
              </AuthorAvatar>
              <AuthorName to={`/profile/${post.author.username}`}>
                {post.author.username}
              </AuthorName>
              <span style={{ color: theme === 'dark' ? '#a0aec0' : '#6b7280', fontSize: '0.75rem' }}>
                • {post.author.reputation} reputation
              </span>
            </AuthorInfo>
            <PostTime theme={theme}>
              {formatDistanceToNow(new Date(post.createdAt), { addSuffix: true })}
            </PostTime>
            <CategoryTag to={`/category/${post.category.toLowerCase()}`} theme={theme}>
              <FiTag />
              {post.category}
            </CategoryTag>
          </PostMeta>

          <PostTitle to={`/post/${post.id}`} theme={theme}>
            {post.title}
          </PostTitle>

          <PostExcerpt theme={theme}>
            {post.content}
          </PostExcerpt>

          <PostTags>
            {post.tags.map((tag) => (
              <Tag key={tag} theme={theme}>
                #{tag}
              </Tag>
            ))}
          </PostTags>

          <PostFooter>
            <PostStats>
              <StatItem theme={theme}>
                <FiMessageCircle />
                {post.comments} comments
              </StatItem>
              <StatItem theme={theme}>
                <FiEye />
                {post.views} views
              </StatItem>
            </PostStats>

            <PostActions>
              <ActionButton onClick={handleBookmark} theme={theme}>
                Bookmark
              </ActionButton>
              <ActionButton onClick={handleShare} theme={theme}>
                Share
              </ActionButton>
              <ActionButton as={Link} to={`/post/${post.id}#review`} theme={theme}>
                Write Review
              </ActionButton>
              <ActionButton as={Link} to={`/profile/${post.author.username}`} theme={theme}>
                View Profile
              </ActionButton>
            </PostActions>
          </PostFooter>
        </PostContent>
      </PostHeader>
    </PostCardContainer>
  );
};

export default PostCard;