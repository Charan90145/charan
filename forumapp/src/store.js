// Simple localStorage-backed client store for posts, votes, and comments

const STORAGE_KEYS = {
  POSTS: 'forum_posts',
  COMMENTS: 'forum_comments',
  VOTES: 'forum_votes', // map of postId -> net votes integer
};

function readJson(key, fallback) {
  try {
    const raw = localStorage.getItem(key);
    return raw ? JSON.parse(raw) : fallback;
  } catch (_) {
    return fallback;
  }
}

function writeJson(key, value) {
  localStorage.setItem(key, JSON.stringify(value));
}

function seedIfEmpty() {
  const posts = readJson(STORAGE_KEYS.POSTS, null);
  if (!posts || posts.length === 0) {
    const seedPosts = [
      {
        id: '1',
        title: 'How to Build a Modern React Application with Hooks',
        content: "In this comprehensive guide, I'll walk you through building a modern React application using functional components and hooks...",
        author: { username: 'john_doe', reputation: 1250 },
        community: 'reactjs',
        category: 'React',
        tags: ['react', 'hooks', 'javascript', 'frontend'],
        votes: 42,
        comments: 18,
        views: 1250,
        createdAt: '2024-01-15T10:30:00Z',
        isPinned: true,
        isSolved: false
      },
      {
        id: '2',
        title: 'Best Practices for Node.js API Development',
        content: "After building dozens of Node.js APIs, here are the essential best practices I've learned...",
        author: { username: 'sarah_dev', reputation: 2100 },
        community: 'node',
        category: 'Node.js',
        tags: ['nodejs', 'api', 'backend', 'best-practices'],
        votes: 38,
        comments: 12,
        views: 980,
        createdAt: '2024-01-14T15:45:00Z',
        isPinned: false,
        isSolved: true
      }
    ];
    writeJson(STORAGE_KEYS.POSTS, seedPosts);
  }
  if (!readJson(STORAGE_KEYS.COMMENTS, null)) {
    writeJson(STORAGE_KEYS.COMMENTS, {});
  }
  if (!readJson(STORAGE_KEYS.VOTES, null)) {
    const postsNow = readJson(STORAGE_KEYS.POSTS, []);
    const votes = Object.fromEntries(postsNow.map(p => [p.id, p.votes || 0]));
    writeJson(STORAGE_KEYS.VOTES, votes);
  }
}

seedIfEmpty();

export const store = {
  getAllPosts() {
    const posts = readJson(STORAGE_KEYS.POSTS, []);
    const votes = readJson(STORAGE_KEYS.VOTES, {});
    return posts.map(p => ({ ...p, votes: votes[p.id] ?? p.votes ?? 0 }));
  },

  getPostById(id) {
    const votes = readJson(STORAGE_KEYS.VOTES, {});
    const p = this.getAllPosts().find(x => x.id === id);
    if (!p) return null;
    return { ...p, votes: votes[id] ?? p.votes ?? 0 };
  },

  addPost({ title, content, authorUsername, community, attachments }) {
    const posts = readJson(STORAGE_KEYS.POSTS, []);
    const id = String(Date.now());
    const post = {
      id,
      title,
      content,
      author: { username: authorUsername || 'anonymous', reputation: 0 },
      community: community || 'general',
      category: 'General',
      tags: [],
      votes: 0,
      comments: 0,
      views: 0,
      createdAt: new Date().toISOString(),
      isPinned: false,
      isSolved: false,
      attachments: attachments || []
    };
    posts.unshift(post);
    writeJson(STORAGE_KEYS.POSTS, posts);
    const votes = readJson(STORAGE_KEYS.VOTES, {});
    votes[id] = 0;
    writeJson(STORAGE_KEYS.VOTES, votes);
    return id;
  },

  votePost(id, delta) {
    const votes = readJson(STORAGE_KEYS.VOTES, {});
    const current = votes[id] ?? 0;
    const next = current + delta;
    votes[id] = next;
    writeJson(STORAGE_KEYS.VOTES, votes);
    return next;
  },

  getComments(postId) {
    const all = readJson(STORAGE_KEYS.COMMENTS, {});
    return all[postId] || [];
  },

  addComment(postId, content, authorUsername) {
    const all = readJson(STORAGE_KEYS.COMMENTS, {});
    const list = all[postId] || [];
    const comment = { id: String(Date.now()), content, author: authorUsername || 'anonymous', createdAt: new Date().toISOString() };
    all[postId] = [comment, ...list];
    writeJson(STORAGE_KEYS.COMMENTS, all);

    // update posts comments count
    const posts = readJson(STORAGE_KEYS.POSTS, []);
    const idx = posts.findIndex(p => p.id === postId);
    if (idx >= 0) {
      posts[idx] = { ...posts[idx], comments: (posts[idx].comments || 0) + 1 };
      writeJson(STORAGE_KEYS.POSTS, posts);
    }
    return comment.id;
  },
};

export function sortPosts(posts, mode) {
  switch (mode) {
    case 'recent':
      return [...posts].sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
    case 'popular':
      return [...posts].sort((a, b) => (b.votes + b.comments + b.views) - (a.votes + a.comments + a.views));
    case 'trending':
      return [...posts].sort((a, b) => b.votes - a.votes);
    default:
      return posts;
  }
}


