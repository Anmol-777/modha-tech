import React, { useState } from 'react';
import { Send, X } from 'lucide-react';

export const WhatsAppButton: React.FC = () => {
  const [chatOpen, setChatOpen] = useState(false);
  const [messages, setMessages] = useState<Array<{ sender: 'user' | 'bot'; text: string }>>([
    {
      sender: 'bot',
      text: 'Namaste! Welcome to Modha Technologies. How can we help you today?',
    },
  ]);
  const [userInput, setUserInput] = useState('');

  const quickReplies = [
    'Tell me about the pedal machine',
    'How much does it cost?',
    'I want to request a demo',
  ];

  const handleSend = (textToSend: string) => {
    if (!textToSend.trim()) return;

    // Add user message with explicit type definition
    const newMessages: Array<{ sender: 'user' | 'bot'; text: string }> = [
      ...messages,
      { sender: 'user', text: textToSend }
    ];
    setMessages(newMessages);
    setUserInput('');

    // Simulate bot response after a brief delay
    setTimeout(() => {
      let botResponse = '';
      const text = textToSend.toLowerCase();

      if (text.includes('machine') || text.includes('pedal')) {
        botResponse = 'Our Pedal Operating Machine reduces leg strain by 80% and can attach to existing looms in hours. It also works manually!';
      } else if (text.includes('cost') || text.includes('price')) {
        botResponse = 'Please contact us at +91 81438 24009 for pricing details and customized cluster quotes. We are happy to help!';
      } else if (text.includes('demo') || text.includes('request')) {
        botResponse = 'Thank you! Please share your contact number and location, and our team will get in touch with you shortly to schedule a demo.';
      } else {
        botResponse = 'Thank you for your message. Please feel free to call our founder directly at +91 81438 24009 for immediate support!';
      }

      setMessages((prev) => [...prev, { sender: 'bot', text: botResponse }]);
    }, 800);
  };

  return (
    <div className="whatsapp-widget-container">
      {/* Floating Button */}
      <button
        className={`whatsapp-floating-btn ${chatOpen ? 'active' : ''}`}
        onClick={() => setChatOpen(!chatOpen)}
        aria-label="Contact on WhatsApp"
      >
        {chatOpen ? (
          <X size={26} color="#ffffff" />
        ) : (
          <svg
            viewBox="0 0 24 24"
            width="28"
            height="28"
            fill="currentColor"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fillRule="evenodd"
              clipRule="evenodd"
              d="M18.403 5.633A8.919 8.919 0 0 0 12.053 3c-4.948 0-8.976 4.027-8.978 8.977 0 1.58.413 3.123 1.197 4.482L3 21l4.637-1.216a8.9 8.9 0 0 0 4.413 1.162h.004c4.947 0 8.974-4.028 8.976-8.979a8.918 8.918 0 0 0-2.627-6.334zm-6.35 13.787h-.002a7.446 7.446 0 0 1-3.799-1.041l-.272-.162-2.824.74.754-2.752-.177-.282a7.447 7.447 0 0 1-1.141-3.95c.002-4.114 3.349-7.461 7.465-7.461a7.42 7.42 0 0 1 5.275 2.188 7.42 7.42 0 0 1 2.183 5.279c-.002 4.114-3.349 7.462-7.462 7.462zm4.093-5.594c-.224-.112-1.327-.655-1.533-.73-.205-.075-.355-.112-.504.112-.149.224-.578.73-.708.88-.13.15-.26.168-.485.056-.225-.113-.95-.35-1.81-1.118-.67-.597-1.121-1.335-1.253-1.56-.13-.225-.014-.347.098-.459.1-.1.224-.262.336-.393.112-.13.149-.224.224-.374.075-.15.038-.281-.019-.393-.056-.112-.504-1.217-.69-1.666-.182-.439-.366-.38-.504-.388-.13-.007-.28-.008-.43-.008a.827.827 0 0 0-.598.28c-.206.225-.785.767-.785 1.87 0 1.104.804 2.17.916 2.32.112.15 1.582 2.416 3.833 3.387.535.23 1.011.393 1.358.503.54.172 1.03.147 1.417.09.43-.064 1.327-.542 1.514-1.066.187-.524.187-.973.13-1.067-.056-.093-.205-.15-.43-.262z"
              fill="#ffffff"
            />
          </svg>
        )}
      </button>

      {/* Chat Box */}
      {chatOpen && (
        <div className="whatsapp-chat-box scale-up">
          {/* Header */}
          <div className="chat-header">
            <div className="chat-brand-info">
              <div className="whatsapp-logo-circle">
                <svg
                  viewBox="0 0 24 24"
                  width="20"
                  height="20"
                  fill="currentColor"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M18.403 5.633A8.919 8.919 0 0 0 12.053 3c-4.948 0-8.976 4.027-8.978 8.977 0 1.58.413 3.123 1.197 4.482L3 21l4.637-1.216a8.9 8.9 0 0 0 4.413 1.162h.004c4.947 0 8.974-4.028 8.976-8.979a8.918 8.918 0 0 0-2.627-6.334zm-6.35 13.787h-.002a7.446 7.446 0 0 1-3.799-1.041l-.272-.162-2.824.74.754-2.752-.177-.282a7.447 7.447 0 0 1-1.141-3.95c.002-4.114 3.349-7.461 7.465-7.461a7.42 7.42 0 0 1 5.275 2.188 7.42 7.42 0 0 1 2.183 5.279c-.002 4.114-3.349 7.462-7.462 7.462zm4.093-5.594c-.224-.112-1.327-.655-1.533-.73-.205-.075-.355-.112-.504.112-.149.224-.578.73-.708.88-.13.15-.26.168-.485.056-.225-.113-.95-.35-1.81-1.118-.67-.597-1.121-1.335-1.253-1.56-.13-.225-.014-.347.098-.459.1-.1.224-.262.336-.393.112-.13.149-.224.224-.374.075-.15.038-.281-.019-.393-.056-.112-.504-1.217-.69-1.666-.182-.439-.366-.38-.504-.388-.13-.007-.28-.008-.43-.008a.827.827 0 0 0-.598.28c-.206.225-.785.767-.785 1.87 0 1.104.804 2.17.916 2.32.112.15 1.582 2.416 3.833 3.387.535.23 1.011.393 1.358.503.54.172 1.03.147 1.417.09.43-.064 1.327-.542 1.514-1.066.187-.524.187-.973.13-1.067-.056-.093-.205-.15-.43-.262z"
                    fill="#ffffff"
                  />
                </svg>
              </div>
              <div className="brand-details">
                <span className="brand-name">Modha Support</span>
                <span className="brand-status">Online</span>
              </div>
            </div>
            <button className="chat-close-btn" onClick={() => setChatOpen(false)}>
              <X size={18} />
            </button>
          </div>

          {/* Messages */}
          <div className="chat-messages-area">
            {messages.map((msg, idx) => (
              <div key={idx} className={`chat-bubble-wrapper ${msg.sender}`}>
                <div className={`chat-bubble ${msg.sender}`}>{msg.text}</div>
              </div>
            ))}
          </div>

          {/* Quick Replies */}
          <div className="quick-replies-area">
            {quickReplies.map((reply, idx) => (
              <button
                key={idx}
                className="quick-reply-btn"
                onClick={() => handleSend(reply)}
              >
                {reply}
              </button>
            ))}
          </div>

          {/* Footer Input */}
          <div className="chat-input-area">
            <input
              type="text"
              placeholder="Type your message..."
              value={userInput}
              onChange={(e) => setUserInput(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === 'Enter') handleSend(userInput);
              }}
            />
            <button className="chat-send-btn" onClick={() => handleSend(userInput)}>
              <Send size={16} />
            </button>
          </div>
        </div>
      )}

      <style>{`
        .whatsapp-widget-container {
          position: fixed;
          bottom: 16px;
          right: 16px;
          z-index: 999;
          font-family: var(--font-sans);
        }

        @media (min-width: 480px) {
          .whatsapp-widget-container {
            bottom: 20px;
            right: 20px;
          }
        }

        @media (min-width: 768px) {
          .whatsapp-widget-container {
            bottom: 30px;
            right: 30px;
          }
        }

        .whatsapp-floating-btn {
          width: 52px;
          height: 52px;
          border-radius: 50%;
          background-color: #25d366;
          display: flex;
          align-items: center;
          justify-content: center;
          box-shadow: 0 4px 16px rgba(0, 0, 0, 0.25);
          transition: var(--transition-fast);
          z-index: 1000;
          position: relative;
        }

        .whatsapp-floating-btn:active {
          transform: scale(0.92);
          background-color: #20ba5a;
        }

        .whatsapp-floating-btn.active {
          background-color: #333333;
        }

        .whatsapp-chat-box {
          position: fixed;
          bottom: 76px;
          right: 16px;
          left: 16px;
          max-width: 360px;
          background-color: #ffffff;
          border-radius: 14px;
          box-shadow: var(--shadow-lg);
          border: 1px solid var(--border-color);
          overflow: hidden;
          display: flex;
          flex-direction: column;
          z-index: 999;
          margin-left: auto;
          margin-right: auto;
        }

        @media (min-width: 480px) {
          .whatsapp-chat-box {
            left: auto;
            right: 20px;
            bottom: 80px;
          }
        }

        @media (min-width: 768px) {
          .whatsapp-chat-box {
            position: absolute;
            bottom: 75px;
            right: 0;
            left: auto;
            width: 320px;
            border-radius: 16px;
          }
        }

        .chat-header {
          background-color: #075e54;
          padding: 12px 14px;
          display: flex;
          justify-content: space-between;
          align-items: center;
          color: #ffffff;
        }

        @media (min-width: 480px) {
          .chat-header {
            padding: 14px;
          }
        }

        @media (min-width: 768px) {
          .chat-header {
            padding: 16px;
          }
        }

        .chat-brand-info {
          display: flex;
          align-items: center;
          gap: 10px;
        }

        .whatsapp-logo-circle {
          width: 28px;
          height: 28px;
          border-radius: 50%;
          background-color: #25d366;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .brand-details {
          display: flex;
          flex-direction: column;
        }

        .brand-name {
          font-weight: 700;
          font-size: 13px;
        }

        .brand-status {
          font-size: 11px;
          opacity: 0.8;
        }

        .chat-close-btn {
          color: #ffffff;
          opacity: 0.8;
          transition: var(--transition-fast);
          padding: 6px;
          min-width: 36px;
          min-height: 36px;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .chat-close-btn:active {
          opacity: 1;
        }

        .chat-messages-area {
          height: 200px;
          overflow-y: auto;
          padding: 12px;
          background-color: #e5ddd5;
          display: flex;
          flex-direction: column;
          gap: 8px;
          -webkit-overflow-scrolling: touch;
        }

        @media (min-width: 480px) {
          .chat-messages-area {
            height: 180px;
            padding: 14px;
            gap: 10px;
          }
        }

        @media (min-width: 768px) {
          .chat-messages-area {
            height: 200px;
            padding: 16px;
            gap: 12px;
          }
        }

        .chat-bubble-wrapper {
          display: flex;
          width: 100%;
        }

        .chat-bubble-wrapper.bot {
          justify-content: flex-start;
        }

        .chat-bubble-wrapper.user {
          justify-content: flex-end;
        }

        .chat-bubble {
          max-width: 85%;
          padding: 8px 12px;
          border-radius: 8px;
          font-size: 13px;
          line-height: 1.4;
          box-shadow: 0 1px 2px rgba(0,0,0,0.1);
        }

        .chat-bubble.bot {
          background-color: #ffffff;
          color: #333333;
          border-top-left-radius: 0;
        }

        .chat-bubble.user {
          background-color: #dcf8c6;
          color: #333333;
          border-top-right-radius: 0;
        }

        .quick-replies-area {
          padding: 8px 12px;
          background-color: #f0f0f0;
          display: flex;
          flex-wrap: wrap;
          gap: 6px;
          border-top: 1px solid var(--border-color);
        }

        .quick-reply-btn {
          background-color: #ffffff;
          border: 1px solid var(--border-color);
          border-radius: 12px;
          padding: 6px 10px;
          font-size: 11px;
          font-weight: 600;
          color: var(--primary-green);
          transition: var(--transition-fast);
          min-height: 36px;
        }

        .quick-reply-btn:active {
          background-color: var(--primary-green-light);
          border-color: var(--primary-green);
          transform: scale(0.97);
        }

        .chat-input-area {
          display: flex;
          border-top: 1px solid var(--border-color);
          background-color: #ffffff;
        }

        .chat-input-area input {
          flex-grow: 1;
          border: none;
          padding: 12px 14px;
          font-size: 14px;
          outline: none;
          min-height: 44px;
        }

        .chat-input-area input::placeholder {
          color: #999999;
        }

        .chat-send-btn {
          color: #075e54;
          padding: 0 14px;
          display: flex;
          align-items: center;
          justify-content: center;
          transition: var(--transition-fast);
          min-width: 44px;
        }

        .chat-send-btn:active {
          color: #25d366;
          transform: scale(0.95);
        }
      `}</style>
    </div>
  );
};
