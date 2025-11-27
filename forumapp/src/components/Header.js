import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { useAuth } from '../contexts/AuthContext';
import { useTheme } from '../contexts/ThemeContext';
import { 
  FiSearch, 
  FiPlus, 
  FiSun, 
  FiMoon, 
  FiUser, 
  FiLogOut,
  FiMenu,
  FiX,
  FiHome
} from 'react-icons/fi';

const HeaderContainer = styled.header`
  background: ${props => props.theme === 'dark' ? '#2d3748' : 'white'};
  border-bottom: 1px solid ${props => props.theme === 'dark' ? '#4a5568' : '#e2e8f0'};
  padding: 1rem 0;
  position: sticky;
  top: 0;
  z-index: 100;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
`;

const HeaderContent = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 1rem;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const Logo = styled(Link)`
  font-size: 1.5rem;
  font-weight: 700;
  color: ${props => props.theme === 'dark' ? '#e2e8f0' : '#1a202c'};
  text-decoration: none;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
`;

const SearchContainer = styled.div`
  flex: 1;
  max-width: 500px;
  margin: 0 2rem;
  position: relative;

  @media (max-width: 768px) {
    display: none;
  }
`;

const SearchInput = styled.input`
  width: 100%;
  padding: 0.75rem 1rem 0.75rem 2.5rem;
  border: 2px solid ${props => props.theme === 'dark' ? '#4a5568' : '#e2e8f0'};
  border-radius: 2rem;
  background: ${props => props.theme === 'dark' ? '#4a5568' : '#f8fafc'};
  color: ${props => props.theme === 'dark' ? '#e2e8f0' : '#1a202c'};
  font-size: 0.875rem;
  transition: all 0.2s ease;

  &:focus {
    outline: none;
    border-color: #667eea;
    box-shadow: 0 0 0 3px rgba(102, 126, 234, 0.1);
  }

  &::placeholder {
    color: ${props => props.theme === 'dark' ? '#a0aec0' : '#9ca3af'};
  }
`;

const SearchIcon = styled(FiSearch)`
  position: absolute;
  left: 0.75rem;
  top: 50%;
  transform: translateY(-50%);
  color: ${props => props.theme === 'dark' ? '#a0aec0' : '#9ca3af'};
  font-size: 1.125rem;
`;

const NavActions = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
`;

const ActionButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 2.5rem;
  height: 2.5rem;
  border: none;
  border-radius: 50%;
  background: ${props => props.theme === 'dark' ? '#4a5568' : '#f1f5f9'};
  color: ${props => props.theme === 'dark' ? '#e2e8f0' : '#4a5568'};
  cursor: pointer;
  transition: all 0.2s ease;

  &:hover {
    background: ${props => props.theme === 'dark' ? '#5a6578' : '#e2e8f0'};
    transform: scale(1.05);
  }
`;

const CreatePostButton = styled(Link)`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.75rem 1.5rem;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  text-decoration: none;
  border-radius: 2rem;
  font-weight: 500;
  font-size: 0.875rem;
  transition: all 0.2s ease;

  &:hover {
    transform: translateY(-1px);
    box-shadow: 0 4px 12px rgba(102, 126, 234, 0.4);
  }

  @media (max-width: 768px) {
    padding: 0.5rem 1rem;
    font-size: 0.75rem;
  }
`;

const UserMenu = styled.div`
  position: relative;
`;

const UserButton = styled.button`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.5rem;
  border: none;
  border-radius: 0.5rem;
  background: ${props => props.theme === 'dark' ? '#4a5568' : '#f1f5f9'};
  color: ${props => props.theme === 'dark' ? '#e2e8f0' : '#4a5568'};
  cursor: pointer;
  transition: all 0.2s ease;

  &:hover {
    background: ${props => props.theme === 'dark' ? '#5a6578' : '#e2e8f0'};
  }
`;

const UserAvatar = styled.div`
  width: 2rem;
  height: 2rem;
  border-radius: 50%;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  font-weight: 600;
  font-size: 0.875rem;
`;

const DropdownMenu = styled.div`
  position: absolute;
  top: 100%;
  right: 0;
  margin-top: 0.5rem;
  background: ${props => props.theme === 'dark' ? '#2d3748' : 'white'};
  border: 1px solid ${props => props.theme === 'dark' ? '#4a5568' : '#e2e8f0'};
  border-radius: 0.5rem;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  min-width: 200px;
  z-index: 50;
`;

const DropdownItem = styled(Link)`
  display: flex;
  align-items: center;
  gap: 0.75rem;
  padding: 0.75rem 1rem;
  color: ${props => props.theme === 'dark' ? '#e2e8f0' : '#4a5568'};
  text-decoration: none;
  transition: background-color 0.2s ease;

  &:hover {
    background: ${props => props.theme === 'dark' ? '#4a5568' : '#f8fafc'};
  }

  &:first-child {
    border-radius: 0.5rem 0.5rem 0 0;
  }

  &:last-child {
    border-radius: 0 0 0.5rem 0.5rem;
  }
`;

const LogoutButton = styled.button`
  display: flex;
  align-items: center;
  gap: 0.75rem;
  width: 100%;
  padding: 0.75rem 1rem;
  border: none;
  background: none;
  color: ${props => props.theme === 'dark' ? '#e2e8f0' : '#4a5568'};
  text-align: left;
  cursor: pointer;
  transition: background-color 0.2s ease;

  &:hover {
    background: ${props => props.theme === 'dark' ? '#4a5568' : '#f8fafc'};
  }
`;

const MobileMenuButton = styled.button`
  display: none;
  align-items: center;
  justify-content: center;
  width: 2.5rem;
  height: 2.5rem;
  border: none;
  border-radius: 0.5rem;
  background: ${props => props.theme === 'dark' ? '#4a5568' : '#f1f5f9'};
  color: ${props => props.theme === 'dark' ? '#e2e8f0' : '#4a5568'};
  cursor: pointer;

  @media (max-width: 768px) {
    display: flex;
  }
`;

const Header = () => {
  const { user, logout } = useAuth();
  const { theme, toggleTheme } = useTheme();
  const navigate = useNavigate();
  const [showUserMenu, setShowUserMenu] = useState(false);

  const handleLogout = () => {
    logout();
    setShowUserMenu(false);
    navigate('/');
  };

  return (
    <HeaderContainer theme={theme}>
      <HeaderContent>
        <Logo to="/forum" theme={theme}>
          Forum App
        </Logo>

        <SearchContainer theme={theme}>
          <SearchIcon theme={theme} />
          <SearchInput 
            type="text" 
            placeholder="Search posts, topics, or users..."
            theme={theme}
          />
        </SearchContainer>

        <NavActions>
          <ActionButton 
            as={Link}
            to="/forum"
            theme={theme}
            title="Go to Forum"
          >
            <FiHome />
          </ActionButton>
          
          <ActionButton 
            onClick={toggleTheme}
            theme={theme}
            title={`Switch to ${theme === 'light' ? 'dark' : 'light'} mode`}
          >
            {theme === 'light' ? <FiMoon /> : <FiSun />}
          </ActionButton>

          {user ? (
            <>
              <CreatePostButton to="/create">
                <FiPlus />
                <span>New Forum</span>
              </CreatePostButton>

              <UserMenu>
                <UserButton 
                  onClick={() => setShowUserMenu(!showUserMenu)}
                  theme={theme}
                >
                  <UserAvatar>
                    {user.username.charAt(0).toUpperCase()}
                  </UserAvatar>
                  <span>{user.username}</span>
                </UserButton>

                {showUserMenu && (
                  <DropdownMenu theme={theme}>
                    <DropdownItem to={`/profile/${user.username}`} theme={theme}>
                      <FiUser />
                      Profile
                    </DropdownItem>
                    <LogoutButton onClick={handleLogout} theme={theme}>
                      <FiLogOut />
                      Logout
                    </LogoutButton>
                  </DropdownMenu>
                )}
              </UserMenu>
            </>
          ) : (
            <>
              <Link to="/login" className="btn btn-outline">
                Login
              </Link>
              <Link to="/register" className="btn btn-primary">
                Sign Up
              </Link>
            </>
          )}

          <MobileMenuButton theme={theme}>
            <FiMenu />
          </MobileMenuButton>
        </NavActions>
      </HeaderContent>
    </HeaderContainer>
  );
};

export default Header;