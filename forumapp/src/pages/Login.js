import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { useAuth } from '../contexts/AuthContext';
import { useTheme } from '../contexts/ThemeContext';
import { FiMail, FiLock, FiEye, FiEyeOff } from 'react-icons/fi';
import toast from 'react-hot-toast';

const LoginContainer = styled.div`
  min-height: 80vh;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 2rem 1rem;
`;

const LoginCard = styled.div`
  background: ${props => props.theme === 'dark' ? '#2d3748' : 'white'};
  border-radius: 1rem;
  box-shadow: 0 10px 25px rgba(0, 0, 0, 0.1);
  padding: 3rem;
  width: 100%;
  max-width: 400px;
  border: 1px solid ${props => props.theme === 'dark' ? '#4a5568' : '#e2e8f0'};
`;

const LoginHeader = styled.div`
  text-align: center;
  margin-bottom: 2rem;
`;

const LoginTitle = styled.h1`
  font-size: 2rem;
  font-weight: 700;
  color: ${props => props.theme === 'dark' ? '#e2e8f0' : '#1a202c'};
  margin-bottom: 0.5rem;
`;

const LoginSubtitle = styled.p`
  color: ${props => props.theme === 'dark' ? '#a0aec0' : '#6b7280'};
  font-size: 0.875rem;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
`;

const FormGroup = styled.div`
  position: relative;
`;

const FormLabel = styled.label`
  display: block;
  margin-bottom: 0.5rem;
  font-weight: 500;
  color: ${props => props.theme === 'dark' ? '#e2e8f0' : '#374151'};
  font-size: 0.875rem;
`;

const InputContainer = styled.div`
  position: relative;
`;

const FormInput = styled.input`
  width: 100%;
  padding: 0.75rem 1rem 0.75rem 2.5rem;
  border: 2px solid ${props => props.theme === 'dark' ? '#4a5568' : '#e2e8f0'};
  border-radius: 0.5rem;
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

const InputIcon = styled.div`
  position: absolute;
  left: 0.75rem;
  top: 50%;
  transform: translateY(-50%);
  color: ${props => props.theme === 'dark' ? '#a0aec0' : '#9ca3af'};
  font-size: 1.125rem;
`;

const PasswordToggle = styled.button`
  position: absolute;
  right: 0.75rem;
  top: 50%;
  transform: translateY(-50%);
  background: none;
  border: none;
  color: ${props => props.theme === 'dark' ? '#a0aec0' : '#9ca3af'};
  cursor: pointer;
  font-size: 1.125rem;
  transition: color 0.2s ease;

  &:hover {
    color: #667eea;
  }
`;

const LoginButton = styled.button`
  width: 100%;
  padding: 0.75rem 1.5rem;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  border: none;
  border-radius: 0.5rem;
  font-weight: 600;
  font-size: 0.875rem;
  cursor: pointer;
  transition: all 0.2s ease;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;

  &:hover {
    transform: translateY(-1px);
    box-shadow: 0 4px 12px rgba(102, 126, 234, 0.4);
  }

  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
    transform: none;
  }
`;

const Divider = styled.div`
  display: flex;
  align-items: center;
  margin: 1.5rem 0;
  color: ${props => props.theme === 'dark' ? '#a0aec0' : '#6b7280'};
  font-size: 0.875rem;

  &::before,
  &::after {
    content: '';
    flex: 1;
    height: 1px;
    background: ${props => props.theme === 'dark' ? '#4a5568' : '#e2e8f0'};
  }

  &::before {
    margin-right: 1rem;
  }

  &::after {
    margin-left: 1rem;
  }
`;

const SocialButton = styled.button`
  width: 100%;
  padding: 0.75rem 1.5rem;
  border: 2px solid ${props => props.theme === 'dark' ? '#4a5568' : '#e2e8f0'};
  border-radius: 0.5rem;
  background: ${props => props.theme === 'dark' ? '#4a5568' : 'white'};
  color: ${props => props.theme === 'dark' ? '#e2e8f0' : '#4a5568'};
  font-weight: 500;
  font-size: 0.875rem;
  cursor: pointer;
  transition: all 0.2s ease;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;

  &:hover {
    border-color: #667eea;
    background: ${props => props.theme === 'dark' ? '#5a6578' : '#f8fafc'};
  }
`;

const LoginFooter = styled.div`
  text-align: center;
  margin-top: 2rem;
  color: ${props => props.theme === 'dark' ? '#a0aec0' : '#6b7280'};
  font-size: 0.875rem;
`;

const LoginLink = styled(Link)`
  color: #667eea;
  text-decoration: none;
  font-weight: 500;
  transition: color 0.2s ease;

  &:hover {
    color: #5a67d8;
  }
`;

const ErrorMessage = styled.div`
  background: #fef2f2;
  border: 1px solid #fecaca;
  color: #dc2626;
  padding: 0.75rem;
  border-radius: 0.5rem;
  font-size: 0.875rem;
  margin-bottom: 1rem;
`;

const Login = () => {
  const { login } = useAuth();
  const { theme } = useTheme();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    username: '',
    password: ''
  });
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
    setError('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const result = await login(formData.username, formData.password);
      if (result.success) {
        toast.success('Welcome back!');
        navigate('/forum');
      } else {
        setError(result.error || 'Login failed');
      }
    } catch (err) {
      setError('An unexpected error occurred');
    } finally {
      setLoading(false);
    }
  };

  const handleSocialLogin = (provider) => {
    toast.success(`${provider} login coming soon!`);
  };

  return (
    <LoginContainer>
      <LoginCard theme={theme}>
        <LoginHeader>
          <LoginTitle theme={theme}>Welcome Back</LoginTitle>
          <LoginSubtitle theme={theme}>
            Sign in to your account to continue
          </LoginSubtitle>
        </LoginHeader>

        <Form onSubmit={handleSubmit}>
          {error && <ErrorMessage>{error}</ErrorMessage>}

          <FormGroup>
            <FormLabel theme={theme}>User Name</FormLabel>
            <InputContainer>
              <InputIcon theme={theme}>
                <FiMail />
              </InputIcon>
              <FormInput
                type="text"
                name="username"
                value={formData.username}
                onChange={handleChange}
                placeholder="Enter your username"
                required
                theme={theme}
              />
            </InputContainer>
          </FormGroup>

          <FormGroup>
            <FormLabel theme={theme}>Password</FormLabel>
            <InputContainer>
              <InputIcon theme={theme}>
                <FiLock />
              </InputIcon>
              <FormInput
                type={showPassword ? 'text' : 'password'}
                name="password"
                value={formData.password}
                onChange={handleChange}
                placeholder="Enter your password"
                required
                theme={theme}
              />
              <PasswordToggle
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                theme={theme}
              >
                {showPassword ? <FiEyeOff /> : <FiEye />}
              </PasswordToggle>
            </InputContainer>
          </FormGroup>

          <LoginButton type="submit" disabled={loading}>
            {loading ? 'Signing In...' : 'Sign In'}
          </LoginButton>

          <Divider theme={theme}>or</Divider>

          <SocialButton
            type="button"
            onClick={() => handleSocialLogin('Google')}
            theme={theme}
          >
            Continue with Google
          </SocialButton>

          <SocialButton
            type="button"
            onClick={() => handleSocialLogin('GitHub')}
            theme={theme}
          >
            Continue with GitHub
          </SocialButton>
        </Form>

        <LoginFooter theme={theme}>
          Don't have an account?{' '}
          <LoginLink to="/register">Sign up here</LoginLink>
        </LoginFooter>
      </LoginCard>
    </LoginContainer>
  );
};

export default Login;