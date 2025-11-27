import React from 'react';
import styled from 'styled-components';
import { useTheme } from '../contexts/ThemeContext';
import { FiGithub, FiTwitter, FiLinkedin, FiMail } from 'react-icons/fi';

const FooterContainer = styled.footer`
  background: ${props => props.theme === 'dark' ? '#1a202c' : '#f8fafc'};
  border-top: 1px solid ${props => props.theme === 'dark' ? '#4a5568' : '#e2e8f0'};
  margin-top: 4rem;
  padding: 3rem 0 2rem;
`;

const FooterContent = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 1rem;
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 2rem;
`;

const FooterSection = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

const FooterTitle = styled.h3`
  font-size: 1.125rem;
  font-weight: 600;
  color: ${props => props.theme === 'dark' ? '#e2e8f0' : '#1a202c'};
  margin-bottom: 0.5rem;
`;

const FooterLink = styled.a`
  color: ${props => props.theme === 'dark' ? '#a0aec0' : '#6b7280'};
  text-decoration: none;
  font-size: 0.875rem;
  transition: color 0.2s ease;

  &:hover {
    color: #667eea;
  }
`;

const FooterText = styled.p`
  color: ${props => props.theme === 'dark' ? '#a0aec0' : '#6b7280'};
  font-size: 0.875rem;
  line-height: 1.6;
`;

const SocialLinks = styled.div`
  display: flex;
  gap: 1rem;
  margin-top: 1rem;
`;

const SocialLink = styled.a`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 2.5rem;
  height: 2.5rem;
  background: ${props => props.theme === 'dark' ? '#4a5568' : '#f1f5f9'};
  color: ${props => props.theme === 'dark' ? '#a0aec0' : '#6b7280'};
  border-radius: 50%;
  text-decoration: none;
  transition: all 0.2s ease;

  &:hover {
    background: #667eea;
    color: white;
    transform: translateY(-2px);
  }
`;

const FooterBottom = styled.div`
  max-width: 1200px;
  margin: 2rem auto 0;
  padding: 2rem 1rem 0;
  border-top: 1px solid ${props => props.theme === 'dark' ? '#4a5568' : '#e2e8f0'};
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
  gap: 1rem;
`;

const Copyright = styled.p`
  color: ${props => props.theme === 'dark' ? '#a0aec0' : '#6b7280'};
  font-size: 0.875rem;
`;

const FooterBottomLinks = styled.div`
  display: flex;
  gap: 2rem;
  flex-wrap: wrap;
`;

const Footer = () => {
  const { theme } = useTheme();

  return (
    <FooterContainer theme={theme}>
      <FooterContent>
        <FooterSection>
          <FooterTitle theme={theme}>Forum App</FooterTitle>
          <FooterText theme={theme}>
            A modern community platform for discussions, knowledge sharing, and collaboration. 
            Join thousands of developers, designers, and tech enthusiasts.
          </FooterText>
          <SocialLinks>
            <SocialLink href="#" theme={theme} title="GitHub">
              <FiGithub />
            </SocialLink>
            <SocialLink href="#" theme={theme} title="Twitter">
              <FiTwitter />
            </SocialLink>
            <SocialLink href="#" theme={theme} title="LinkedIn">
              <FiLinkedin />
            </SocialLink>
            <SocialLink href="#" theme={theme} title="Email">
              <FiMail />
            </SocialLink>
          </SocialLinks>
        </FooterSection>

        <FooterSection>
          <FooterTitle theme={theme}>Community</FooterTitle>
          <FooterLink href="#" theme={theme}>Guidelines</FooterLink>
          <FooterLink href="#" theme={theme}>Code of Conduct</FooterLink>
          <FooterLink href="#" theme={theme}>Moderation</FooterLink>
          <FooterLink href="#" theme={theme}>Report Issues</FooterLink>
          <FooterLink href="#" theme={theme}>Community Awards</FooterLink>
        </FooterSection>

        <FooterSection>
          <FooterTitle theme={theme}>Resources</FooterTitle>
          <FooterLink href="#" theme={theme}>Documentation</FooterLink>
          <FooterLink href="#" theme={theme}>API Reference</FooterLink>
          <FooterLink href="#" theme={theme}>Tutorials</FooterLink>
          <FooterLink href="#" theme={theme}>Blog</FooterLink>
          <FooterLink href="#" theme={theme}>Help Center</FooterLink>
        </FooterSection>

        <FooterSection>
          <FooterTitle theme={theme}>Company</FooterTitle>
          <FooterLink href="#" theme={theme}>About Us</FooterLink>
          <FooterLink href="#" theme={theme}>Careers</FooterLink>
          <FooterLink href="#" theme={theme}>Privacy Policy</FooterLink>
          <FooterLink href="#" theme={theme}>Terms of Service</FooterLink>
          <FooterLink href="#" theme={theme}>Contact</FooterLink>
        </FooterSection>
      </FooterContent>

      <FooterBottom theme={theme}>
        <Copyright theme={theme}>
          © 2024 Forum App. All rights reserved.
        </Copyright>
        <FooterBottomLinks>
          <FooterLink href="#" theme={theme}>Privacy</FooterLink>
          <FooterLink href="#" theme={theme}>Terms</FooterLink>
          <FooterLink href="#" theme={theme}>Cookies</FooterLink>
        </FooterBottomLinks>
      </FooterBottom>
    </FooterContainer>
  );
};

export default Footer;