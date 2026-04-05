/**
 * Arcena Systems Chat Widget — Modern Edition
 * Premium dark-tech aesthetic with glassmorphism
 * Vanilla JS, self-contained, no dependencies
 */

(function initChatWidget() {
  const CONFIG = {
    apiEndpoint: '/api/chat',
    chatbotName: 'KI-Assistent',
    companyName: 'Arcena Systems',
    zIndex: 10000,
  };

  // Autonomous Ether Design Tokens
  const DESIGN = {
    background: '#0d1226',
    surface_container_lowest: '#080d21',
    surface_container_low: '#161a2f',
    surface_container_highest: '#2f3449',
    surface_bright: '#33384e',
    primary_container: '#466dca',
    primary: '#b2c5ff',
    on_surface: '#dde1fd',
    on_surface_variant: '#c4c6d4',
  };

  // Modern CSS with glassmorphism & refined animations
  const styleSheet = document.createElement('style');
  styleSheet.textContent = `
    /* ═══════════════════════════════════════════════════════════ */
    /* CHAT WIDGET CONTAINER */
    /* ═══════════════════════════════════════════════════════════ */
    .arcena-chat-widget {
      position: fixed;
      bottom: 24px;
      right: 24px;
      z-index: ${CONFIG.zIndex};
      font-family: 'Plus Jakarta Sans', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
      --primary-color: ${DESIGN.primary_container};
      --primary-light: ${DESIGN.primary};
      --surface-low: ${DESIGN.surface_container_low};
      --surface-highest: ${DESIGN.surface_container_highest};
      --text-primary: ${DESIGN.on_surface};
      --text-secondary: ${DESIGN.on_surface_variant};
    }

    /* ═══════════════════════════════════════════════════════════ */
    /* FLOATING BUTTON — Premium Minimalist */
    /* ═══════════════════════════════════════════════════════════ */
    .arcena-chat-button {
      width: 56px;
      height: 56px;
      border-radius: 14px;
      background: linear-gradient(135deg, var(--primary-color) 0%, #3a56b8 100%);
      border: 1px solid rgba(178, 197, 255, 0.2);
      cursor: pointer;
      display: flex;
      align-items: center;
      justify-content: center;
      transition: all 0.4s cubic-bezier(0.34, 1.56, 0.64, 1);
      box-shadow: 0 12px 40px rgba(70, 109, 202, 0.25),
                  inset 0 1px 0 rgba(255, 255, 255, 0.1);
      backdrop-filter: blur(12px);
      -webkit-backdrop-filter: blur(12px);
      position: relative;
      overflow: hidden;
    }

    .arcena-chat-button::before {
      content: '';
      position: absolute;
      inset: 0;
      background: radial-gradient(circle at 30% 30%, rgba(255, 255, 255, 0.15), transparent 80%);
      pointer-events: none;
    }

    .arcena-chat-button:hover {
      transform: translateY(-4px) scale(1.05);
      box-shadow: 0 20px 60px rgba(70, 109, 202, 0.35),
                  inset 0 1px 0 rgba(255, 255, 255, 0.15);
      background: linear-gradient(135deg, #526dda 0%, #4560c8 100%);
    }

    .arcena-chat-button:active {
      transform: translateY(-2px) scale(0.98);
    }

    /* Pulsing glow animation */
    @keyframes arcena-glow {
      0%, 100% {
        box-shadow: 0 12px 40px rgba(70, 109, 202, 0.25),
                    inset 0 1px 0 rgba(255, 255, 255, 0.1),
                    0 0 20px rgba(178, 197, 255, 0);
      }
      50% {
        box-shadow: 0 12px 40px rgba(70, 109, 202, 0.35),
                    inset 0 1px 0 rgba(255, 255, 255, 0.15),
                    0 0 40px rgba(178, 197, 255, 0.15);
      }
    }

    .arcena-chat-button {
      animation: arcena-glow 3s ease-in-out infinite;
    }

    .arcena-chat-button:hover {
      animation: none;
    }

    .arcena-chat-icon {
      width: 24px;
      height: 24px;
      fill: white;
      position: relative;
      z-index: 1;
    }

    /* ═══════════════════════════════════════════════════════════ */
    /* CHAT PANEL — Glassmorphism Design */
    /* ═══════════════════════════════════════════════════════════ */
    .arcena-chat-panel {
      position: fixed;
      bottom: 100px;
      right: 24px;
      width: 420px;
      height: 580px;
      background: rgba(22, 26, 47, 0.75);
      backdrop-filter: blur(20px);
      -webkit-backdrop-filter: blur(20px);
      border: 1px solid rgba(178, 197, 255, 0.15);
      border-radius: 20px;
      box-shadow: 0 32px 80px rgba(0, 0, 0, 0.4),
                  inset 0 1px 0 rgba(255, 255, 255, 0.08);
      display: flex;
      flex-direction: column;
      opacity: 0;
      transform: translateY(20px) scale(0.95);
      pointer-events: none;
      transition: all 0.5s cubic-bezier(0.34, 1.56, 0.64, 1);
      overflow: hidden;
    }

    .arcena-chat-panel.open {
      opacity: 1;
      transform: translateY(0) scale(1);
      pointer-events: auto;
    }

    /* ─── Header ─── */
    .arcena-chat-header {
      padding: 16px 20px;
      border-bottom: 1px solid rgba(178, 197, 255, 0.1);
      background: linear-gradient(180deg, rgba(70, 109, 202, 0.08) 0%, transparent 100%);
      display: flex;
      align-items: center;
      justify-content: space-between;
      gap: 12px;
    }

    .arcena-chat-header-logo {
      display: flex;
      align-items: center;
      justify-content: center;
      width: 36px;
      height: 36px;
      border-radius: 10px;
      background: rgba(70, 109, 202, 0.15);
      border: 1px solid rgba(178, 197, 255, 0.2);
      margin-right: 12px;
      flex-shrink: 0;
    }

    .arcena-chat-header-logo svg {
      width: 20px;
      height: 20px;
    }

    .arcena-chat-header-content {
      flex: 1;
      min-width: 0;
    }

    .arcena-chat-header-content h3 {
      margin: 0;
      font-size: 15px;
      font-weight: 600;
      color: var(--text-primary);
      letter-spacing: -0.3px;
    }

    .arcena-chat-header-content p {
      margin: 2px 0 0 0;
      font-size: 11px;
      color: var(--text-secondary);
      font-weight: 400;
      opacity: 0.8;
    }

    .arcena-chat-close {
      background: none;
      border: none;
      color: var(--text-secondary);
      cursor: pointer;
      padding: 6px;
      display: flex;
      align-items: center;
      justify-content: center;
      transition: all 0.3s ease;
      border-radius: 8px;
      flex-shrink: 0;
    }

    .arcena-chat-close:hover {
      background: rgba(178, 197, 255, 0.12);
      color: var(--text-primary);
    }

    /* ─── Messages Container ─── */
    .arcena-chat-messages {
      flex: 1;
      overflow-y: auto;
      padding: 20px 16px;
      display: flex;
      flex-direction: column;
      gap: 12px;
      scroll-behavior: smooth;
    }

    .arcena-chat-messages::-webkit-scrollbar {
      width: 6px;
    }

    .arcena-chat-messages::-webkit-scrollbar-track {
      background: transparent;
    }

    .arcena-chat-messages::-webkit-scrollbar-thumb {
      background: rgba(178, 197, 255, 0.2);
      border-radius: 3px;
    }

    .arcena-chat-messages::-webkit-scrollbar-thumb:hover {
      background: rgba(178, 197, 255, 0.3);
    }

    /* ─── User Message ─── */
    .arcena-chat-message-user {
      display: flex;
      justify-content: flex-end;
      animation: slideInRight 0.4s cubic-bezier(0.34, 1.56, 0.64, 1);
    }

    .arcena-chat-message-user .arcena-message-bubble {
      background: linear-gradient(135deg, var(--primary-color) 0%, #3a56b8 100%);
      color: white;
      border-radius: 16px 4px 16px 16px;
      max-width: 70%;
      word-wrap: break-word;
      box-shadow: 0 4px 12px rgba(70, 109, 202, 0.2);
    }

    /* ─── Assistant Message ─── */
    .arcena-chat-message-assistant {
      display: flex;
      justify-content: flex-start;
      animation: slideInLeft 0.4s cubic-bezier(0.34, 1.56, 0.64, 1);
    }

    .arcena-chat-message-assistant .arcena-message-bubble {
      background: rgba(47, 52, 73, 0.6);
      border: 1px solid rgba(178, 197, 255, 0.15);
      color: var(--text-primary);
      border-radius: 4px 16px 16px 16px;
    }

    .arcena-message-bubble {
      padding: 12px 16px;
      font-size: 14px;
      line-height: 1.5;
      word-wrap: break-word;
      backdrop-filter: blur(10px);
      -webkit-backdrop-filter: blur(10px);
    }

    /* Typing indicator */
    .arcena-typing-indicator {
      display: flex;
      gap: 4px;
      padding: 12px 16px;
      background: rgba(47, 52, 73, 0.6);
      border: 1px solid rgba(178, 197, 255, 0.15);
      border-radius: 4px 16px 16px 16px;
      width: fit-content;
      animation: slideInLeft 0.4s cubic-bezier(0.34, 1.56, 0.64, 1);
    }

    .arcena-typing-dot {
      width: 6px;
      height: 6px;
      border-radius: 50%;
      background: var(--text-secondary);
      animation: typing 1.4s infinite;
    }

    .arcena-typing-dot:nth-child(2) {
      animation-delay: 0.2s;
    }

    .arcena-typing-dot:nth-child(3) {
      animation-delay: 0.4s;
    }

    @keyframes typing {
      0%, 60%, 100% {
        opacity: 0.4;
        transform: translateY(0);
      }
      30% {
        opacity: 1;
        transform: translateY(-8px);
      }
    }

    /* ─── Input Area ─── */
    .arcena-chat-input-container {
      padding: 16px;
      border-top: 1px solid rgba(178, 197, 255, 0.1);
      background: linear-gradient(180deg, transparent 0%, rgba(70, 109, 202, 0.04) 100%);
      display: flex;
      gap: 8px;
      align-items: flex-end;
    }

    .arcena-chat-input {
      flex: 1;
      background: rgba(13, 18, 38, 0.5);
      border: 1px solid rgba(178, 197, 255, 0.2);
      border-radius: 10px;
      padding: 10px 14px;
      color: var(--text-primary);
      font-size: 14px;
      font-family: inherit;
      resize: none;
      max-height: 100px;
      transition: all 0.3s ease;
      backdrop-filter: blur(10px);
      -webkit-backdrop-filter: blur(10px);
    }

    .arcena-chat-input:focus {
      outline: none;
      border-color: rgba(178, 197, 255, 0.4);
      background: rgba(13, 18, 38, 0.7);
      box-shadow: 0 0 16px rgba(70, 109, 202, 0.15);
    }

    .arcena-chat-input::placeholder {
      color: var(--text-secondary);
      opacity: 0.6;
    }

    .arcena-chat-send {
      background: linear-gradient(135deg, var(--primary-color) 0%, #3a56b8 100%);
      border: none;
      color: white;
      width: 36px;
      height: 36px;
      border-radius: 10px;
      cursor: pointer;
      display: flex;
      align-items: center;
      justify-content: center;
      transition: all 0.3s cubic-bezier(0.34, 1.56, 0.64, 1);
      box-shadow: 0 4px 12px rgba(70, 109, 202, 0.2);
      flex-shrink: 0;
    }

    .arcena-chat-send:hover:not(:disabled) {
      transform: translateY(-2px);
      box-shadow: 0 8px 20px rgba(70, 109, 202, 0.3);
      background: linear-gradient(135deg, #526dda 0%, #4560c8 100%);
    }

    .arcena-chat-send:active:not(:disabled) {
      transform: translateY(0);
    }

    .arcena-chat-send:disabled {
      opacity: 0.5;
      cursor: not-allowed;
    }

    .arcena-chat-send svg {
      width: 18px;
      height: 18px;
      fill: currentColor;
    }

    /* ═══════════════════════════════════════════════════════════ */
    /* ANIMATIONS */
    /* ═══════════════════════════════════════════════════════════ */
    @keyframes slideInRight {
      from {
        opacity: 0;
        transform: translateX(16px);
      }
      to {
        opacity: 1;
        transform: translateX(0);
      }
    }

    @keyframes slideInLeft {
      from {
        opacity: 0;
        transform: translateX(-16px);
      }
      to {
        opacity: 1;
        transform: translateX(0);
      }
    }

    /* ═══════════════════════════════════════════════════════════ */
    /* RESPONSIVE */
    /* ═══════════════════════════════════════════════════════════ */
    @media (max-width: 480px) {
      .arcena-chat-panel {
        width: calc(100vw - 32px);
        height: calc(100vh - 120px);
        right: 16px;
        bottom: 80px;
      }

      .arcena-chat-message-user .arcena-message-bubble,
      .arcena-chat-message-assistant .arcena-message-bubble {
        max-width: 85%;
      }
    }
  `;

  document.head.appendChild(styleSheet);

  // Initialize when DOM is ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', createWidget);
  } else {
    createWidget();
  }

  function createWidget() {
    const widget = document.createElement('div');
    widget.className = 'arcena-chat-widget';
    widget.innerHTML = `
      <!-- Floating Button -->
      <button class="arcena-chat-button" aria-label="Chat öffnen">
        <svg class="arcena-chat-icon" viewBox="0 0 24 24">
          <path d="M20 2H4c-1.1 0-2 .9-2 2v18l4-4h14c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2z"/>
        </svg>
      </button>

      <!-- Chat Panel -->
      <div class="arcena-chat-panel">
        <!-- Header -->
        <div class="arcena-chat-header">
          <div class="arcena-chat-header-logo">
            <svg viewBox="0 0 16 16" width="28" height="28">
              <polygon fill="#b2c5ff" points="14.747553,2.699218 15.149305,1.987466 16,3.263507 9.710892,14.12395 8.944087,14.12395 8.588211,13.541965 9.263917,12.364232 9.277024,12.38586"/>
              <polygon fill="#A9B0C7" points="15.075247,1.87605 15.149305,1.987466 14.747553,2.699218 14.214067,1.87605"/>
              <path fill="#b2c5ff" d="M7.997706,10.202761l3.553517-6.032196h-7.31348L7.997706,10.202761z M8.796625,11.484045l-0.040634,0.070127l0.507926,0.810061l-0.675706,1.177733L1.568345,2.060869c0.05833-0.084545,0.095031-0.154672,0.095031-0.154672V1.87605h12.502847v0.383402L8.796625,11.484045z"/>
              <polygon fill="#466DCA" points="0.860525,2.347929 8.044894,14.12395 6.554541,14.12395 0,3.233359 0.665875,2.029411"/>
              <path fill="#244AA0" d="M1.455618,1.87605l0.112727,0.18482C1.482489,2.186049,1.34879,2.342031,1.217057,2.342031c-0.133044,0-0.269365,0.003277-0.356531,0.005898l-0.19465-0.318519L0.751075,1.87605H1.455618z"/>
            </svg>
          </div>
          <div class="arcena-chat-header-content">
            <h3>${CONFIG.chatbotName}</h3>
            <p>Powered by Arcena</p>
          </div>
          <button class="arcena-chat-close" aria-label="Chat schließen">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <line x1="18" y1="6" x2="6" y2="18"></line>
              <line x1="6" y1="6" x2="18" y2="18"></line>
            </svg>
          </button>
        </div>

        <!-- Messages -->
        <div class="arcena-chat-messages"></div>

        <!-- Input -->
        <div class="arcena-chat-input-container">
          <textarea class="arcena-chat-input" placeholder="Ihre Frage..." rows="1"></textarea>
          <button class="arcena-chat-send" aria-label="Nachricht senden">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <path d="M22 2L11 13M22 2l-7 20-5-9-9-5 20-7z"></path>
            </svg>
          </button>
        </div>
      </div>
    `;

    document.body.appendChild(widget);

    // Get DOM elements
    const button = widget.querySelector('.arcena-chat-button');
    const panel = widget.querySelector('.arcena-chat-panel');
    const closeBtn = widget.querySelector('.arcena-chat-close');
    const messagesContainer = widget.querySelector('.arcena-chat-messages');
    const input = widget.querySelector('.arcena-chat-input');
    const sendBtn = widget.querySelector('.arcena-chat-send');

    // Toggle panel
    button.addEventListener('click', () => panel.classList.toggle('open'));
    closeBtn.addEventListener('click', () => panel.classList.remove('open'));

    // Auto-resize textarea
    input.addEventListener('input', () => {
      input.style.height = 'auto';
      input.style.height = Math.min(input.scrollHeight, 100) + 'px';
    });

    // Send message
    function sendMessage() {
      const text = input.value.trim();
      if (!text) return;

      // Add user message
      addMessage(text, 'user');
      input.value = '';
      input.style.height = 'auto';
      sendBtn.disabled = true;

      // Show typing indicator
      showTypingIndicator();

      // Send to API
      fetch(CONFIG.apiEndpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: text })
      })
        .then(async res => {
          if (!res.ok) {
            throw new Error(`HTTP ${res.status}: ${res.statusText}`);
          }
          const text = await res.text();
          try {
            return JSON.parse(text);
          } catch (e) {
            console.error('JSON parse error. Response:', text);
            throw new Error('Server returned invalid response');
          }
        })
        .then(data => {
          removeTypingIndicator();
          const reply = data.reply || data.response || 'Keine Antwort erhalten';
          addMessage(reply, 'assistant');
          sendBtn.disabled = false;
        })
        .catch(err => {
          removeTypingIndicator();
          console.error('Chat error:', err);
          addMessage('Entschuldigung, es gab einen Fehler. Bitte versuchen Sie es später erneut.', 'assistant');
          sendBtn.disabled = false;
        });
    }

    function addMessage(text, type) {
      const msgDiv = document.createElement('div');
      msgDiv.className = `arcena-chat-message-${type}`;
      msgDiv.innerHTML = `<div class="arcena-message-bubble">${text}</div>`;
      messagesContainer.appendChild(msgDiv);
      messagesContainer.scrollTop = messagesContainer.scrollHeight;
    }

    function showTypingIndicator() {
      const msgDiv = document.createElement('div');
      msgDiv.className = 'arcena-chat-message-assistant';
      msgDiv.innerHTML = `
        <div class="arcena-typing-indicator">
          <div class="arcena-typing-dot"></div>
          <div class="arcena-typing-dot"></div>
          <div class="arcena-typing-dot"></div>
        </div>
      `;
      messagesContainer.appendChild(msgDiv);
      messagesContainer.scrollTop = messagesContainer.scrollHeight;
    }

    function removeTypingIndicator() {
      const indicator = messagesContainer.querySelector('.arcena-typing-indicator');
      if (indicator) indicator.parentElement.remove();
    }

    // Send on button click
    sendBtn.addEventListener('click', sendMessage);

    // Send on Enter (Shift+Enter for newline)
    input.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' && !e.shiftKey) {
        e.preventDefault();
        sendMessage();
      }
    });
  }
})();
