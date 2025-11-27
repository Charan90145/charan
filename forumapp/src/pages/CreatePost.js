import React, { useState, useMemo } from 'react';
import styled from 'styled-components';
import { useTheme } from '../contexts/ThemeContext';
import { useNavigate } from 'react-router-dom';
import { store } from '../store';
import { useAuth } from '../contexts/AuthContext';
import { toast } from 'react-hot-toast';

const CreatePostContainer = styled.div`
  padding: 2rem 0;
`;

const Form = styled.form`
  max-width: 800px;
  margin: 0 auto;
  background: ${props => props.theme === 'dark' ? '#1f2937' : '#ffffff'};
  border: 1px solid ${props => props.theme === 'dark' ? '#374151' : '#e5e7eb'};
  border-radius: 1rem;
  padding: 2rem;
`;

const Field = styled.div`
  margin-bottom: 1.25rem;
`;

const Label = styled.label`
  display: block;
  margin-bottom: 0.5rem;
  font-weight: 600;
  color: ${props => props.theme === 'dark' ? '#e2e8f0' : '#1f2937'};
`;

const Input = styled.input`
  width: 100%;
  padding: 0.75rem 1rem;
  border-radius: 0.5rem;
  border: 1px solid ${props => props.theme === 'dark' ? '#374151' : '#e5e7eb'};
  background: ${props => props.theme === 'dark' ? '#111827' : '#ffffff'};
  color: ${props => props.theme === 'dark' ? '#e5e7eb' : '#111827'};
`;

const Textarea = styled.textarea`
  width: 100%;
  min-height: 160px;
  padding: 0.75rem 1rem;
  border-radius: 0.5rem;
  border: 1px solid ${props => props.theme === 'dark' ? '#374151' : '#e5e7eb'};
  background: ${props => props.theme === 'dark' ? '#111827' : '#ffffff'};
  color: ${props => props.theme === 'dark' ? '#e5e7eb' : '#111827'};
  resize: vertical;
`;

const AttachmentsBox = styled.div`
  padding: 1rem;
  border: 2px dashed ${props => props.theme === 'dark' ? '#374151' : '#cbd5e1'};
  border-radius: 0.75rem;
  background: ${props => props.theme === 'dark' ? 'rgba(17,24,39,0.6)' : '#f8fafc'};
`;

const AttachmentsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(140px, 1fr));
  gap: 0.75rem;
  margin-top: 0.75rem;
`;

const AttachmentCard = styled.div`
  position: relative;
  border: 1px solid ${props => props.theme === 'dark' ? '#374151' : '#e5e7eb'};
  border-radius: 0.5rem;
  background: ${props => props.theme === 'dark' ? '#0b1220' : '#ffffff'};
  padding: 0.5rem;
  overflow: hidden;
`;

const AttachmentThumb = styled.div`
  width: 100%;
  height: 100px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: ${props => props.theme === 'dark' ? '#111827' : '#f1f5f9'};
  border-radius: 0.375rem;
  overflow: hidden;

  img {
    max-width: 100%;
    max-height: 100%;
    object-fit: cover;
  }
`;

const RemoveButton = styled.button`
  position: absolute;
  top: 6px;
  right: 6px;
  border: none;
  background: #ef4444;
  color: white;
  border-radius: 0.375rem;
  padding: 0.25rem 0.5rem;
  cursor: pointer;
`;

const SubmitButton = styled.button`
  padding: 0.75rem 1.5rem;
  border: none;
  border-radius: 0.5rem;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  font-weight: 600;
  cursor: pointer;
`;

const CreatePost = () => {
  const { theme } = useTheme();
  const { user } = useAuth();
  const navigate = useNavigate();
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [attachments, setAttachments] = useState([]);

  const previews = useMemo(() => attachments.map(file => {
    if (file.type.startsWith('image/')) {
      return { type: 'image', url: URL.createObjectURL(file), name: file.name, size: file.size };
    }
    return { type: 'file', url: null, name: file.name, size: file.size };
  }), [attachments]);

  const onFilesSelected = (filesList) => {
    const files = Array.from(filesList || []);
    const MAX_FILES = 10;
    const MAX_SIZE = 10 * 1024 * 1024; // 10MB
    const allowed = files.filter(f => f.size <= MAX_SIZE);
    const next = [...attachments, ...allowed].slice(0, MAX_FILES);
    setAttachments(next);
  };

  const handleFileInput = (e) => {
    onFilesSelected(e.target.files);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    onFilesSelected(e.dataTransfer.files);
  };

  const handleRemove = (name) => {
    setAttachments(prev => prev.filter(f => f.name !== name));
  };

  const filesToDataUrls = async (files) => {
    const toDataUrl = (file) => new Promise((resolve) => {
      const reader = new FileReader();
      reader.onload = () => resolve(reader.result);
      reader.readAsDataURL(file);
    });
    const results = [];
    for (const f of files) {
      if (f.type.startsWith('image/')) {
        const dataUrl = await toDataUrl(f);
        results.push({ kind: 'image', name: f.name, dataUrl });
      } else {
        // For simplicity store names for non-images
        results.push({ kind: 'file', name: f.name });
      }
    }
    return results;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!title.trim() || !content.trim()) {
      toast.error('Please enter a title and content');
      return;
    }
    const storedAttachments = await filesToDataUrls(attachments);
    const id = store.addPost({
      title: title.trim(),
      content: content.trim(),
      authorUsername: user?.username || 'anonymous',
      community: 'general',
      attachments: storedAttachments
    });
    toast.success('Post published');
    navigate(`/post/${id}`);
  };

  return (
    <CreatePostContainer>
      <Form onSubmit={handleSubmit} theme={theme}>
        <Field>
          <Label theme={theme} htmlFor="title">Title</Label>
          <Input id="title" value={title} onChange={e => setTitle(e.target.value)} theme={theme} placeholder="Enter a clear title" />
        </Field>

        <Field>
          <Label theme={theme} htmlFor="content">Content</Label>
          <Textarea id="content" value={content} onChange={e => setContent(e.target.value)} theme={theme} placeholder="Write your post..." />
        </Field>

        <Field>
          <Label theme={theme}>Attachments</Label>
          <AttachmentsBox 
            theme={theme}
            onDragOver={(e) => e.preventDefault()}
            onDrop={handleDrop}
          >
            <input 
              id="file-input"
              type="file" 
              multiple 
              onChange={handleFileInput}
              accept="image/*,video/*,.pdf,.doc,.docx,.ppt,.pptx,.zip,.txt"
            />
            <small style={{ color: theme === 'dark' ? '#9ca3af' : '#6b7280' }}>
              Drag & drop files here, or click to select (max 10 files, 10MB each)
            </small>

            {attachments.length > 0 && (
              <AttachmentsGrid>
                {previews.map(p => (
                  <AttachmentCard key={p.name} theme={theme}>
                    <RemoveButton type="button" onClick={() => handleRemove(p.name)}>Remove</RemoveButton>
                    <AttachmentThumb theme={theme}>
                      {p.type === 'image' ? (
                        <img src={p.url} alt={p.name} />
                      ) : (
                        <div style={{ fontSize: '0.875rem', textAlign: 'center', padding: '0.5rem' }}>
                          {p.name}
                        </div>
                      )}
                    </AttachmentThumb>
                    <div style={{ fontSize: '0.75rem', marginTop: '0.25rem', color: theme === 'dark' ? '#9ca3af' : '#6b7280' }}>
                      {p.name}
                    </div>
                  </AttachmentCard>
                ))}
              </AttachmentsGrid>
            )}
          </AttachmentsBox>
        </Field>

        <SubmitButton type="submit" disabled={!title.trim() || !content.trim()}>
          Publish
        </SubmitButton>
      </Form>
    </CreatePostContainer>
  );
};

export default CreatePost;