import React, { useState, useRef, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { 
  Sparkles, 
  Send, 
  X, 
  MessageCircle, 
  ShoppingBag, 
  ArrowRight, 
  RefreshCw, 
  ChevronRight,
  ExternalLink,
  MapPin,
  Clock,
  Phone
} from 'lucide-react';
import { useShop } from '../context/ShopContext';

export default function AiAssistant() {
  const [isOpen, setIsOpen] = useState(false);
  const [inputMessage, setInputMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const { addToCart, showToast, settings } = useShop();
  const navigate = useNavigate();
  const messagesEndRef = useRef(null);
  const inputRef = useRef(null);

  const initialGreeting = {
    id: 'msg_welcome',
    sender: 'bot',
    text: `Vanakkam! ✨ I am **Haritha**, your personal AI fashion stylist at Harithanjali Boutique, Salem.\n\nWhether you need festive Kanjivaram silk recommendations, matching blouse advice, or boutique store timings, I'm here to help you look your absolute best!`,
    suggestions: [
      '👗 Reception Silk Sarees',
      '✨ Trending Festive Co-ord Sets',
      '💰 Best Designs under ₹5,000',
      '📍 Salem Boutique Location & Timing',
      '📏 Custom Blouse Stitching'
    ],
    products: []
  };

  const [messages, setMessages] = useState(() => {
    try {
      const saved = sessionStorage.getItem('hb_ai_chat');
      return saved ? JSON.parse(saved) : [initialGreeting];
    } catch (e) {
      return [initialGreeting];
    }
  });

  // Save conversation to sessionStorage
  useEffect(() => {
    try {
      sessionStorage.setItem('hb_ai_chat', JSON.stringify(messages));
    } catch (e) {}
  }, [messages]);

  // Scroll to bottom on new message
  useEffect(() => {
    if (isOpen) {
      messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages, isOpen]);

  // Focus input when chat opens
  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 250);
    }
  }, [isOpen]);

  const handleSendMessage = async (textToSend) => {
    const query = (textToSend || inputMessage).trim();
    if (!query || isLoading) return;

    const userMessage = {
      id: `usr_${Date.now()}`,
      sender: 'user',
      text: query,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setMessages(prev => [...prev, userMessage]);
    setInputMessage('');
    setIsLoading(true);

    try {
      const res = await fetch('/api/ai/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: query })
      });

      const data = await res.json();

      if (data.success) {
        const botMessage = {
          id: `bot_${Date.now()}`,
          sender: 'bot',
          text: data.reply,
          products: data.products || [],
          suggestions: data.suggestions || [
            'Explore Sarees',
            'Salem Store Address',
            'Chat on WhatsApp',
            'Designs under ₹5,000'
          ],
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
        };
        setMessages(prev => [...prev, botMessage]);
      } else {
        throw new Error(data.message || 'Service temporarily quiet');
      }
    } catch (err) {
      console.warn('AI Assistant error:', err);
      const fallbackMessage = {
        id: `bot_err_${Date.now()}`,
        sender: 'bot',
        text: `I'm happy to assist you! For instant live video looks or custom sizing, our Salem boutique styling team is always available directly on WhatsApp.`,
        suggestions: ['Chat on WhatsApp', 'Salem Store Address', 'Explore Festive Sarees'],
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };
      setMessages(prev => [...prev, fallbackMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleClearChat = () => {
    setMessages([initialGreeting]);
    sessionStorage.removeItem('hb_ai_chat');
    showToast('Chat history cleared');
  };

  const handleQuickAdd = (product, e) => {
    e.stopPropagation();
    addToCart(product, product.sizes?.[0], product.colors?.[0], 1);
  };

  const whatsappNumber = settings?.whatsappNumber || '918144052522';

  return (
    <>
      {/* Floating Launcher Button */}
      <div 
        className="ai-assistant-launcher"
        style={{
          position: 'fixed',
          bottom: '24px',
          right: '24px',
          zIndex: 99,
          display: 'flex',
          alignItems: 'center',
          gap: '0.6rem'
        }}
      >
        {!isOpen && (
          <div 
            onClick={() => setIsOpen(true)}
            className="ai-launcher-tooltip hide-mobile"
            style={{
              background: 'rgba(42, 5, 32, 0.94)',
              color: '#fff',
              padding: '0.45rem 0.9rem',
              borderRadius: 'var(--radius-full)',
              fontSize: '0.78rem',
              fontWeight: 600,
              boxShadow: 'var(--shadow-md)',
              border: '1px solid rgba(200, 157, 70, 0.4)',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '0.4rem',
              animation: 'floatGentle 3s ease-in-out infinite'
            }}
          >
            <Sparkles size={13} style={{ color: '#FFD700' }} />
            <span>Ask Haritha AI Stylist</span>
          </div>
        )}

        <button
          onClick={() => setIsOpen(!isOpen)}
          aria-label={isOpen ? 'Close AI Stylist Chat' : 'Open Haritha AI Stylist'}
          style={{
            width: '56px',
            height: '56px',
            borderRadius: '50%',
            background: 'linear-gradient(135deg, #581142 0%, #2a0520 100%)',
            border: '2px solid rgba(200, 157, 70, 0.65)',
            boxShadow: '0 6px 24px rgba(88, 17, 66, 0.45), 0 0 16px rgba(200, 157, 70, 0.35)',
            color: '#fff',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            cursor: 'pointer',
            transition: 'all 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275)',
            transform: isOpen ? 'rotate(90deg)' : 'scale(1)'
          }}
          onMouseEnter={e => e.currentTarget.style.transform = isOpen ? 'rotate(90deg) scale(1.08)' : 'scale(1.08)'}
          onMouseLeave={e => e.currentTarget.style.transform = isOpen ? 'rotate(90deg)' : 'scale(1)'}
        >
          {isOpen ? (
            <X size={24} style={{ color: '#FFD700' }} />
          ) : (
            <div style={{ position: 'relative', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <Sparkles size={24} style={{ color: '#FFD700' }} />
              <span 
                style={{
                  position: 'absolute',
                  top: -6,
                  right: -6,
                  width: 10,
                  height: 10,
                  borderRadius: '50%',
                  background: '#10b981',
                  border: '2px solid #2a0520'
                }} 
              />
            </div>
          )}
        </button>
      </div>

      {/* Floating AI Chat Window */}
      {isOpen && (
        <div 
          className="ai-chat-window animate-fade-in"
          style={{
            position: 'fixed',
            bottom: '90px',
            right: '24px',
            width: '390px',
            maxWidth: 'calc(100vw - 24px)',
            height: '580px',
            maxHeight: 'calc(100vh - 120px)',
            borderRadius: '20px',
            background: '#ffffff',
            border: '1px solid rgba(200, 157, 70, 0.35)',
            boxShadow: '0 20px 50px rgba(42, 5, 32, 0.28), 0 0 25px rgba(200, 157, 70, 0.15)',
            display: 'flex',
            flexDirection: 'column',
            overflow: 'hidden',
            zIndex: 99
          }}
        >
          {/* Header */}
          <div 
            style={{
              padding: '1rem 1.2rem',
              background: 'linear-gradient(135deg, #3d082e 0%, #2a0520 100%)',
              color: '#fff',
              borderBottom: '1px solid rgba(200, 157, 70, 0.3)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between'
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
              <div style={{ position: 'relative' }}>
                <img 
                  src="/logo.png" 
                  alt="Haritha AI Stylist" 
                  style={{ width: '42px', height: '42px', borderRadius: '50%', objectFit: 'contain', background: '#fff', border: '1.5px solid #FFD700' }}
                />
                <span 
                  style={{
                    position: 'absolute',
                    bottom: 0,
                    right: 0,
                    width: 11,
                    height: 11,
                    borderRadius: '50%',
                    background: '#10b981',
                    border: '2px solid #2a0520'
                  }} 
                />
              </div>

              <div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.35rem' }}>
                  <h4 style={{ color: '#fff', fontSize: '1rem', margin: 0, fontFamily: 'var(--font-serif)', letterSpacing: '0.04em' }}>
                    Haritha AI Stylist
                  </h4>
                  <Sparkles size={13} style={{ color: '#FFD700' }} />
                </div>
                <div style={{ fontSize: '0.72rem', color: '#e6cddf', letterSpacing: '0.05em' }}>
                  Salem Boutique Personal Fashion Advisor
                </div>
              </div>
            </div>

            <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
              <button 
                onClick={handleClearChat}
                title="Reset Conversation"
                style={{
                  width: '32px',
                  height: '32px',
                  borderRadius: '50%',
                  background: 'rgba(255, 255, 255, 0.1)',
                  color: '#fff',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  cursor: 'pointer',
                  border: 'none'
                }}
              >
                <RefreshCw size={14} />
              </button>
              <button 
                onClick={() => setIsOpen(false)}
                title="Close Stylist Chat"
                style={{
                  width: '32px',
                  height: '32px',
                  borderRadius: '50%',
                  background: 'rgba(255, 255, 255, 0.1)',
                  color: '#fff',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  cursor: 'pointer',
                  border: 'none'
                }}
              >
                <X size={16} />
              </button>
            </div>
          </div>

          {/* Quick Notice Tag */}
          <div style={{
            background: '#faf3ea',
            padding: '0.4rem 1rem',
            borderBottom: '1px solid #f2e2d0',
            fontSize: '0.72rem',
            color: '#7a5a1f',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between'
          }}>
            <span>✨ Real-time catalog & Salem boutique guidance</span>
            <span style={{ fontWeight: 600, color: '#10b981' }}>● Online</span>
          </div>

          {/* Chat Messages Body */}
          <div 
            style={{
              flex: 1,
              overflowY: 'auto',
              padding: '1.2rem 1rem',
              background: '#fdf9f4',
              display: 'flex',
              flexDirection: 'column',
              gap: '1rem'
            }}
          >
            {messages.map((msg) => (
              <div 
                key={msg.id}
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: msg.sender === 'user' ? 'flex-end' : 'flex-start',
                  gap: '0.4rem'
                }}
              >
                {/* Bubble */}
                <div 
                  style={{
                    maxWidth: '85%',
                    padding: '0.85rem 1.1rem',
                    borderRadius: msg.sender === 'user' ? '18px 18px 4px 18px' : '18px 18px 18px 4px',
                    background: msg.sender === 'user' 
                      ? 'linear-gradient(135deg, #581142, #3d082e)' 
                      : '#ffffff',
                    color: msg.sender === 'user' ? '#ffffff' : '#2a0520',
                    boxShadow: msg.sender === 'user' ? '0 4px 14px rgba(88, 17, 66, 0.25)' : '0 2px 10px rgba(0, 0, 0, 0.05)',
                    border: msg.sender === 'user' ? 'none' : '1px solid #fae3ef',
                    fontSize: '0.88rem',
                    lineHeight: 1.55,
                    whiteSpace: 'pre-line'
                  }}
                >
                  {msg.text}
                </div>

                {/* Attached Recommended Products Carousel */}
                {msg.products && msg.products.length > 0 && (
                  <div style={{ width: '100%', marginTop: '0.4rem' }}>
                    <div style={{ fontSize: '0.72rem', fontWeight: 700, color: 'var(--purple-800)', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: '0.4rem' }}>
                      ✨ Recommended Boutique Designs:
                    </div>
                    <div 
                      style={{
                        display: 'flex',
                        gap: '0.6rem',
                        overflowX: 'auto',
                        paddingBottom: '0.4rem'
                      }}
                    >
                      {msg.products.map(p => (
                        <div 
                          key={p.id}
                          style={{
                            minWidth: '150px',
                            maxWidth: '150px',
                            background: '#ffffff',
                            borderRadius: '10px',
                            overflow: 'hidden',
                            border: '1px solid #f2dbe9',
                            boxShadow: '0 2px 8px rgba(88, 17, 66, 0.08)',
                            display: 'flex',
                            flexDirection: 'column'
                          }}
                        >
                          <div style={{ position: 'relative', height: '110px', overflow: 'hidden' }}>
                            <img 
                              src={p.images?.[0] || '/why-choose-banner.jpg'} 
                              alt={p.name}
                              style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                              onError={(e) => {
                                e.currentTarget.onerror = null;
                                e.currentTarget.src = "/why-choose-banner.jpg";
                              }}
                            />
                            {p.salePrice && (
                              <span style={{ position: 'absolute', top: 4, left: 4, background: '#e11d48', color: '#fff', fontSize: '0.62rem', fontWeight: 700, padding: '0.1rem 0.35rem', borderRadius: '4px' }}>
                                SALE
                              </span>
                            )}
                          </div>

                          <div style={{ padding: '0.55rem', display: 'flex', flexDirection: 'column', flex: 1 }}>
                            <div style={{ fontSize: '0.74rem', fontWeight: 600, color: 'var(--purple-950)', height: '2rem', overflow: 'hidden', lineHeight: 1.25, marginBottom: '0.25rem' }}>
                              {p.name}
                            </div>
                            <div style={{ fontSize: '0.82rem', fontWeight: 700, color: 'var(--purple-800)', marginBottom: '0.4rem' }}>
                              ₹{p.salePrice || p.price}
                            </div>

                            <div style={{ display: 'flex', gap: '0.3rem', marginTop: 'auto' }}>
                              <Link 
                                to={`/product/${p.id}`}
                                onClick={() => setIsOpen(false)}
                                style={{
                                  flex: 1,
                                  background: 'var(--purple-50)',
                                  color: 'var(--purple-800)',
                                  textAlign: 'center',
                                  padding: '0.3rem 0.4rem',
                                  borderRadius: '4px',
                                  fontSize: '0.68rem',
                                  fontWeight: 600,
                                  textDecoration: 'none'
                                }}
                              >
                                View
                              </Link>
                              <button
                                onClick={(e) => handleQuickAdd(p, e)}
                                title="Add to bag"
                                style={{
                                  background: 'var(--purple-800)',
                                  color: '#fff',
                                  padding: '0.3rem 0.45rem',
                                  borderRadius: '4px',
                                  fontSize: '0.68rem',
                                  border: 'none',
                                  cursor: 'pointer'
                                }}
                              >
                                <ShoppingBag size={12} />
                              </button>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Suggestion Prompt Chips */}
                {msg.suggestions && msg.suggestions.length > 0 && (
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.35rem', marginTop: '0.2rem' }}>
                    {msg.suggestions.map((sug, i) => (
                      <button
                        key={i}
                        onClick={() => handleSendMessage(sug)}
                        style={{
                          fontSize: '0.72rem',
                          background: '#ffffff',
                          color: 'var(--purple-800)',
                          border: '1px solid var(--purple-200)',
                          borderRadius: 'var(--radius-full)',
                          padding: '0.25rem 0.65rem',
                          cursor: 'pointer',
                          fontWeight: 500,
                          transition: 'all 0.15s ease'
                        }}
                        onMouseEnter={e => {
                          e.currentTarget.style.background = 'var(--purple-800)';
                          e.currentTarget.style.color = '#fff';
                        }}
                        onMouseLeave={e => {
                          e.currentTarget.style.background = '#ffffff';
                          e.currentTarget.style.color = 'var(--purple-800)';
                        }}
                      >
                        {sug}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            ))}

            {/* Loading Indicator */}
            {isLoading && (
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', background: '#ffffff', padding: '0.6rem 0.9rem', borderRadius: '16px', width: 'fit-content', border: '1px solid #f2e2ee', boxShadow: '0 2px 6px rgba(0,0,0,0.04)' }}>
                <Sparkles size={14} className="animate-spin" style={{ color: 'var(--purple-700)' }} />
                <span style={{ fontSize: '0.78rem', color: 'var(--gray-600)', fontStyle: 'italic' }}>
                  Haritha is curating recommendations...
                </span>
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>

          {/* WhatsApp Direct Help Bar */}
          <div style={{
            background: '#ffffff',
            borderTop: '1px solid #f0e4ea',
            padding: '0.5rem 1rem',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            fontSize: '0.75rem'
          }}>
            <span style={{ color: 'var(--gray-600)' }}>Need human video shopping?</span>
            <a 
              href={`https://wa.me/${whatsappNumber}?text=${encodeURIComponent("Hello Harithanjali Boutique! I was chatting with Haritha AI and would like direct styling support.")}`}
              target="_blank"
              rel="noreferrer"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.35rem',
                color: '#059669',
                fontWeight: 700,
                textDecoration: 'none'
              }}
            >
              <MessageCircle size={14} />
              <span>WhatsApp Us</span>
            </a>
          </div>

          {/* Chat Input */}
          <form 
            onSubmit={(e) => {
              e.preventDefault();
              handleSendMessage();
            }}
            style={{
              padding: '0.75rem 0.9rem',
              background: '#ffffff',
              borderTop: '1px solid #f3e8f1',
              display: 'flex',
              gap: '0.5rem',
              alignItems: 'center'
            }}
          >
            <input 
              ref={inputRef}
              type="text"
              placeholder="Ask about sarees, matching blouse, Salem store..."
              value={inputMessage}
              onChange={e => setInputMessage(e.target.value)}
              disabled={isLoading}
              style={{
                flex: 1,
                padding: '0.65rem 0.9rem',
                borderRadius: 'var(--radius-full)',
                border: '1px solid var(--purple-200)',
                background: '#faf6fa',
                outline: 'none',
                fontSize: '0.85rem'
              }}
            />
            <button
              type="submit"
              disabled={!inputMessage.trim() || isLoading}
              style={{
                width: '38px',
                height: '38px',
                borderRadius: '50%',
                background: inputMessage.trim() && !isLoading ? 'linear-gradient(135deg, #581142, #3d082e)' : 'var(--gray-300)',
                color: '#fff',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                border: 'none',
                cursor: inputMessage.trim() && !isLoading ? 'pointer' : 'default',
                transition: 'all 0.2s ease',
                flexShrink: 0
              }}
            >
              <Send size={15} />
            </button>
          </form>
        </div>
      )}
    </>
  );
}
