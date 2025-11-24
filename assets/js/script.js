
import { GoogleGenAI } from "@google/genai";

document.addEventListener('DOMContentLoaded', () => {
    initMobileMenu();
    initNavbarScroll();
    initLightbox();
    initChatBot();
    initScrollAnimations();
});

/* --- Scroll Animations --- */
function initScrollAnimations() {
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target); // Only animate once
            }
        });
    }, { threshold: 0.1 });

    document.querySelectorAll('.fade-in-up').forEach(el => observer.observe(el));
}

/* --- Mobile Menu --- */
function initMobileMenu() {
    const btn = document.getElementById('mobile-menu-btn');
    const menu = document.getElementById('mobile-menu');
    
    if (btn && menu) {
        btn.addEventListener('click', () => {
            const isOpen = menu.style.maxHeight !== '0px' && menu.style.maxHeight !== '';
            if (isOpen) {
                menu.style.maxHeight = '0px';
                menu.style.opacity = '0';
            } else {
                menu.style.maxHeight = '300px';
                menu.style.opacity = '1';
            }
        });
    }
}

/* --- Sticky Navbar --- */
function initNavbarScroll() {
    const navbar = document.getElementById('navbar');
    if (navbar) {
        window.addEventListener('scroll', () => {
            if (window.scrollY > 50) {
                navbar.classList.remove('bg-transparent', 'py-6');
                navbar.classList.add('bg-black/90', 'backdrop-blur-md', 'py-4', 'shadow-lg');
            } else {
                navbar.classList.add('bg-transparent', 'py-6');
                navbar.classList.remove('bg-black/90', 'backdrop-blur-md', 'py-4', 'shadow-lg');
            }
        });
    }
}

/* --- Gallery Lightbox --- */
function initLightbox() {
    const galleryItems = document.querySelectorAll('.gallery-item');
    const lightbox = document.getElementById('lightbox');
    const lightboxImg = document.getElementById('lightbox-img');
    const closeBtn = document.getElementById('lightbox-close');

    if (lightbox && lightboxImg && galleryItems.length > 0) {
        galleryItems.forEach(item => {
            item.addEventListener('click', (e) => {
                // Find the closest gallery-item just in case the click hit a child
                const itemEl = e.target.closest('.gallery-item');
                const src = itemEl ? itemEl.getAttribute('data-src') : null;
                
                if (src) {
                    lightboxImg.src = src;
                    lightbox.classList.remove('hidden');
                    lightbox.classList.add('flex');
                }
            });
        });

        const closeLightbox = () => {
            lightbox.classList.add('hidden');
            lightbox.classList.remove('flex');
            lightboxImg.src = '';
        };

        if (closeBtn) closeBtn.addEventListener('click', closeLightbox);
        lightbox.addEventListener('click', (e) => {
            if (e.target === lightbox) closeLightbox();
        });
    }
}

/* --- AI Chatbot (Gemini) --- */
function initChatBot() {
    const container = document.getElementById('chatbot-container');
    if (!container) return;

    // Inject Chat HTML
    container.innerHTML = `
        <button id="chat-toggle" class="fixed bottom-6 right-6 z-50 p-4 rounded-full bg-amber-600 text-white shadow-lg hover:bg-amber-500 hover:scale-110 transition-all duration-300 border border-amber-500">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path></svg>
        </button>

        <div id="chat-window" class="fixed bottom-6 right-6 z-50 w-80 md:w-96 bg-stone-950 border border-stone-800 rounded-2xl shadow-2xl flex flex-col overflow-hidden transition-all duration-300 transform scale-0 origin-bottom-right h-[500px]">
            <div class="bg-stone-900 p-4 flex justify-between items-center border-b border-stone-800">
                <div class="flex items-center space-x-2">
                    <span class="text-amber-500 font-bold text-lg">🤠</span>
                    <h3 class="font-bold uppercase tracking-wider text-stone-200 text-sm">Shooters Bouncer</h3>
                </div>
                <button id="chat-close" class="text-stone-500 hover:text-stone-200">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
                </button>
            </div>
            
            <div id="chat-messages" class="flex-1 overflow-y-auto p-4 space-y-4 bg-stone-950/50">
                <div class="flex justify-start">
                    <div class="max-w-[80%] p-3 rounded-lg text-sm bg-stone-900 text-stone-300 rounded-tl-none border border-stone-800">
                        Howdy! I'm the Shooters Virtual Bouncer. Ask me about events, the bull, or the dress code!
                    </div>
                </div>
            </div>

            <div class="p-3 bg-stone-900 border-t border-stone-800 flex gap-2">
                <input id="chat-input" type="text" placeholder="Ask something..." class="flex-1 bg-stone-950 border border-stone-700 rounded-full px-4 py-2 text-sm text-stone-200 focus:outline-none focus:border-amber-500 placeholder-stone-600" />
                <button id="chat-send" class="p-2 bg-amber-600 rounded-full text-white hover:bg-amber-500 transition-colors">
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="22" y1="2" x2="11" y2="13"/><polygon points="22 2 15 22 11 13 2 9 22 2"/></svg>
                </button>
            </div>
        </div>
    `;

    const toggle = document.getElementById('chat-toggle');
    const windowEl = document.getElementById('chat-window');
    const closeBtn = document.getElementById('chat-close');
    const input = document.getElementById('chat-input');
    const sendBtn = document.getElementById('chat-send');
    const messages = document.getElementById('chat-messages');

    // Toggle logic
    toggle.addEventListener('click', () => {
        windowEl.classList.remove('scale-0');
        toggle.classList.add('hidden');
    });

    closeBtn.addEventListener('click', () => {
        windowEl.classList.add('scale-0');
        toggle.classList.remove('hidden');
    });

    // Chat Logic
    const appendMessage = (text, isUser) => {
        const div = document.createElement('div');
        div.className = `flex ${isUser ? 'justify-end' : 'justify-start'}`;
        div.innerHTML = `
            <div class="max-w-[80%] p-3 rounded-lg text-sm ${isUser ? 'bg-amber-700 text-white rounded-tr-none' : 'bg-stone-900 text-stone-300 rounded-tl-none border border-stone-800'}">
                ${text}
            </div>
        `;
        messages.appendChild(div);
        messages.scrollTop = messages.scrollHeight;
    };

    const handleSend = async () => {
        const text = input.value.trim();
        if (!text) return;

        appendMessage(text, true);
        input.value = '';

        // Typing indicator
        const loadingId = 'loading-' + Date.now();
        const loadingDiv = document.createElement('div');
        loadingDiv.id = loadingId;
        loadingDiv.className = 'flex justify-start';
        loadingDiv.innerHTML = `<div class="bg-stone-900 p-3 rounded-lg rounded-tl-none border border-stone-800 text-stone-500 text-xs italic">Bouncer is thinking...</div>`;
        messages.appendChild(loadingDiv);
        messages.scrollTop = messages.scrollHeight;

        try {
            // Retrieve API Key
            const apiKey = process.env.API_KEY; 
            if (!apiKey) {
                throw new Error("API Key missing");
            }
            
            const ai = new GoogleGenAI({ apiKey });
            
            const response = await ai.models.generateContent({
                model: 'gemini-2.5-flash',
                contents: text,
                config: {
                    systemInstruction: `You are "The Bouncer", the virtual AI promoter for Shooters II nightclub in Durham, NC. 
                    Your tone is welcoming, western, and energetic. Use cowboy emojis occasionally.
                    Keep responses short (under 50 words). 
                    Facts: 827 W Morgan St. Mechanical bull. Large dance floor. Open Thu-Sat.`,
                }
            });
            
            const responseText = response.text;
            
            const loader = document.getElementById(loadingId);
            if(loader) loader.remove();
            
            appendMessage(responseText, false);

        } catch (error) {
            console.error(error);
            const loader = document.getElementById(loadingId);
            if(loader) loader.remove();
            appendMessage("Can't hear you over the music! (Check API Key)", false);
        }
    };

    sendBtn.addEventListener('click', handleSend);
    input.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') handleSend();
    });
}
