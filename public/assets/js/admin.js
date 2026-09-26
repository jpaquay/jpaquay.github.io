/**
 * Admin Post Editor JS Logic
 * Integrates Google Identity Services / Firebase Auth & GitHub Octokit API
 */

const ALLOWED_ADMINS = [
  'jpaquay@gmail.com',
  'jerome@netdev.be',
  'jpaquay@google.com'
];

const REPO_OWNER = 'jpaquay';
const REPO_NAME = 'jpaquay.github.io';
const POSTS_DIR = '_posts';

let currentUser = null;
let githubToken = sessionStorage.getItem('admin_gh_token') || '';
let easyMDE = null;
let currentEditingPost = null; // null for new post, path string for existing post

// Initialize on DOM Ready
document.addEventListener('DOMContentLoaded', () => {
  initEditor();
  initAuth();
  initEventListeners();
});

function initEditor() {
  const textarea = document.getElementById('post-content');
  if (textarea && typeof EasyMDE !== 'undefined') {
    easyMDE = new EasyMDE({
      element: textarea,
      spellChecker: false,
      autosave: {
        enabled: true,
        uniqueId: 'admin_post_draft',
        delay: 10000,
      },
      placeholder: 'Write your post content in Markdown here...',
      status: ['autosave', 'lines', 'words', 'cursor']
    });
  }
}

function initAuth() {
  // Check local storage for existing session
  const storedUser = sessionStorage.getItem('admin_user');
  if (storedUser) {
    try {
      const user = JSON.parse(storedUser);
      if (ALLOWED_ADMINS.includes(user.email)) {
        setAuthenticatedUser(user);
        return;
      }
    } catch (e) {
      sessionStorage.removeItem('admin_user');
    }
  }

  // Initialize Google Identity Services
  const clientId = window.GOOGLE_CLIENT_ID || '565491848800-l053m9oh0p892ks0gtdcc4mhsegejokq.apps.googleusercontent.com';
  const gIdContainer = document.getElementById('g_id_onload');
  if (window.google && google.accounts && google.accounts.id) {
    google.accounts.id.initialize({
      client_id: clientId,
      callback: handleGoogleSignIn
    });
    if (gIdContainer) {
      google.accounts.id.renderButton(
        gIdContainer,
        { theme: 'outline', size: 'large', width: 280 }
      );
    }
  } else if (gIdContainer) {
    gIdContainer.style.display = 'none';
  }
}

function handleGoogleSignIn(response) {
  try {
    const payload = parseJwt(response.credential);
    const email = payload.email;

    if (ALLOWED_ADMINS.includes(email)) {
      const user = {
        name: payload.name || email,
        email: email,
        picture: payload.picture || ''
      };
      sessionStorage.setItem('admin_user', JSON.stringify(user));
      setAuthenticatedUser(user);
      showToast(`Welcome back, ${user.name}!`);
    } else {
      showToast(`Access Denied: ${email} is not an authorized admin.`, true);
    }
  } catch (err) {
    console.error('Auth error:', err);
    showToast('Failed to sign in with Google.', true);
  }
}

function parseJwt(token) {
  const base64Url = token.split('.')[1];
  const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
  const jsonPayload = decodeURIComponent(atob(base64).split('').map(c => {
    return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
  }).join(''));
  return JSON.parse(jsonPayload);
}

function setAuthenticatedUser(user) {
  currentUser = user;
  document.getElementById('auth-section').classList.add('hidden');
  document.getElementById('admin-app').classList.remove('hidden');

  document.getElementById('user-display-name').textContent = user.name;
  document.getElementById('user-email').textContent = user.email;
  if (user.picture) {
    document.getElementById('user-avatar').src = user.picture;
  }

  if (githubToken) {
    document.getElementById('gh-token-input').value = githubToken;
    loadPostsList();
  } else {
    showToast('Please provide a GitHub Personal Access Token to manage repository posts.');
  }
}

function performLogout() {
  // Clear session storage
  sessionStorage.removeItem('admin_user');
  sessionStorage.removeItem('admin_gh_token');

  // Clear memory variables
  currentUser = null;
  githubToken = '';

  // Clear DOM elements
  const ghInput = document.getElementById('gh-token-input');
  if (ghInput) ghInput.value = '';

  const displayName = document.getElementById('user-display-name');
  if (displayName) displayName.textContent = '';

  const userEmail = document.getElementById('user-email');
  if (userEmail) userEmail.textContent = '';

  const userAvatar = document.getElementById('user-avatar');
  if (userAvatar) userAvatar.src = '';

  const postsListBody = document.getElementById('posts-list-body');
  if (postsListBody) postsListBody.innerHTML = '';

  // Reset editor state
  if (typeof resetEditor === 'function') resetEditor();

  // Update UI state
  const adminApp = document.getElementById('admin-app');
  if (adminApp) adminApp.classList.add('hidden');

  const authSection = document.getElementById('auth-section');
  if (authSection) authSection.classList.remove('hidden');
}

function initEventListeners() {
  document.getElementById('btn-logout')?.addEventListener('click', () => {
    performLogout();
  });

  document.getElementById('btn-switch-user')?.addEventListener('click', () => {
    performLogout();
    showToast('Signed out. Select or enter an account to switch.');
  });

  document.getElementById('btn-save-token')?.addEventListener('click', () => {
    const token = document.getElementById('gh-token-input').value.trim();
    if (token) {
      githubToken = token;
      sessionStorage.setItem('admin_gh_token', token);
      showToast('GitHub Token saved!');
      loadPostsList();
    }
  });

  document.getElementById('btn-new-post')?.addEventListener('click', resetEditor);

  document.getElementById('post-form')?.addEventListener('submit', handlePostSubmit);

  const postsListBody = document.getElementById('posts-list-body');
  if (postsListBody) {
    postsListBody.addEventListener('click', (e) => {
      const editBtn = e.target.closest('.btn-edit-post');
      if (editBtn) {
        const path = editBtn.getAttribute('data-path');
        const sha = editBtn.getAttribute('data-sha');
        if (path && sha) {
          editPost(path, sha);
        }
      }
    });
  }
}

function getOctokitHeaders() {
  return {
    'Accept': 'application/vnd.github.v3+json',
    'Authorization': `token ${githubToken}`
  };
}

async function loadPostsList() {
  const tbody = document.getElementById('posts-list-body');
  if (!tbody) return;

  tbody.innerHTML = '<tr><td colspan="4" style="text-align: center;">Loading posts from GitHub...</td></tr>';

  try {
    const res = await fetch(`https://api.github.com/repos/${REPO_OWNER}/${REPO_NAME}/contents/${POSTS_DIR}`, {
      headers: getOctokitHeaders()
    });

    if (!res.ok) {
      throw new Error(`GitHub API error: ${res.statusText}`);
    }

    const files = await res.json();
    const markdownFiles = files.filter(f => f.name.endsWith('.md') || f.name.endsWith('.markdown'));

    tbody.innerHTML = '';
    if (markdownFiles.length === 0) {
      tbody.innerHTML = '<tr><td colspan="4">No posts found.</td></tr>';
      return;
    }

    markdownFiles.sort((a, b) => b.name.localeCompare(a.name));

    // ⚡ Bolt: Use a DocumentFragment to batch DOM insertions and prevent layout thrashing
    const fragment = document.createDocumentFragment();

    markdownFiles.forEach(file => {
      const tr = document.createElement('tr');

      // Extract date & title preview from filename (YYYY-MM-DD-title.md)
      const nameParts = file.name.replace(/\.(md|markdown)$/, '').split('-');
      let dateStr = 'N/A';
      let titleStr = file.name;
      if (nameParts.length >= 4) {
        dateStr = nameParts.slice(0, 3).join('-');
        titleStr = nameParts.slice(3).join(' ');
      }

      tr.innerHTML = `
        <td><strong>${escapeHtml(titleStr)}</strong><br><small style="color: #64748b">${escapeHtml(file.name)}</small></td>
        <td>${escapeHtml(dateStr)}</td>
        <td><span class="status-badge status-published">Published</span></td>
        <td>
          <button class="admin-btn admin-btn-secondary admin-btn-sm btn-edit-post" data-path="${escapeHtml(file.path)}" data-sha="${escapeHtml(file.sha)}">Edit</button>
        </td>
      `;
      fragment.appendChild(tr);
    });

    tbody.appendChild(fragment);
  } catch (err) {
    console.error('Failed to load posts:', err);
    tbody.innerHTML = `<tr><td colspan="4" style="color: red;">Error loading posts: ${escapeHtml(err.message)}. Please check your GitHub Token.</td></tr>`;
  }
}

async function editPost(path, sha) {
  try {
    showToast('Fetching post content...');
    const res = await fetch(`https://api.github.com/repos/${REPO_OWNER}/${REPO_NAME}/contents/${path}`, {
      headers: getOctokitHeaders()
    });

    if (!res.ok) throw new Error('Failed to fetch file content');

    const data = await res.json();
    const content = decodeURIComponent(escape(atob(data.content)));

    currentEditingPost = { path: data.path, sha: data.sha };

    // Parse Front-Matter
    const parsed = parseFrontMatter(content);

    document.getElementById('post-title').value = parsed.attributes.title || '';
    document.getElementById('post-date').value = parsed.attributes.date || path.split('/').pop().substring(0, 10);
    document.getElementById('post-subtitle').value = parsed.attributes.subtitle || '';
    document.getElementById('post-tags').value = Array.isArray(parsed.attributes.tags)
      ? parsed.attributes.tags.join(', ')
      : (parsed.attributes.tags || '');

    if (easyMDE) {
      easyMDE.value(parsed.body);
    } else {
      document.getElementById('post-content').value = parsed.body;
    }

    document.getElementById('editor-heading').textContent = `Edit Post: ${path.split('/').pop()}`;
    document.getElementById('post-form-section').scrollIntoView({ behavior: 'smooth' });
    showToast('Post loaded into editor');
  } catch (err) {
    console.error(err);
    showToast(`Error: ${err.message}`, true);
  }
}

async function handlePostSubmit(e) {
  e.preventDefault();

  if (!githubToken) {
    showToast('Please enter and save a GitHub Personal Access Token first!', true);
    return;
  }

  const title = document.getElementById('post-title').value.trim();
  const dateStr = document.getElementById('post-date').value || new Date().toISOString().split('T')[0];
  const subtitle = document.getElementById('post-subtitle').value.trim();
  const tagsStr = document.getElementById('post-tags').value.trim();
  const body = easyMDE ? easyMDE.value() : document.getElementById('post-content').value;

  if (!title) {
    showToast('Title is required!', true);
    return;
  }

  // Build Front-Matter YAML
  const tags = tagsStr ? tagsStr.split(',').map(t => t.trim()).filter(Boolean) : [];
  let frontMatter = `---\nlayout: post\ntitle: "${title.replace(/"/g, '\\"')}"\n`;
  if (subtitle) frontMatter += `subtitle: "${subtitle.replace(/"/g, '\\"')}"\n`;
  if (tags.length) frontMatter += `tags: [${tags.map(t => `"${t}"`).join(', ')}]\n`;
  frontMatter += `readtime: true\n---\n\n`;

  const fullContent = frontMatter + body;
  const slug = title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
  const fileName = `${dateStr}-${slug}.md`;
  const targetPath = currentEditingPost ? currentEditingPost.path : `${POSTS_DIR}/${fileName}`;

  const payload = {
    message: currentEditingPost ? `Update post: ${title}` : `Create post: ${title}`,
    content: btoa(unescape(encodeURIComponent(fullContent))),
    branch: 'main'
  };

  if (currentEditingPost) {
    payload.sha = currentEditingPost.sha;
  }

  try {
    showToast('Committing changes to GitHub...');
    const res = await fetch(`https://api.github.com/repos/${REPO_OWNER}/${REPO_NAME}/contents/${targetPath}`, {
      method: 'PUT',
      headers: getOctokitHeaders(),
      body: JSON.stringify(payload)
    });

    if (!res.ok) {
      const errData = await res.json();
      throw new Error(errData.message || 'GitHub API commit error');
    }

    showToast(currentEditingPost ? 'Post updated successfully!' : 'Post created successfully!');
    resetEditor();
    loadPostsList();
  } catch (err) {
    console.error(err);
    showToast(`Commit failed: ${err.message}`, true);
  }
}

function resetEditor() {
  currentEditingPost = null;
  document.getElementById('editor-heading').textContent = 'Create New Post';
  document.getElementById('post-form').reset();
  document.getElementById('post-date').value = new Date().toISOString().split('T')[0];
  if (easyMDE) easyMDE.value('');
}

function parseFrontMatter(text) {
  const regex = /^---\r?\n([\s\S]*?)\r?\n---\r?\n([\s\S]*)$/;
  const match = text.match(regex);
  if (!match) {
    return { attributes: {}, body: text };
  }

  const yamlRaw = match[1];
  const body = match[2];
  const attributes = {};

  yamlRaw.split('\n').forEach(line => {
    const colonIdx = line.indexOf(':');
    if (colonIdx !== -1) {
      const key = line.slice(0, colonIdx).trim();
      let val = line.slice(colonIdx + 1).trim();
      // Simple string parsing
      if (val.startsWith('"') && val.endsWith('"')) val = val.slice(1, -1);
      if (val.startsWith('[') && val.endsWith(']')) {
        val = val.slice(1, -1).split(',').map(s => s.trim().replace(/^["']|["']$/g, ''));
      }
      attributes[key] = val;
    }
  });

  return { attributes, body };
}

function escapeHtml(str) {
  if (!str) return '';
  return String(str).replace(/[&<>"']/g, function(m) {
    return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#039;' }[m];
  });
}

function showToast(msg, isError = false) {
  const toast = document.getElementById('admin-toast');
  if (!toast) return;
  toast.textContent = msg;
  toast.style.backgroundColor = isError ? '#ef4444' : '#1e293b';
  toast.classList.remove('hidden');
  setTimeout(() => {
    toast.classList.add('hidden');
  }, 4000);
}
