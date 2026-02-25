    import React, { useState } from 'react';
    import { Trash2, Mail, Calendar, Inbox, TrendingUp, RefreshCw, Search, ChevronRight, AlertCircle, Lock, Eye, EyeOff } from 'lucide-react';

    const BACKEND = 'https://portfolio-backend-rl0z.onrender.com';

    const Admin = () => {
    const [messages, setMessages] = useState([]);
    const [selected, setSelected] = useState(null);
    const [search, setSearch] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [deleting, setDeleting] = useState(null);
    const [key, setKey] = useState('');
    const [keyInput, setKeyInput] = useState('');
    const [showKey, setShowKey] = useState(false);
    const [authed, setAuthed] = useState(false);

    const fetchMessages = (adminKey) => {
        setLoading(true);
        setError('');
        fetch(`${BACKEND}/api/contact?key=${adminKey}`)
        .then(res => {
            if (!res.ok) throw new Error('Unauthorized — wrong key or server error');
            return res.json();
        })
        .then(data => {
            setMessages(Array.isArray(data) ? data : data.messages || []);
            setAuthed(true);
            setLoading(false);
        })
        .catch(err => {
            setError(err.message);
            setAuthed(false);
            setLoading(false);
        });
    };

    const handleLogin = (e) => {
        e.preventDefault();
        setKey(keyInput);
        fetchMessages(keyInput);
    };

    const handleLogout = () => {
        setKey(''); setKeyInput(''); setAuthed(false);
        setMessages([]); setSelected(null); setError('');
    };

    const today = new Date().toLocaleDateString();
    const messagesToday = messages.filter(m => new Date(m.createdAt).toLocaleDateString() === today).length;
    const thisWeek = messages.filter(m => (new Date() - new Date(m.createdAt)) / 86400000 <= 7).length;

    const deleteMessage = (id) => {
        if (!window.confirm('Delete this message permanently?')) return;
        setDeleting(id);
        fetch(`${BACKEND}/api/contact/delete/${id}?key=${key}`, { method: 'DELETE' })
        .then(() => {
            setMessages(prev => prev.filter(m => m._id !== id));
            if (selected?._id === id) setSelected(null);
            setDeleting(null);
        })
        .catch(() => setDeleting(null));
    };

    const filtered = messages.filter(m =>
        m.name?.toLowerCase().includes(search.toLowerCase()) ||
        m.email?.toLowerCase().includes(search.toLowerCase()) ||
        m.message?.toLowerCase().includes(search.toLowerCase())
    );

    const formatDate = (str) => !str ? '—' : new Date(str).toLocaleString('en-GB', {
        day: 'numeric', month: 'short', year: 'numeric', hour: '2-digit', minute: '2-digit'
    });

    const timeAgo = (str) => {
        if (!str) return '';
        const s = (new Date() - new Date(str)) / 1000;
        if (s < 60) return 'just now';
        if (s < 3600) return `${Math.floor(s / 60)}m ago`;
        if (s < 86400) return `${Math.floor(s / 3600)}h ago`;
        return `${Math.floor(s / 86400)}d ago`;
    };

    const getInitials = (name) => name?.split(' ').map(n => n[0]).slice(0, 2).join('').toUpperCase() || '?';
    const palette = ['#3b82f6', '#8b5cf6', '#ec4899', '#f97316', '#10b981', '#06b6d4'];
    const getColor = (name) => palette[(name?.charCodeAt(0) || 0) % palette.length];

    const base = {
        minHeight: '100vh',
        background: 'linear-gradient(135deg, #0f0f1a 0%, #1a1a2e 50%, #0f0f1a 100%)',
        fontFamily: "'Segoe UI', sans-serif",
        color: '#e2e8f0'
    };

    // LOGIN
    if (!authed) return (
        <div style={{ ...base, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '20px' }}>
        <style>{`input::placeholder{color:#475569}*{box-sizing:border-box}`}</style>
        <div style={{ width: '100%', maxWidth: '380px' }}>
            <div style={{ textAlign: 'center', marginBottom: '32px' }}>
            <div style={{
                width: '56px', height: '56px', borderRadius: '16px',
                background: 'linear-gradient(135deg, #3b82f6, #8b5cf6)',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                margin: '0 auto 16px', boxShadow: '0 0 40px rgba(99,102,241,0.35)'
            }}><Lock size={24} color="white" /></div>
            <h1 style={{ color: '#f8fafc', fontSize: '22px', fontWeight: '800', margin: '0 0 6px' }}>Admin Access</h1>
            <p style={{ color: '#64748b', fontSize: '13px', margin: 0 }}>Enter your admin key to view messages</p>
            </div>
            <form onSubmit={handleLogin}>
            <div style={{ position: 'relative', marginBottom: '12px' }}>
                <input
                type={showKey ? 'text' : 'password'}
                placeholder="Enter admin key..."
                value={keyInput}
                onChange={e => setKeyInput(e.target.value)}
                required
                style={{
                    width: '100%', padding: '12px 44px 12px 16px',
                    background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)',
                    borderRadius: '10px', color: '#f1f5f9', fontSize: '14px', outline: 'none'
                }}
                />
                <button type="button" onClick={() => setShowKey(!showKey)} style={{
                position: 'absolute', right: '12px', top: '50%', transform: 'translateY(-50%)',
                background: 'none', border: 'none', cursor: 'pointer', color: '#475569', padding: 0
                }}>
                {showKey ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>
            </div>
            {error && (
                <div style={{
                display: 'flex', alignItems: 'center', gap: '8px',
                background: 'rgba(239,68,68,0.1)', border: '1px solid rgba(239,68,68,0.3)',
                borderRadius: '8px', padding: '10px 14px', marginBottom: '12px',
                color: '#fca5a5', fontSize: '13px'
                }}><AlertCircle size={14} />{error}</div>
            )}
            <button type="submit" disabled={loading || !keyInput} style={{
                width: '100%', padding: '12px', border: 'none', borderRadius: '10px',
                background: 'linear-gradient(135deg, #3b82f6, #6366f1)',
                color: 'white', fontWeight: '700', fontSize: '14px',
                cursor: loading || !keyInput ? 'not-allowed' : 'pointer',
                opacity: loading || !keyInput ? 0.6 : 1,
                boxShadow: '0 4px 20px rgba(59,130,246,0.3)'
            }}>
                {loading ? 'Connecting...' : 'Access Dashboard'}
            </button>
            </form>
        </div>
        </div>
    );

    // DASHBOARD
    return (
        <div style={base}>
        <style>{`
            @keyframes spin{from{transform:rotate(0deg)}to{transform:rotate(360deg)}}
            input::placeholder{color:#475569} *{box-sizing:border-box}
            ::-webkit-scrollbar{width:4px}
            ::-webkit-scrollbar-thumb{background:rgba(255,255,255,0.1);border-radius:4px}
        `}</style>

        <header style={{
            borderBottom: '1px solid rgba(255,255,255,0.06)', padding: '0 28px', height: '64px',
            display: 'flex', alignItems: 'center', justifyContent: 'space-between',
            background: 'rgba(255,255,255,0.02)', backdropFilter: 'blur(12px)',
            position: 'sticky', top: 0, zIndex: 10
        }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <div style={{
                width: '36px', height: '36px', borderRadius: '10px',
                background: 'linear-gradient(135deg, #3b82f6, #8b5cf6)',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                fontWeight: '800', color: 'white', fontSize: '16px'
            }}>B</div>
            <div>
                <div style={{ fontWeight: '700', fontSize: '15px', lineHeight: 1 }}>Benjamin's Inbox</div>
                <div style={{ fontSize: '11px', color: '#64748b', marginTop: '2px' }}>Admin Dashboard</div>
            </div>
            </div>
            <div style={{ display: 'flex', gap: '8px' }}>
            <button onClick={() => fetchMessages(key)} style={{
                display: 'flex', alignItems: 'center', gap: '6px', padding: '7px 14px', borderRadius: '8px',
                background: 'rgba(59,130,246,0.15)', border: '1px solid rgba(59,130,246,0.3)',
                color: '#93c5fd', cursor: 'pointer', fontSize: '13px', fontWeight: '500'
            }}>
                <RefreshCw size={13} style={{ animation: loading ? 'spin 1s linear infinite' : 'none' }} />
                Refresh
            </button>
            <button onClick={handleLogout} style={{
                padding: '7px 14px', borderRadius: '8px',
                background: 'rgba(239,68,68,0.1)', border: '1px solid rgba(239,68,68,0.25)',
                color: '#f87171', cursor: 'pointer', fontSize: '13px', fontWeight: '500'
            }}>Logout</button>
            </div>
        </header>

        <div style={{ padding: '28px', maxWidth: '1300px', margin: '0 auto' }}>
            {/* Stats */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: '16px', marginBottom: '28px' }}>
            {[
                { label: 'Total Messages', value: messages.length, icon: <Inbox size={18} />, color: '#3b82f6', glow: 'rgba(59,130,246,0.2)' },
                { label: 'Received Today', value: messagesToday, icon: <Calendar size={18} />, color: '#f59e0b', glow: 'rgba(245,158,11,0.2)' },
                { label: 'This Week', value: thisWeek, icon: <TrendingUp size={18} />, color: '#10b981', glow: 'rgba(16,185,129,0.2)' },
            ].map((s, i) => (
                <div key={i} style={{
                background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.07)',
                borderRadius: '14px', padding: '20px 24px', display: 'flex', alignItems: 'center', gap: '16px',
                boxShadow: `0 0 30px ${s.glow}`
                }}>
                <div style={{
                    width: '44px', height: '44px', borderRadius: '12px',
                    background: `${s.color}20`, border: `1px solid ${s.color}40`,
                    display: 'flex', alignItems: 'center', justifyContent: 'center', color: s.color, flexShrink: 0
                }}>{s.icon}</div>
                <div>
                    <div style={{ fontSize: '28px', fontWeight: '800', lineHeight: 1, color: '#f8fafc' }}>{loading ? '—' : s.value}</div>
                    <div style={{ fontSize: '12px', color: '#64748b', marginTop: '3px' }}>{s.label}</div>
                </div>
                </div>
            ))}
            </div>

            {/* Panel */}
            <div style={{
            display: 'grid', gridTemplateColumns: '360px 1fr',
            background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.07)',
            borderRadius: '16px', overflow: 'hidden', minHeight: '520px'
            }}>
            {/* List */}
            <div style={{ borderRight: '1px solid rgba(255,255,255,0.07)', display: 'flex', flexDirection: 'column' }}>
                <div style={{ padding: '16px', borderBottom: '1px solid rgba(255,255,255,0.06)' }}>
                <div style={{ position: 'relative' }}>
                    <Search size={14} style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', color: '#475569' }} />
                    <input
                    type="text" placeholder="Search messages..." value={search}
                    onChange={e => setSearch(e.target.value)}
                    style={{
                        width: '100%', padding: '8px 12px 8px 34px',
                        background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.08)',
                        borderRadius: '8px', color: '#e2e8f0', fontSize: '13px', outline: 'none'
                    }}
                    />
                </div>
                </div>
                <div style={{ overflowY: 'auto', flex: 1 }}>
                {loading ? (
                    <div style={{ padding: '40px', textAlign: 'center', color: '#475569' }}>
                    <RefreshCw size={24} style={{ animation: 'spin 1s linear infinite', margin: '0 auto 10px', display: 'block' }} />
                    Loading...
                    </div>
                ) : filtered.length === 0 ? (
                    <div style={{ padding: '40px', textAlign: 'center', color: '#475569' }}>
                    <Inbox size={32} style={{ margin: '0 auto 10px', display: 'block', opacity: 0.3 }} />
                    {search ? 'No results' : 'No messages yet'}
                    </div>
                ) : filtered.map(msg => (
                    <div key={msg._id} onClick={() => setSelected(msg)} style={{
                    padding: '14px 16px', borderBottom: '1px solid rgba(255,255,255,0.04)',
                    cursor: 'pointer',
                    background: selected?._id === msg._id ? 'rgba(59,130,246,0.12)' : 'transparent',
                    borderLeft: selected?._id === msg._id ? '3px solid #3b82f6' : '3px solid transparent',
                    display: 'flex', alignItems: 'flex-start', gap: '12px'
                    }}>
                    <div style={{
                        width: '36px', height: '36px', borderRadius: '50%', background: getColor(msg.name),
                        display: 'flex', alignItems: 'center', justifyContent: 'center',
                        fontSize: '12px', fontWeight: '700', color: 'white', flexShrink: 0, marginTop: '2px'
                    }}>{getInitials(msg.name)}</div>
                    <div style={{ flex: 1, minWidth: 0 }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '3px' }}>
                        <span style={{ fontWeight: '600', fontSize: '13px', color: '#f1f5f9', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{msg.name}</span>
                        <span style={{ fontSize: '10px', color: '#475569', flexShrink: 0, marginLeft: '8px' }}>{timeAgo(msg.createdAt)}</span>
                        </div>
                        <div style={{ fontSize: '11px', color: '#3b82f6', marginBottom: '4px', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{msg.email}</div>
                        <div style={{ fontSize: '12px', color: '#64748b', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{msg.message}</div>
                    </div>
                    <ChevronRight size={14} style={{ color: '#334155', flexShrink: 0, marginTop: '8px' }} />
                    </div>
                ))}
                </div>
            </div>

            {/* Detail */}
            <div style={{ display: 'flex', flexDirection: 'column' }}>
                {selected ? (
                <div style={{ padding: '32px' }}>
                    <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', marginBottom: '28px' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
                        <div style={{
                        width: '52px', height: '52px', borderRadius: '50%', background: getColor(selected.name),
                        display: 'flex', alignItems: 'center', justifyContent: 'center',
                        fontSize: '18px', fontWeight: '700', color: 'white'
                        }}>{getInitials(selected.name)}</div>
                        <div>
                        <h2 style={{ fontSize: '20px', fontWeight: '700', color: '#f8fafc', margin: 0 }}>{selected.name}</h2>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '6px', marginTop: '4px' }}>
                            <Mail size={12} style={{ color: '#3b82f6' }} />
                            <span style={{ fontSize: '13px', color: '#3b82f6' }}>{selected.email}</span>
                        </div>
                        </div>
                    </div>
                    <button onClick={() => deleteMessage(selected._id)} disabled={deleting === selected._id} style={{
                        display: 'flex', alignItems: 'center', gap: '6px', padding: '8px 14px', borderRadius: '8px',
                        background: 'rgba(239,68,68,0.1)', border: '1px solid rgba(239,68,68,0.25)',
                        color: '#f87171', cursor: 'pointer', fontSize: '13px',
                        opacity: deleting === selected._id ? 0.5 : 1
                    }}>
                        <Trash2 size={14} />
                        {deleting === selected._id ? 'Deleting...' : 'Delete'}
                    </button>
                    </div>
                    <div style={{
                    display: 'inline-flex', alignItems: 'center', gap: '6px', padding: '5px 12px',
                    borderRadius: '20px', background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.07)',
                    fontSize: '12px', color: '#64748b', marginBottom: '24px'
                    }}>
                    <Calendar size={12} />{formatDate(selected.createdAt)}
                    </div>
                    <div style={{
                    background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.07)',
                    borderRadius: '12px', padding: '24px', lineHeight: '1.8',
                    fontSize: '15px', color: '#cbd5e1', whiteSpace: 'pre-wrap', marginBottom: '24px'
                    }}>{selected.message}</div>
                    <a href={`mailto:${selected.email}?subject=Re: Your message&body=Hi ${selected.name},%0A%0A`} style={{
                    display: 'inline-flex', alignItems: 'center', gap: '8px', padding: '10px 20px',
                    borderRadius: '9px', background: 'linear-gradient(135deg, #3b82f6, #6366f1)',
                    color: 'white', textDecoration: 'none', fontWeight: '600', fontSize: '14px',
                    boxShadow: '0 4px 20px rgba(59,130,246,0.3)'
                    }}>
                    <Mail size={15} />Reply to {selected.name.split(' ')[0]}
                    </a>
                </div>
                ) : (
                <div style={{
                    flex: 1, display: 'flex', flexDirection: 'column',
                    alignItems: 'center', justifyContent: 'center',
                    color: '#334155', textAlign: 'center', padding: '40px'
                }}>
                    <Inbox size={48} style={{ marginBottom: '16px', opacity: 0.2 }} />
                    <p style={{ fontWeight: '600', fontSize: '16px', margin: 0 }}>Select a message</p>
                    <p style={{ fontSize: '13px', marginTop: '6px', opacity: 0.7 }}>Click any message on the left to read it</p>
                </div>
                )}
            </div>
            </div>
        </div>
        </div>
    );
    };

    export default Admin;