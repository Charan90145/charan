import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { useAuth } from '../contexts/AuthContext';
import { useTheme } from '../contexts/ThemeContext';
import { FiMail, FiLock, FiUser, FiEye, FiEyeOff } from 'react-icons/fi';
import toast from 'react-hot-toast';

const RegisterContainer = styled.div`
  min-height: 80vh;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 2rem 1rem;
`;

const RegisterCard = styled.div`
  background: ${props => props.theme === 'dark' ? '#2d3748' : 'white'};
  border-radius: 1rem;
  box-shadow: 0 10px 25px rgba(0, 0, 0, 0.1);
  padding: 3rem;
  width: 100%;
  max-width: 400px;
  border: 1px solid ${props => props.theme === 'dark' ? '#4a5568' : '#e2e8f0'};
`;

const RegisterHeader = styled.div`
  text-align: center;
  margin-bottom: 2rem;
`;

const RegisterTitle = styled.h1`
  font-size: 2rem;
  font-weight: 700;
  color: ${props => props.theme === 'dark' ? '#e2e8f0' : '#1a202c'};
  margin-bottom: 0.5rem;
`;

const RegisterSubtitle = styled.p`
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

const RegisterButton = styled.button`
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

const RegisterFooter = styled.div`
  text-align: center;
  margin-top: 2rem;
  color: ${props => props.theme === 'dark' ? '#a0aec0' : '#6b7280'};
  font-size: 0.875rem;
`;

const RegisterLink = styled(Link)`
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

const Register = () => {
  const { register } = useAuth();
  const { theme } = useTheme();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    confirmPassword: ''
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
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

    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match');
      setLoading(false);
      return;
    }

    if (formData.password.length < 6) {
      setError('Password must be at least 6 characters long');
      setLoading(false);
      return;
    }

    try {
      const result = await register(formData.username, formData.email, formData.password);
      if (result.success) {
        toast.success('Account created successfully!');
        navigate('/forum');
      } else {
        setError(result.error || 'Registration failed');
      }
    } catch (err) {
      setError('An unexpected error occurred');
    } finally {
      setLoading(false);
    }
  };

  return (
    <RegisterContainer>
      <RegisterCard theme={theme}>
        <RegisterHeader>
          <RegisterTitle theme={theme}>Create Account</RegisterTitle>
          <RegisterSubtitle theme={theme}>
            Join our community and start discussing
          </RegisterSubtitle>
        </RegisterHeader>

        <Form onSubmit={handleSubmit}>
          {error && <ErrorMessage>{error}</ErrorMessage>}

          <FormGroup>
            <FormLabel theme={theme}>Username</FormLabel>
            <InputContainer>
              <InputIcon theme={theme}>
                <FiUser />
              </InputIcon>
              <FormInput
                type="text"
                name="username"
                value={formData.username}
                onChange={handleChange}
                placeholder="Choose a username"
                required
                theme={theme}
              />
            </InputContainer>
          </FormGroup>

          <FormGroup>
            <FormLabel theme={theme}>Email Address</FormLabel>
            <InputContainer>
              <InputIcon theme={theme}>
                <FiMail />
              </InputIcon>
              <FormInput
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="Enter your email"
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
                placeholder="Create a password"
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

          <FormGroup>
            <FormLabel theme={theme}>Confirm Password</FormLabel>
            <InputContainer>
              <InputIcon theme={theme}>
                <FiLock />
              </InputIcon>
              <FormInput
                type={showConfirmPassword ? 'text' : 'password'}
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleChange}
                placeholder="Confirm your password"
                required
                theme={theme}
              />
              <PasswordToggle
                type="button"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                theme={theme}
              >
                {showConfirmPassword ? <FiEyeOff /> : <FiEye />}
              </PasswordToggle>
            </InputContainer>
          </FormGroup>

          <RegisterButton type="submit" disabled={loading}>
            {loading ? 'Creating Account...' : 'Create Account'}
          </RegisterButton>
        </Form>

        <RegisterFooter theme={theme}>
          Already have an account?{' '}
          <RegisterLink to="/login">Sign in here</RegisterLink>
        </RegisterFooter>
      </RegisterCard>
    </RegisterContainer>
  );
};

export default Register;