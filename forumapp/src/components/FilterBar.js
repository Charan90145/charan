import React from 'react';
import styled from 'styled-components';
import { FiTrendingUp, FiClock, FiStar, FiMessageSquare, FiFilter } from 'react-icons/fi';
import { useNavigate } from 'react-router-dom';

const FilterContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
  margin-bottom: 1.5rem;
  padding: 1rem;
  background: ${props => props.theme === 'dark' ? '#2d3748' : '#f8fafc'};
  border-radius: 0.75rem;
  border: 1px solid ${props => props.theme === 'dark' ? '#4a5568' : '#e2e8f0'};
  flex-wrap: wrap;

  @media (max-width: 768px) {
    flex-direction: column;
    align-items: stretch;
  }
`;

const FilterLabel = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  color: ${props => props.theme === 'dark' ? '#a0aec0' : '#6b7280'};
  font-weight: 500;
  font-size: 0.875rem;
  white-space: nowrap;
`;

const FilterButtons = styled.div`
  display: flex;
  gap: 0.5rem;
  flex-wrap: wrap;
`;

const FilterButton = styled.button`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.5rem 1rem;
  border: 2px solid ${props => props.active 
    ? '#667eea' 
    : props.theme === 'dark' ? '#4a5568' : '#e2e8f0'
  };
  border-radius: 0.5rem;
  background: ${props => props.active 
    ? '#667eea' 
    : props.theme === 'dark' ? '#4a5568' : 'white'
  };
  color: ${props => props.active 
    ? 'white' 
    : props.theme === 'dark' ? '#e2e8f0' : '#4a5568'
  };
  font-size: 0.875rem;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s ease;

  &:hover {
    border-color: #667eea;
    background: ${props => props.active ? '#667eea' : '#f8fafc'};
    transform: translateY(-1px);
  }

  @media (max-width: 768px) {
    flex: 1;
    justify-content: center;
  }
`;

const SortSelect = styled.select`
  padding: 0.5rem 1rem;
  border: 2px solid ${props => props.theme === 'dark' ? '#4a5568' : '#e2e8f0'};
  border-radius: 0.5rem;
  background: ${props => props.theme === 'dark' ? '#4a5568' : 'white'};
  color: ${props => props.theme === 'dark' ? '#e2e8f0' : '#4a5568'};
  font-size: 0.875rem;
  font-weight: 500;
  cursor: pointer;
  transition: border-color 0.2s ease;

  &:focus {
    outline: none;
    border-color: #667eea;
  }

  @media (max-width: 768px) {
    width: 100%;
  }
`;

const FilterBar = ({ filter, onFilterChange, theme }) => {
  const navigate = useNavigate();
  const filterOptions = [
    { value: 'trending', label: 'Trending', icon: FiTrendingUp },
    { value: 'recent', label: 'Recent', icon: FiClock },
    { value: 'popular', label: 'Popular', icon: FiStar },
    { value: 'unanswered', label: 'Unanswered', icon: FiMessageSquare },
  ];

  const sortOptions = [
    { value: 'newest', label: 'Newest First' },
    { value: 'oldest', label: 'Oldest First' },
    { value: 'most-voted', label: 'Most Voted' },
    { value: 'most-commented', label: 'Most Commented' },
    { value: 'most-viewed', label: 'Most Viewed' },
  ];

  return (
    <FilterContainer theme={theme}>
      <FilterLabel theme={theme}>
        <FiFilter />
        Filter by:
      </FilterLabel>
      
      <FilterButtons>
        {filterOptions.map((option) => {
          const Icon = option.icon;
          return (
            <FilterButton
              key={option.value}
              active={filter === option.value}
              onClick={() => {
                onFilterChange(option.value);
                if (option.value === 'trending') navigate('/trending');
                if (option.value === 'recent') navigate('/recent');
                if (option.value === 'popular') navigate('/popular');
              }}
              theme={theme}
            >
              <Icon />
              {option.label}
            </FilterButton>
          );
        })}
      </FilterButtons>

      <SortSelect theme={theme}>
        {sortOptions.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </SortSelect>
    </FilterContainer>
  );
};

export default FilterBar;