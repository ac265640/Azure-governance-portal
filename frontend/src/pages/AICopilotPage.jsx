// src/pages/AICopilotPage.jsx
import React, { useState, useRef, useEffect } from 'react';
import {
  Box, Typography, Card, CardContent, TextField, IconButton,
  Avatar, Chip, CircularProgress, Divider, Paper,
} from '@mui/material';
import SendIcon from '@mui/icons-material/Send';
import SmartToyIcon from '@mui/icons-material/SmartToy';
import PersonIcon from '@mui/icons-material/Person';
import AutoAwesomeIcon from '@mui/icons-material/AutoAwesome';
import AppLayout from '../components/layout/AppLayout';
import aiService from '../services/aiService';
import ReactMarkdown from 'react-markdown';

const EXAMPLE_PROMPTS = [
  'Show idle resources',
  'List all VMs',
  'Recommend reclamation candidates',
  'Generate governance report',
];

const TypingIndicator = () => (
  <Box sx={{ display: 'flex', gap: 0.5, alignItems: 'center', py: 0.5 }}>
    {[0, 1, 2].map(i => (
      <Box
        key={i}
        sx={{
          width: 7, height: 7, borderRadius: '50%',
          background: '#0078D4',
          animation: 'bounce 1.2s infinite',
          animationDelay: `${i * 0.2}s`,
          '@keyframes bounce': {
            '0%, 80%, 100%': { transform: 'scale(0.8)', opacity: 0.5 },
            '40%': { transform: 'scale(1.2)', opacity: 1 },
          },
        }}
      />
    ))}
  </Box>
);

const MessageBubble = ({ msg }) => {
  const isAI = msg.role === 'ai';
  return (
    <Box sx={{ display: 'flex', gap: 1.5, mb: 2.5, flexDirection: isAI ? 'row' : 'row-reverse' }}>
      <Avatar
        sx={{
          width: 34, height: 34, flexShrink: 0,
          background: isAI ? 'linear-gradient(135deg, #0078D4, #50E6FF)' : 'linear-gradient(135deg, #003366, #0078D4)',
          mt: 0.5,
        }}
      >
        {isAI ? <SmartToyIcon sx={{ fontSize: 18 }} /> : <PersonIcon sx={{ fontSize: 18 }} />}
      </Avatar>
      <Box sx={{ maxWidth: '72%' }}>
        <Typography variant="caption" sx={{ color: 'rgba(255,255,255,0.35)', mb: 0.5, display: 'block', textAlign: isAI ? 'left' : 'right', px: 0.5 }}>
          {isAI ? 'Azure Copilot' : 'You'} · {msg.time}
        </Typography>
        <Paper
          sx={{
            p: 1.8,
            background: isAI
              ? 'linear-gradient(145deg, rgba(0,120,212,0.12), rgba(0,120,212,0.06))'
              : 'linear-gradient(145deg, rgba(0,51,102,0.4), rgba(0,51,102,0.25))',
            border: isAI ? '1px solid rgba(0,120,212,0.25)' : '1px solid rgba(0,51,102,0.4)',
            borderRadius: isAI ? '4px 12px 12px 12px' : '12px 4px 12px 12px',
          }}
        >
          {msg.typing ? (
            <TypingIndicator />
          ) : (
            <Box
              sx={{
                '& p': { m: 0, mb: 1, color: 'rgba(255,255,255,0.85)', fontSize: '0.88rem', lineHeight: 1.6 },
                '& p:last-child': { mb: 0 },
                '& h2': { color: '#50E6FF', fontSize: '1rem', fontWeight: 700, mt: 1, mb: 0.5 },
                '& h3': { color: '#50E6FF', fontSize: '0.9rem', fontWeight: 600, mt: 1, mb: 0.5 },
                '& ul, & ol': { pl: 2, mb: 1, color: 'rgba(255,255,255,0.75)', fontSize: '0.88rem' },
                '& li': { mb: 0.5 },
                '& strong': { color: '#F3F2F1', fontWeight: 700 },
                '& table': { width: '100%', borderCollapse: 'collapse', fontSize: '0.8rem', mt: 1 },
                '& th': { background: 'rgba(0,120,212,0.2)', color: '#50E6FF', p: '6px 10px', textAlign: 'left', border: '1px solid rgba(0,120,212,0.2)' },
                '& td': { p: '5px 10px', color: 'rgba(255,255,255,0.75)', border: '1px solid rgba(255,255,255,0.06)' },
              }}
            >
              <ReactMarkdown>{msg.content}</ReactMarkdown>
            </Box>
          )}
        </Paper>
      </Box>
    </Box>
  );
};

const WELCOME_MSG = {
  role: 'ai',
  content: `## Welcome to Azure Copilot! 👋\n\nI'm your AI assistant for Azure resource governance. I can help you:\n\n- **Query resources** across your subscriptions\n- **Identify idle** or underutilized resources\n- **Recommend** reclamation candidates\n- **Generate** governance reports\n\nTry one of the example prompts below or ask me anything about your Azure environment.`,
  time: 'Now',
  id: 0,
};

const AICopilotPage = () => {
  const [messages, setMessages] = useState([WELCOME_MSG]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const bottomRef = useRef(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const sendMessage = async (text) => {
    const userText = (text || input).trim();
    if (!userText) return;
    setInput('');

    const now = new Date().toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' });

    // Add user message
    setMessages(prev => [...prev, { role: 'user', content: userText, time: now, id: Date.now() }]);

    // Show typing indicator
    const typingId = Date.now() + 1;
    setMessages(prev => [...prev, { role: 'ai', content: '', typing: true, time: now, id: typingId }]);
    setLoading(true);

    try {
      const res = await aiService.chat(userText);
      const responseText = res.data?.response || 'I could not process that request.';

      setMessages(prev => prev.map(m =>
        m.id === typingId
          ? { role: 'ai', content: responseText, time: now, id: typingId }
          : m
      ));
    } catch {
      setMessages(prev => prev.map(m =>
        m.id === typingId
          ? { role: 'ai', content: 'Sorry, I encountered an error. Please try again.', time: now, id: typingId }
          : m
      ));
    } finally {
      setLoading(false);
    }
  };

  return (
    <AppLayout pageTitle="AI Copilot">
      <Box sx={{ display: 'flex', flexDirection: 'column', height: 'calc(100vh - 120px)' }}>
        {/* Header */}
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 2.5 }}>
          <Box sx={{ width: 44, height: 44, borderRadius: 2, background: 'linear-gradient(135deg, #0078D4, #50E6FF)', display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 0 20px rgba(0,120,212,0.4)' }}>
            <SmartToyIcon sx={{ color: 'white', fontSize: 24 }} />
          </Box>
          <Box>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
              <Typography variant="h5" fontWeight={700}>Azure Copilot</Typography>
              <Chip icon={<AutoAwesomeIcon sx={{ fontSize: '14px !important' }} />} label="AI Powered" size="small" sx={{ background: 'linear-gradient(135deg, rgba(0,120,212,0.2), rgba(80,230,255,0.1))', color: '#50E6FF', border: '1px solid rgba(80,230,255,0.25)', fontSize: '0.72rem' }} />
            </Box>
            <Typography variant="body2" sx={{ color: 'rgba(255,255,255,0.45)' }}>
              Your intelligent Azure governance assistant
            </Typography>
          </Box>
        </Box>

        <Card sx={{ flex: 1, display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>
          {/* Chat History */}
          <Box sx={{ flex: 1, overflowY: 'auto', p: 2.5 }}>
            {messages.map(msg => <MessageBubble key={msg.id} msg={msg} />)}
            <div ref={bottomRef} />
          </Box>

          <Divider sx={{ borderColor: 'rgba(0,120,212,0.15)' }} />

          {/* Example Prompts */}
          <Box sx={{ px: 2.5, pt: 1.5, pb: 1 }}>
            <Typography variant="caption" sx={{ color: 'rgba(255,255,255,0.3)', mr: 1 }}>Try:</Typography>
            {EXAMPLE_PROMPTS.map(p => (
              <Chip
                key={p} label={p} size="small" clickable
                onClick={() => sendMessage(p)}
                disabled={loading}
                sx={{
                  mr: 0.8, mb: 0.5, fontSize: '0.73rem', cursor: 'pointer',
                  background: 'rgba(0,120,212,0.1)', color: 'rgba(255,255,255,0.6)',
                  border: '1px solid rgba(0,120,212,0.2)',
                  '&:hover': { background: 'rgba(0,120,212,0.2)', color: '#F3F2F1', border: '1px solid rgba(0,120,212,0.4)' },
                }}
              />
            ))}
          </Box>

          {/* Input Area */}
          <Box sx={{ p: 2, pt: 1, display: 'flex', gap: 1.5, alignItems: 'flex-end' }}>
            <TextField
              fullWidth
              multiline maxRows={4}
              placeholder="Ask about your Azure resources, governance status, recommendations..."
              value={input}
              onChange={e => setInput(e.target.value)}
              onKeyDown={e => { if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); sendMessage(); } }}
              size="small"
              disabled={loading}
              sx={{
                '& .MuiOutlinedInput-root': {
                  background: 'rgba(0,120,212,0.04)',
                  '&.Mui-focused fieldset': { borderColor: '#0078D4', boxShadow: '0 0 8px rgba(0,120,212,0.2)' },
                },
              }}
            />
            <IconButton
              onClick={() => sendMessage()}
              disabled={loading || !input.trim()}
              sx={{
                width: 44, height: 44, flexShrink: 0,
                background: loading || !input.trim() ? 'rgba(255,255,255,0.04)' : 'linear-gradient(135deg, #0078D4, #005A9E)',
                border: '1px solid rgba(0,120,212,0.3)',
                '&:hover': { background: 'linear-gradient(135deg, #2B9FEB, #0078D4)', boxShadow: '0 4px 16px rgba(0,120,212,0.4)' },
                transition: 'all 0.2s',
              }}
            >
              {loading ? <CircularProgress size={18} sx={{ color: '#0078D4' }} /> : <SendIcon sx={{ color: 'white', fontSize: 20 }} />}
            </IconButton>
          </Box>
        </Card>
      </Box>
    </AppLayout>
  );
};

export default AICopilotPage;
