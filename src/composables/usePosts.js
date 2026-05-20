const BASE = 'https://api.oluwasetemi.dev'

// Single consistent tech image for all posts
const TECH_IMAGE = 'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=600&q=80'

export function parseTags(tags) {
  if (!tags) return []
  if (Array.isArray(tags)) return tags
  return tags.split(',').map(t => t.trim()).filter(Boolean)
}

export function getPostImage() {
  return TECH_IMAGE
}

export function getExcerpt(content, length = 120) {
  if (!content) return ''
  const plain = content.replace(/<[^>]*>/g, '').replace(/\s+/g, ' ').trim()
  return plain.length > length ? plain.slice(0, length) + '…' : plain
}

export function formatDate(dateStr) {
  if (!dateStr) return ''
  return new Date(dateStr).toLocaleDateString('en-US', {
    month: 'long',
    day: 'numeric',
    year: 'numeric',
  })
}

export function readTime(content) {
  if (!content) return '3 min read'
  const words = content.replace(/<[^>]*>/g, '').split(/\s+/).length
  const mins = Math.max(1, Math.ceil(words / 200))
  return `${mins} min read`
}

export async function fetchPosts(page = 1, limit = 10) {
  const res = await fetch(`${BASE}/posts?page=${page}&limit=${limit}`)
  if (!res.ok) throw new Error(`Failed to fetch posts (${res.status})`)
  const data = await res.json()
  return Array.isArray(data) ? data : (data.data || data.posts || [])
}

export async function fetchPostById(id) {
  const res = await fetch(`${BASE}/posts/${id}`)
  if (!res.ok) throw new Error(`Post not found (${res.status})`)
  const data = await res.json()
  return data.data || data.post || data
}