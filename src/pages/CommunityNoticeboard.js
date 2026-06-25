import React, { useState, useEffect, useMemo } from 'react';
import SEO from '../components/SEO';
import Breadcrumbs from '../components/Breadcrumbs';
import AnimateOnScroll from '../components/AnimateOnScroll';
import {
  FaBullhorn, FaSearch, FaTimes, FaPlus, FaFilter,
  FaMapMarkerAlt, FaPhone, FaEnvelope, FaCalendarAlt,
  FaThumbsUp, FaTrash, FaThumbtack,
  FaExclamationCircle, FaBriefcase, FaCar, FaBoxOpen,
  FaTools,
} from 'react-icons/fa';
import { HERO_IMAGES } from '../utils/imageConstants';

// ─── Constants ─────────────────────────────────────────────────────────────────

const STORAGE_KEY = 'hss_noticeboard_posts';

const CATEGORIES = [
  { id: 'all', label: 'All Posts', color: '#0D4E25', bg: 'bg-neutral-100', text: 'text-neutral-700', Icon: FaBullhorn },
  { id: 'announcement', label: 'Announcement', color: '#0D4E25', bg: 'bg-green-100', text: 'text-green-800', Icon: FaBullhorn },
  { id: 'lost-found', label: 'Lost & Found', color: '#F57F17', bg: 'bg-amber-100', text: 'text-amber-800', Icon: FaExclamationCircle },
  { id: 'rides', label: 'Rides & Transport', color: '#1565C0', bg: 'bg-blue-100', text: 'text-blue-800', Icon: FaCar },
  { id: 'items', label: 'Items for Sale', color: '#6A1B9A', bg: 'bg-purple-100', text: 'text-purple-800', Icon: FaBoxOpen },
  { id: 'events', label: 'Events', color: '#AD1457', bg: 'bg-pink-100', text: 'text-pink-800', Icon: FaCalendarAlt },
  { id: 'jobs', label: 'Jobs & Tutoring', color: '#00695C', bg: 'bg-teal-100', text: 'text-teal-800', Icon: FaBriefcase },
  { id: 'general', label: 'General', color: '#37474F', bg: 'bg-slate-100', text: 'text-slate-700', Icon: FaTools },
];

const getCat = (id) => CATEGORIES.find((c) => c.id === id) || CATEGORIES[CATEGORIES.length - 1];

const SEED_POSTS = [
  {
    id: 'seed-1',
    title: 'Welcome to the Harding Secondary Community Noticeboard',
    category: 'announcement',
    body: 'This is the official community noticeboard for Harding Secondary School. Parents, learners, and staff can post announcements, find lost items, arrange rides, sell items, and more. Posts remain for 30 days. Please keep content respectful and school-appropriate.',
    contact: 'office@hardingsecondary.edu.za',
    author: 'School Administration',
    date: '2026-06-20',
    pinned: true,
    likes: 5,
    userPost: false,
  },
  {
    id: 'seed-2',
    title: 'Daily lift available — Harding CBD to school and back',
    category: 'rides',
    body: 'Parent offering daily lift from Harding CBD (near Pick n Pay) to the school and return trip after dismissal. 2 seats available from Monday. Contribution to fuel requested. Please contact before the weekend to arrange.',
    contact: '081 234 5678',
    author: 'Parent (Masondo family)',
    date: '2026-06-22',
    pinned: false,
    likes: 3,
    userPost: false,
  },
  {
    id: 'seed-3',
    title: 'Life Sciences textbook found — Grade 11',
    category: 'lost-found',
    body: 'A Life Sciences textbook (Grade 11, Mind the Gap DBE edition) was found in the school library on Tuesday. The name inside is water-damaged and illegible. Please bring your student number to the school office to claim it.',
    contact: '039 433 1223 (ext. 2)',
    author: 'Library Staff',
    date: '2026-06-21',
    pinned: false,
    likes: 0,
    userPost: false,
  },
  {
    id: 'seed-4',
    title: 'Grade 8–10 school uniforms for sale — good condition',
    category: 'items',
    body: 'Selling a full set of Harding Secondary uniform items for Grade 8–10 in excellent condition. Includes blazer (size medium), two pairs of trousers, and three white shirts. Very affordable — all items for R250. Ideal for families with new Grade 8 learners.',
    contact: '073 456 7890',
    author: 'Parent',
    date: '2026-06-19',
    pinned: false,
    likes: 2,
    userPost: false,
  },
  {
    id: 'seed-5',
    title: '2026 Matric Dance — volunteers needed',
    category: 'events',
    body: 'The 2026 Matric Dance planning committee is looking for Grade 11 and 12 volunteers to assist with decorations, photography, and logistics. Planning meetings are every Thursday at 14:00 in the Grade 12 common room. All matric learners are welcome.',
    contact: 'SRC Chairperson — speak to any SRC member',
    author: 'SRC',
    date: '2026-06-23',
    pinned: false,
    likes: 8,
    userPost: false,
  },
  {
    id: 'seed-6',
    title: 'Private Mathematics tutoring — Grades 10 to 12',
    category: 'jobs',
    body: 'Qualified and experienced Mathematics teacher offering private tutoring sessions for Grade 10, 11, and 12 learners. Small groups (max 4 learners) or one-on-one sessions available on weekdays after school and Saturday mornings. Affordable rates. Has helped many learners pass matric Mathematics.',
    contact: '082 765 4321',
    author: 'Educator (Ms Dlamini)',
    date: '2026-06-20',
    pinned: false,
    likes: 4,
    userPost: false,
  },
  {
    id: 'seed-7',
    title: 'Lost: black sports bag — Gr 10 rugby practice',
    category: 'lost-found',
    body: 'Lost a black Nike sports bag at the rugby field on Thursday afternoon (19 June). Contains rugby boots, a Grade 10 jersey with number 8, and a water bottle. If found, please hand in to the school office or contact the number below.',
    contact: '064 123 4567',
    author: 'Learner (Grade 10)',
    date: '2026-06-23',
    pinned: false,
    likes: 1,
    userPost: false,
  },
  {
    id: 'seed-8',
    title: 'Term 3 extra classes — Science and Mathematics',
    category: 'announcement',
    body: 'Extra classes for Physical Sciences and Mathematics will resume in Term 3 every Tuesday and Thursday from 14:30–16:00. These sessions are free of charge for all Harding Secondary learners. Please bring your exercise books and past paper booklets.',
    contact: 'Contact the Science Department for more info',
    author: 'Sciences Department',
    date: '2026-06-24',
    pinned: false,
    likes: 12,
    userPost: false,
  },
];

// ─── Helpers ───────────────────────────────────────────────────────────────────

const loadPosts = () => {
  try {
    const stored = JSON.parse(localStorage.getItem(STORAGE_KEY));
    if (stored && stored.length > 0) return stored;
  } catch {}
  return SEED_POSTS;
};

const savePosts = (posts) => {
  try { localStorage.setItem(STORAGE_KEY, JSON.stringify(posts)); } catch {}
};

const formatPostDate = (dateStr) => {
  const date = new Date(dateStr);
  return date.toLocaleDateString('en-ZA', { day: 'numeric', month: 'long', year: 'numeric' });
};

const generateId = () => `post-${Date.now()}-${Math.random().toString(36).slice(2, 7)}`;

// ─── Post Card ─────────────────────────────────────────────────────────────────

const PostCard = ({ post, onLike, onDelete }) => {
  const cat = getCat(post.category);
  const Icon = cat.Icon;

  return (
    <div className={`bg-white rounded-2xl border shadow-sm hover:shadow-md transition-all duration-200 overflow-hidden ${
      post.pinned ? 'border-primary/30' : 'border-neutral-100'
    }`}>
      {/* Pinned indicator */}
      {post.pinned && (
        <div className="bg-primary/8 border-b border-primary/20 px-4 py-1.5 flex items-center gap-1.5">
          <FaThumbtack className="text-primary text-xs rotate-45" />
          <span className="text-xs font-semibold text-primary">Pinned by Admin</span>
        </div>
      )}

      <div className="p-5">
        {/* Header */}
        <div className="flex items-start justify-between gap-3 mb-3">
          <div className="flex items-start gap-3 flex-1 min-w-0">
            <div
              className="w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0 mt-0.5"
              style={{ backgroundColor: cat.color + '18' }}
            >
              <Icon style={{ color: cat.color }} className="text-sm" />
            </div>
            <div className="flex-1 min-w-0">
              <h3 className="font-heading font-bold text-neutral-800 text-sm leading-snug">{post.title}</h3>
              <div className="flex items-center gap-2 mt-1 flex-wrap">
                <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${cat.bg} ${cat.text}`}>
                  {cat.label}
                </span>
                <span className="text-[10px] text-neutral-400">by {post.author}</span>
                <span className="text-[10px] text-neutral-300">·</span>
                <span className="text-[10px] text-neutral-400">{formatPostDate(post.date)}</span>
              </div>
            </div>
          </div>
          {post.userPost && (
            <button
              onClick={() => onDelete(post.id)}
              aria-label="Delete post"
              className="w-7 h-7 flex items-center justify-center rounded-lg text-neutral-300 hover:text-red-500 hover:bg-red-50 transition-all flex-shrink-0"
            >
              <FaTrash className="text-xs" />
            </button>
          )}
        </div>

        {/* Body */}
        <p className="text-neutral-600 text-sm leading-relaxed mb-4">{post.body}</p>

        {/* Footer */}
        <div className="flex items-center justify-between gap-3 pt-3 border-t border-neutral-100">
          <div className="flex items-center gap-1.5 text-xs text-neutral-500">
            {post.contact.includes('@') ? (
              <FaEnvelope className="text-[10px] text-neutral-400" />
            ) : post.contact.match(/\d/) ? (
              <FaPhone className="text-[10px] text-neutral-400" />
            ) : (
              <FaMapMarkerAlt className="text-[10px] text-neutral-400" />
            )}
            <span className="font-medium">{post.contact}</span>
          </div>
          <button
            onClick={() => onLike(post.id)}
            className="flex items-center gap-1.5 text-xs text-neutral-400 hover:text-primary transition-colors px-2 py-1 rounded-lg hover:bg-primary/5"
          >
            <FaThumbsUp className="text-[10px]" />
            {post.likes > 0 && <span>{post.likes}</span>}
          </button>
        </div>
      </div>
    </div>
  );
};

// ─── Create Post Modal ─────────────────────────────────────────────────────────

const INITIAL_FORM = { title: '', category: 'announcement', body: '', contact: '', author: '' };

const CreatePostModal = ({ onClose, onSubmit }) => {
  const [form, setForm] = useState(INITIAL_FORM);
  const [errors, setErrors] = useState({});

  const validate = () => {
    const e = {};
    if (!form.title.trim()) e.title = 'Title is required';
    if (!form.body.trim() || form.body.length < 20) e.body = 'Please write at least 20 characters';
    if (!form.contact.trim()) e.contact = 'Contact info is required';
    if (!form.author.trim()) e.author = 'Your name or role is required';
    return e;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const errs = validate();
    if (Object.keys(errs).length > 0) { setErrors(errs); return; }
    onSubmit({
      ...form,
      id: generateId(),
      date: new Date().toISOString().split('T')[0],
      pinned: false,
      likes: 0,
      userPost: true,
    });
  };

  React.useEffect(() => {
    const handleKey = (e) => { if (e.key === 'Escape') onClose(); };
    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, [onClose]);

  const set = (field, value) => {
    setForm((f) => ({ ...f, [field]: value }));
    setErrors((e) => ({ ...e, [field]: undefined }));
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4 backdrop-blur-sm"
      onClick={onClose}
    >
      <div
        className="bg-white rounded-2xl w-full max-w-xl max-h-[92vh] overflow-y-auto shadow-2xl"
        onClick={(e) => e.stopPropagation()}
        role="dialog"
        aria-modal="true"
        aria-label="Create new post"
      >
        <div className="bg-primary-dark p-6 rounded-t-2xl flex items-center justify-between">
          <div>
            <h2 className="text-lg font-heading font-bold text-white">Create a Post</h2>
            <p className="text-white/60 text-xs mt-0.5">Share with the Harding Secondary community</p>
          </div>
          <button
            onClick={onClose}
            className="w-9 h-9 rounded-xl bg-white/20 hover:bg-white/30 flex items-center justify-center text-white transition-all"
          >
            <FaTimes />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-5" noValidate>
          {/* Category */}
          <div>
            <label className="block text-xs font-bold text-neutral-500 uppercase tracking-wider mb-2">Category</label>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
              {CATEGORIES.filter((c) => c.id !== 'all').map((cat) => {
                const Icon = cat.Icon;
                return (
                  <button
                    type="button"
                    key={cat.id}
                    onClick={() => set('category', cat.id)}
                    className={`flex items-center gap-1.5 px-2 py-2 rounded-xl text-xs font-semibold border-2 transition-all ${
                      form.category === cat.id
                        ? 'border-primary bg-primary/5 text-primary'
                        : 'border-neutral-100 text-neutral-600 hover:border-neutral-300'
                    }`}
                  >
                    <Icon className="text-[10px] flex-shrink-0" />
                    <span className="truncate">{cat.label}</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Title */}
          <div>
            <label className="block text-xs font-bold text-neutral-500 uppercase tracking-wider mb-1.5">Post Title *</label>
            <input
              type="text"
              value={form.title}
              onChange={(e) => set('title', e.target.value)}
              placeholder="A clear, descriptive title for your post"
              maxLength={100}
              className={`w-full px-4 py-3 border rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary transition-all ${
                errors.title ? 'border-red-300 bg-red-50' : 'border-neutral-200'
              }`}
            />
            {errors.title && <p className="text-red-500 text-xs mt-1">{errors.title}</p>}
          </div>

          {/* Body */}
          <div>
            <label className="block text-xs font-bold text-neutral-500 uppercase tracking-wider mb-1.5">Message *</label>
            <textarea
              value={form.body}
              onChange={(e) => set('body', e.target.value)}
              placeholder="Write the details of your post here..."
              rows={5}
              maxLength={600}
              className={`w-full px-4 py-3 border rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary transition-all resize-none ${
                errors.body ? 'border-red-300 bg-red-50' : 'border-neutral-200'
              }`}
            />
            <div className="flex items-center justify-between mt-1">
              {errors.body ? <p className="text-red-500 text-xs">{errors.body}</p> : <span />}
              <p className="text-xs text-neutral-400">{form.body.length}/600</p>
            </div>
          </div>

          {/* Contact */}
          <div>
            <label className="block text-xs font-bold text-neutral-500 uppercase tracking-wider mb-1.5">Contact Info *</label>
            <input
              type="text"
              value={form.contact}
              onChange={(e) => set('contact', e.target.value)}
              placeholder="Phone number, email, or location (e.g., school office)"
              className={`w-full px-4 py-3 border rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary transition-all ${
                errors.contact ? 'border-red-300 bg-red-50' : 'border-neutral-200'
              }`}
            />
            {errors.contact && <p className="text-red-500 text-xs mt-1">{errors.contact}</p>}
          </div>

          {/* Author */}
          <div>
            <label className="block text-xs font-bold text-neutral-500 uppercase tracking-wider mb-1.5">Posted By *</label>
            <input
              type="text"
              value={form.author}
              onChange={(e) => set('author', e.target.value)}
              placeholder="Your name or role (e.g., Parent, Learner, SRC)"
              className={`w-full px-4 py-3 border rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary transition-all ${
                errors.author ? 'border-red-300 bg-red-50' : 'border-neutral-200'
              }`}
            />
            {errors.author && <p className="text-red-500 text-xs mt-1">{errors.author}</p>}
          </div>

          <p className="text-xs text-neutral-400 bg-neutral-50 rounded-xl p-3">
            By posting, you agree that your content is respectful and appropriate for the school community. Posts may be removed by administration if they violate school guidelines.
          </p>

          <div className="flex gap-3 pt-2">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 py-3 border border-neutral-200 text-neutral-600 rounded-xl text-sm font-semibold hover:bg-neutral-50 transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="flex-1 py-3 bg-primary text-white rounded-xl text-sm font-semibold hover:bg-primary-dark transition-colors shadow-sm"
            >
              Post to Noticeboard
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

// ─── Main Page ─────────────────────────────────────────────────────────────────

const CommunityNoticeboard = () => {
  const [posts, setPosts] = useState(loadPosts);
  const [activeCategory, setActiveCategory] = useState('all');
  const [search, setSearch] = useState('');
  const [showModal, setShowModal] = useState(false);

  useEffect(() => { savePosts(posts); }, [posts]);

  const filtered = useMemo(() => {
    let result = posts;
    if (activeCategory !== 'all') result = result.filter((p) => p.category === activeCategory);
    if (search) {
      const q = search.toLowerCase();
      result = result.filter((p) =>
        p.title.toLowerCase().includes(q) ||
        p.body.toLowerCase().includes(q) ||
        p.author.toLowerCase().includes(q)
      );
    }
    return result.sort((a, b) => {
      if (a.pinned && !b.pinned) return -1;
      if (!a.pinned && b.pinned) return 1;
      return new Date(b.date) - new Date(a.date);
    });
  }, [posts, activeCategory, search]);

  const handleLike = (id) => {
    setPosts((prev) => prev.map((p) => p.id === id ? { ...p, likes: p.likes + 1 } : p));
  };

  const handleDelete = (id) => {
    if (window.confirm('Remove this post?')) {
      setPosts((prev) => prev.filter((p) => p.id !== id));
    }
  };

  const handleCreate = (post) => {
    setPosts((prev) => [post, ...prev]);
    setShowModal(false);
  };

  const counts = useMemo(() => {
    const map = {};
    posts.forEach((p) => { map[p.category] = (map[p.category] || 0) + 1; });
    return map;
  }, [posts]);

  return (
    <>
      <SEO
        title="Community Noticeboard | Harding Secondary School"
        description="The Harding Secondary School community noticeboard — post announcements, find lost items, arrange rides, sell items, and connect with the school community."
      />
      <div>
        <div className="bg-white">
          <Breadcrumbs />
        </div>

        {/* Hero */}
        <section className="relative py-24 md:py-32 text-center overflow-hidden bg-primary-dark">
          <img
            src={HERO_IMAGES.campus}
            alt=""
            className="absolute inset-0 w-full h-full object-cover"
            aria-hidden="true"
          />
          <div className="absolute inset-0 bg-primary-dark/87" />
          <div className="relative z-10 container-custom">
            <div className="inline-flex items-center gap-2 bg-white/10 border border-white/20 rounded-full px-4 py-1.5 text-accent-neon text-sm font-semibold tracking-widest uppercase mb-5">
              <FaBullhorn className="text-xs" />
              Student Portal — Community
            </div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-heading font-bold !text-white mb-4">
              Community Noticeboard
            </h1>
            <p className="text-lg md:text-xl max-w-2xl mx-auto !text-white/85">
              Connect with the Harding Secondary community — post announcements, find lost items, arrange transport, and more.
            </p>

            <div className="flex flex-wrap justify-center gap-6 mt-10">
              {[
                { label: 'Active Posts', value: posts.length },
                { label: 'Categories', value: CATEGORIES.length - 1 },
                { label: 'Community Members', value: '700+' },
              ].map(({ label, value }) => (
                <div key={label} className="text-center">
                  <p className="text-2xl font-heading font-bold text-accent-neon">{value}</p>
                  <p className="text-white/60 text-xs uppercase tracking-wider mt-0.5">{label}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Main */}
        <div className="bg-neutral-50 min-h-screen">
          <div className="container-custom py-10 md:py-16">

            {/* Top action bar */}
            <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between mb-8">
              <div className="relative flex-1 max-w-md">
                <FaSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-neutral-400 text-sm" />
                <input
                  type="text"
                  placeholder="Search posts..."
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  className="w-full pl-10 pr-10 py-3 bg-white border border-neutral-200 rounded-2xl text-sm focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary shadow-sm"
                />
                {search && (
                  <button onClick={() => setSearch('')} className="absolute right-4 top-1/2 -translate-y-1/2 text-neutral-400 hover:text-neutral-600">
                    <FaTimes />
                  </button>
                )}
              </div>

              <button
                onClick={() => setShowModal(true)}
                className="flex items-center gap-2 px-5 py-3 bg-primary text-white rounded-xl text-sm font-semibold hover:bg-primary-dark transition-colors shadow-sm flex-shrink-0"
              >
                <FaPlus className="text-xs" />
                Post to Noticeboard
              </button>
            </div>

            <div className="flex flex-col lg:flex-row gap-8 items-start">

              {/* Sidebar — Category filters */}
              <aside className="w-full lg:w-64 flex-shrink-0 lg:sticky lg:top-[120px]">
                <div className="bg-white rounded-2xl border border-neutral-100 shadow-sm p-5">
                  <div className="flex items-center gap-2 mb-4">
                    <FaFilter className="text-primary text-sm" />
                    <span className="font-heading font-bold text-neutral-800 text-sm">Categories</span>
                  </div>
                  <div className="space-y-1">
                    {CATEGORIES.map((cat) => {
                      const Icon = cat.Icon;
                      const count = cat.id === 'all' ? posts.length : (counts[cat.id] || 0);
                      return (
                        <button
                          key={cat.id}
                          onClick={() => setActiveCategory(cat.id)}
                          className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-colors text-left ${
                            activeCategory === cat.id
                              ? 'bg-primary/8 text-primary font-semibold'
                              : 'text-neutral-600 hover:bg-neutral-50'
                          }`}
                        >
                          <Icon className="text-xs flex-shrink-0" style={{ color: activeCategory === cat.id ? undefined : cat.color }} />
                          <span className="flex-1">{cat.label}</span>
                          {count > 0 && (
                            <span className="text-[10px] font-bold text-neutral-400 bg-neutral-100 rounded-full px-1.5 py-0.5">
                              {count}
                            </span>
                          )}
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* Community guidelines */}
                <div className="mt-4 bg-amber-50 border border-amber-200 rounded-2xl p-4">
                  <p className="text-xs font-bold text-amber-800 mb-1.5">Community Guidelines</p>
                  <ul className="text-xs text-amber-700 space-y-1">
                    <li>• Keep posts respectful and appropriate</li>
                    <li>• No spam or duplicate posts</li>
                    <li>• Include accurate contact information</li>
                    <li>• Posts visible for 30 days</li>
                  </ul>
                </div>
              </aside>

              {/* Posts feed */}
              <div className="flex-1 min-w-0 space-y-4">
                {filtered.length === 0 ? (
                  <AnimateOnScroll animation="fade">
                    <div className="bg-white rounded-2xl border border-neutral-100 p-12 text-center">
                      <FaBullhorn className="text-4xl text-neutral-300 mx-auto mb-4" />
                      <h3 className="font-heading font-bold text-neutral-700 mb-2">No posts found</h3>
                      <p className="text-neutral-400 text-sm mb-4">
                        {search ? 'Try different search terms.' : 'Be the first to post in this category!'}
                      </p>
                      <button
                        onClick={() => setShowModal(true)}
                        className="inline-flex items-center gap-2 px-5 py-2.5 bg-primary text-white rounded-xl text-sm font-semibold hover:bg-primary-dark transition-colors"
                      >
                        <FaPlus className="text-xs" />
                        Create First Post
                      </button>
                    </div>
                  </AnimateOnScroll>
                ) : (
                  filtered.map((post, i) => (
                    <AnimateOnScroll key={post.id} animation="slide-up" delay={i < 4 ? i * 50 : 0}>
                      <PostCard post={post} onLike={handleLike} onDelete={handleDelete} />
                    </AnimateOnScroll>
                  ))
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      {showModal && <CreatePostModal onClose={() => setShowModal(false)} onSubmit={handleCreate} />}
    </>
  );
};

export default CommunityNoticeboard;
