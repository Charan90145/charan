import React, { useState, useMemo, useEffect, useRef } from 'react';
import styled from 'styled-components';
import { useTheme } from '../contexts/ThemeContext';
import { FiThumbsUp, FiThumbsDown } from 'react-icons/fi';
import { useParams } from 'react-router-dom';
import { store } from '../store';

const PostDetailContainer = styled.div`
  padding: 2rem 0;
`;

const VoteRow = styled.div`
  display: inline-flex;
  align-items: center;
  gap: 0.75rem;
  margin-top: 1rem;
`;

const VoteButton = styled.button`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 2.25rem;
  height: 2.25rem;
  border: none;
  border-radius: 9999px;
  background: ${props => props.active
    ? (props.type === 'up' ? '#10b981' : '#ef4444')
    : (props.theme === 'dark' ? '#4a5568' : '#f1f5f9')};
  color: ${props => props.active ? 'white' : (props.theme === 'dark' ? '#a0aec0' : '#6b7280')};
  cursor: pointer;
`;

const VoteCount = styled.span`
  font-weight: 700;
`;

// Added review UI styles
const ReviewSection = styled.div`
  max-width: 800px;
  margin: 2rem auto 0;
  padding: 1.5rem;
  border: 1px solid ${props => props.theme === 'dark' ? '#374151' : '#e5e7eb'};
  border-radius: 0.75rem;
  background: ${props => props.theme === 'dark' ? '#1f2937' : '#ffffff'};
`;

const ReviewTitle = styled.h2`
  margin-bottom: 1rem;
  font-size: 1.25rem;
  color: ${props => props.theme === 'dark' ? '#e2e8f0' : '#1f2937'};
`;

const ReviewTextarea = styled.textarea`
  width: 100%;
  min-height: 120px;
  padding: 0.75rem 1rem;
  border-radius: 0.5rem;
  border: 1px solid ${props => props.theme === 'dark' ? '#374151' : '#e5e7eb'};
  background: ${props => props.theme === 'dark' ? '#111827' : '#ffffff'};
  color: ${props => props.theme === 'dark' ? '#e5e7eb' : '#111827'};
  resize: vertical;
`;

const ReviewActions = styled.div`
  display: flex;
  gap: 0.75rem;
  margin-top: 0.75rem;
`;

const Button = styled.button`
  padding: 0.625rem 1rem;
  border-radius: 0.5rem;
  border: none;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: #fff;
  font-weight: 600;
  cursor: pointer;
`;

const PostDetail = () => {
  const { theme } = useTheme();
  const { id } = useParams();
  const post = store.getPostById(id);
  const initialVotes = post?.votes || 0;
  const [vote, setVote] = useState(null);
  const displayedVotes = useMemo(() => {
    if (vote === 'up') return initialVotes + 1;
    if (vote === 'down') return initialVotes - 1;
    return initialVotes;
  }, [vote]);

  // Added review state and anchor behavior
  const [review, setReview] = useState('');
  const [reviews, setReviews] = useState([]);
  const reviewRef = useRef(null);

  useEffect(() => {
    if (window.location.hash === '#review' && reviewRef.current) {
      reviewRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }, []);

  return (
    <PostDetailContainer>
      <div style={{ maxWidth: 800, margin: '0 auto', padding: '2rem 1rem' }}>
        <h1 style={{ color: theme === 'dark' ? '#e2e8f0' : '#1a202c', marginBottom: '0.5rem' }}>
          {post?.title || 'Post not found'}
        </h1>
        {post && (
          <div style={{ color: theme === 'dark' ? '#a0aec0' : '#6b7280', marginBottom: '1rem' }}>
            by <strong style={{ color: theme === 'dark' ? '#e2e8f0' : '#1a202c' }}>{post.author.username}</strong>
            {' '}in r/{post.community} • {new Date(post.createdAt).toLocaleString()}
          </div>
        )}
        <div style={{ color: theme === 'dark' ? '#cbd5e1' : '#1f2937', whiteSpace: 'pre-wrap' }}>
          {post?.content}
        </div>
        {post?.attachments && post.attachments.length > 0 && (
          <div style={{ marginTop: '1rem', display: 'grid', gap: '0.75rem', gridTemplateColumns: 'repeat(auto-fill, minmax(220px, 1fr))' }}>
            {post.attachments.map((att, idx) => (
              <div key={idx} style={{ border: `1px solid ${theme === 'dark' ? '#374151' : '#e5e7eb'}`, borderRadius: 8, overflow: 'hidden' }}>
                {att.kind === 'image' && att.dataUrl ? (
                  <img src={att.dataUrl} alt={att.name} style={{ width: '100%', height: 200, objectFit: 'cover' }} />
                ) : (
                  <div style={{ padding: '0.75rem', color: theme === 'dark' ? '#a0aec0' : '#6b7280' }}>{att.name}</div>
                )}
              </div>
            ))}
          </div>
        )}
        <VoteRow>
          <VoteButton type="up" active={vote === 'up'} onClick={() => setVote(vote === 'up' ? null : 'up')} theme={theme}>
            <FiThumbsUp />
          </VoteButton>
          <VoteCount>{displayedVotes}</VoteCount>
          <VoteButton type="down" active={vote === 'down'} onClick={() => setVote(vote === 'down' ? null : 'down')} theme={theme}>
            <FiThumbsDown />
          </VoteButton>
        </VoteRow>
      </div>
      {/* Added review form and list */}
      <ReviewSection id="review" ref={reviewRef} theme={theme}>
        <ReviewTitle theme={theme}>Write a Review</ReviewTitle>
        <ReviewTextarea theme={theme} value={review} onChange={e => setReview(e.target.value)} placeholder="Share your thoughts about this post..." />
        <ReviewActions>
          <Button onClick={() => {
            if (!review.trim()) return;
            setReviews(prev => [{ id: Date.now(), content: review.trim() }, ...prev]);
            setReview('');
          }}>Submit Review</Button>
        </ReviewActions>
        {reviews.length > 0 && (
          <div style={{ marginTop: '1rem' }}>
            {reviews.map(r => (
              <div key={r.id} style={{ padding: '0.75rem 0', borderTop: `1px solid ${theme === 'dark' ? '#374151' : '#e5e7eb'}`, color: theme === 'dark' ? '#e5e7eb' : '#1f2937' }}>
                {r.content}
              </div>
            ))}
          </div>
        )}
      </ReviewSection>
    </PostDetailContainer>
  );
};

export default PostDetail;