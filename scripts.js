// ========================================
// SCRIPTFORGE - MAIN JAVASCRIPT
// ========================================

// ===== INITIALIZATION =====
document.addEventListener('DOMContentLoaded', function() {
    loadScripts();
    updatePremiumUI();
    initializeChat();
});

// ===== SCRIPT MARKETPLACE =====
function loadScripts() {
    const scriptsGrid = document.getElementById('scriptsGrid');
    const scriptFilter = document.getElementById('scriptFilter');
    
    function renderScripts(category = 'all') {
        scriptsGrid.innerHTML = '';
        
        const filteredScripts = category === 'all' 
            ? CONFIG.SCRIPTS 
            : CONFIG.SCRIPTS.filter(script => script.category === category);
        
        filteredScripts.forEach(script => {
            const scriptCard = createScriptCard(script);
            scriptsGrid.appendChild(scriptCard);
        });
    }
    
    // Initial load
    renderScripts();
    
    // Filter functionality
    scriptFilter.addEventListener('change', (e) => {
        renderScripts(e.target.value);
    });
}

function createScriptCard(script) {
    const card = document.createElement('div');
    card.className = 'script-card';
    card.onclick = () => showScriptDetails(script);
    
    const isPremium = CONFIG.isPremiumUser();
    const canAccess = !script.isPremium || isPremium;
    
    card.innerHTML = `
        <div class="script-header">
            <h3 class="script-title">${script.title}</h3>
            <div class="script-category">${script.category}</div>
        </div>
        <div class="script-body">
            <p class="script-description">${script.description}</p>
            ${script.isPremium ? '<span class="premium-badge">PREMIUM ONLY</span>' : ''}
        </div>
        <div class="script-footer">
            <div class="script-price">$${script.price}</div>
            <button class="script-btn" onclick="event.stopPropagation(); ${canAccess ? `purchaseScript(${script.id})` : 'showPremiumModal()'}">
                ${canAccess ? 'Purchase' : 'Premium Only'}
            </button>
        </div>
    `;
    
    return card;
}

function showScriptDetails(script) {
    const modal = document.getElementById('scriptModal');
    const modalBody = document.getElementById('modalBody');
    
    const isPremium = CONFIG.isPremiumUser();
    const canAccess = !script.isPremium || isPremium;
    
    modalBody.innerHTML = `
        <h2>${script.title}</h2>
        ${script.isPremium ? '<span class="premium-badge">PREMIUM ONLY</span>' : ''}
        <p style="color: var(--text-secondary); margin: 1rem 0;">${script.description}</p>
        
        <h3 style="color: var(--primary); margin-top: 2rem;">Features:</h3>
        <ul style="color: var(--text-secondary); line-height: 2;">
            ${script.features.map(f => `<li>${f}</li>`).join('')}
        </ul>
        
        <div style="margin-top: 2rem; padding: 1.5rem; background: var(--dark-surface); border-radius: 10px; border: 1px solid var(--border);">
            <div style="display: flex; justify-content: space-between; align-items: center;">
                <div>
                    <div style="color: var(--text-secondary); margin-bottom: 0.5rem;">Price</div>
                    <div style="font-family: 'Orbitron', sans-serif; font-size: 2rem; color: var(--primary); font-weight: 900;">$${script.price}</div>
                </div>
                <button class="script-btn" style="padding: 1rem 2rem;" onclick="${canAccess ? `purchaseScript(${script.id})` : 'showPremiumModal()'}">
                    ${canAccess ? 'Purchase Now' : 'Get Premium'}
                </button>
            </div>
        </div>
        
        ${!canAccess ? '<p style="color: var(--accent); margin-top: 1rem; text-align: center;">This script requires Premium membership</p>' : ''}
    `;
    
    modal.style.display = 'block';
}

function purchaseScript(scriptId) {
    const script = CONFIG.SCRIPTS.find(s => s.id === scriptId);
    
    if (!script) {
        alert('Script not found!');
        return;
    }
    
    const isPremium = CONFIG.isPremiumUser();
    
    if (isPremium) {
        // Premium users get all scripts
        downloadScript(script);
    } else {
        // Free users need to pay
        alert(`To purchase "${script.title}" for $${script.price}, you'll need to set up Stripe/PayPal payment processing.\n\nFor now, this is a demo. In production, this would redirect to a payment page.`);
        // TODO: Implement actual payment processing
        // processPayment(script.price, script.id);
    }
}

function downloadScript(script) {
    if (script.downloadUrl === '#') {
        alert(`Script ready for download!\n\nTitle: ${script.title}\n\nTo enable actual downloads, update the downloadUrl in config.js with a link to your file (Google Drive, Gumroad, etc.)`);
    } else {
        window.open(script.downloadUrl, '_blank');
        alert(`Thank you for your purchase! Your download should start automatically.`);
    }
}

// ===== AI CHATBOT =====
let conversationHistory = [];

function initializeChat() {
    const chatInput = document.getElementById('chatInput');
    chatInput.focus();
}

function handleKeyPress(event) {
    if (event.key === 'Enter') {
        sendMessage();
    }
}

async function sendMessage() {
    const input = document.getElementById('chatInput');
    const message = input.value.trim();
    
    if (!message) return;
    
    // Clear input
    input.value = '';
    
    // Hide welcome message
    const welcomeMsg = document.querySelector('.chat-welcome');
    if (welcomeMsg) {
        welcomeMsg.style.display = 'none';
    }
    
    // Add user message to chat
    addMessageToChat(message, 'user');
    
    // Check if API key is configured
    if (CONFIG.CLAUDE_API_KEY === 'YOUR_CLAUDE_API_KEY_HERE') {
        addMessageToChat('⚠️ API key not configured. Please add your Claude API key in config.js to enable AI chat functionality.\n\nGet your API key at: https://console.anthropic.com/', 'ai');
        return;
    }
    
    // Show typing indicator
    const typingIndicator = addTypingIndicator();
    
    try {
        // Check for custom script request (premium only)
        if (message.toLowerCase().includes('request') && message.toLowerCase().includes('script')) {
            if (CONFIG.isPremiumUser()) {
                await sendDiscordNotification(message);
                removeTypingIndicator(typingIndicator);
                addMessageToChat('✅ Your custom script request has been sent to the developer! You\'ll receive a notification on Discord when it\'s ready. Typical turnaround time is 3-5 business days.', 'ai');
                return;
            } else {
                removeTypingIndicator(typingIndicator);
                addMessageToChat('🔒 Custom script requests are only available for Premium members ($60 one-time). Upgrade to Premium to request custom scripts tailored to your game!', 'ai');
                return;
            }
        }
        
        // Get AI response
        const response = await getClaudeResponse(message);
        removeTypingIndicator(typingIndicator);
        addMessageToChat(response, 'ai');
        
    } catch (error) {
        console.error('Error:', error);
        removeTypingIndicator(typingIndicator);
        addMessageToChat('❌ Sorry, there was an error processing your request. Please check your API key and try again.\n\nError: ' + error.message, 'ai');
    }
}

function addMessageToChat(text, type) {
    const messagesContainer = document.getElementById('messages');
    const messageDiv = document.createElement('div');
    messageDiv.className = `message ${type}-message`;
    messageDiv.textContent = text;
    messagesContainer.appendChild(messageDiv);
    
    // Scroll to bottom
    const chatBox = document.getElementById('chatBox');
    chatBox.scrollTop = chatBox.scrollHeight;
}

function addTypingIndicator() {
    const messagesContainer = document.getElementById('messages');
    const indicator = document.createElement('div');
    indicator.className = 'message ai-message typing-indicator';
    indicator.innerHTML = '💭 Thinking...';
    indicator.id = 'typing-indicator';
    messagesContainer.appendChild(indicator);
    
    const chatBox = document.getElementById('chatBox');
    chatBox.scrollTop = chatBox.scrollHeight;
    
    return indicator;
}

function removeTypingIndicator(indicator) {
    if (indicator && indicator.parentNode) {
        indicator.parentNode.removeChild(indicator);
    }
}

async function getClaudeResponse(userMessage) {
    const isPremium = CONFIG.isPremiumUser();
    const systemPrompt = isPremium ? CONFIG.SYSTEM_PROMPTS.PREMIUM_USER : CONFIG.SYSTEM_PROMPTS.FREE_USER;
    
    // Add message to conversation history
    conversationHistory.push({
        role: 'user',
        content: userMessage
    });
    
    const response = await fetch('https://api.anthropic.com/v1/messages', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'x-api-key': CONFIG.CLAUDE_API_KEY,
            'anthropic-version': '2023-06-01'
        },
        body: JSON.stringify({
            model: CONFIG.CLAUDE_MODEL,
            max_tokens: 1024,
            system: systemPrompt,
            messages: conversationHistory
        })
    });
    
    if (!response.ok) {
        const error = await response.json();
        throw new Error(error.error?.message || 'API request failed');
    }
    
    const data = await response.json();
    const assistantMessage = data.content[0].text;
    
    // Add assistant response to history
    conversationHistory.push({
        role: 'assistant',
        content: assistantMessage
    });
    
    return assistantMessage;
}

async function sendDiscordNotification(requestMessage) {
    if (CONFIG.DISCORD_WEBHOOK_URL === 'YOUR_DISCORD_WEBHOOK_URL_HERE') {
        console.warn('Discord webhook not configured');
        return;
    }
    
    const embed = {
        title: '🎮 New Premium Script Request',
        description: requestMessage,
        color: 0x00ff88, // Green color
        fields: [
            {
                name: 'User Type',
                value: 'Premium Member',
                inline: true
            },
            {
                name: 'Request Time',
                value: new Date().toLocaleString(),
                inline: true
            }
        ],
        footer: {
            text: 'ScriptForge Premium Request System'
        }
    };
    
    try {
        await fetch(CONFIG.DISCORD_WEBHOOK_URL, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                embeds: [embed]
            })
        });
    } catch (error) {
        console.error('Failed to send Discord notification:', error);
    }
}

// ===== PREMIUM SYSTEM =====
function updatePremiumUI() {
    const isPremium = CONFIG.isPremiumUser();
    const premiumBtn = document.getElementById('premiumBtn');
    
    if (isPremium) {
        premiumBtn.textContent = '✓ Premium Active';
        premiumBtn.style.background = 'linear-gradient(135deg, var(--primary), var(--secondary))';
        premiumBtn.onclick = null;
        premiumBtn.style.cursor = 'default';
    }
}

function showPremiumModal() {
    const modal = document.getElementById('premiumModal');
    modal.style.display = 'block';
}

function closePremiumModal() {
    const modal = document.getElementById('premiumModal');
    modal.style.display = 'none';
}

function purchasePremium() {
    showPremiumModal();
}

function processStripePayment() {
    // TODO: Implement actual Stripe payment
    alert('Stripe payment processing not yet configured.\n\nTo set up:\n1. Create Stripe account at stripe.com\n2. Get publishable key\n3. Add to config.js\n4. Implement Stripe Checkout\n\nFor demo purposes, activating Premium now...');
    
    // Demo: Activate premium
    CONFIG.setPremiumUser(true);
    closePremiumModal();
    updatePremiumUI();
    alert('✅ Premium activated! You now have access to all scripts and can request custom scripts.');
    location.reload();
}

function processPayPalPayment() {
    // TODO: Implement actual PayPal payment
    alert('PayPal payment processing not yet configured.\n\nTo set up:\n1. Create PayPal developer account\n2. Get client ID\n3. Add to config.js\n4. Implement PayPal SDK\n\nFor demo purposes, activating Premium now...');
    
    // Demo: Activate premium
    CONFIG.setPremiumUser(true);
    closePremiumModal();
    updatePremiumUI();
    alert('✅ Premium activated! You now have access to all scripts and can request custom scripts.');
    location.reload();
}

// ===== MODAL CONTROLS =====
function closeModal() {
    const modal = document.getElementById('scriptModal');
    modal.style.display = 'none';
}

// Close modal when clicking outside
window.onclick = function(event) {
    const scriptModal = document.getElementById('scriptModal');
    const premiumModal = document.getElementById('premiumModal');
    
    if (event.target === scriptModal) {
        scriptModal.style.display = 'none';
    }
    if (event.target === premiumModal) {
        premiumModal.style.display = 'none';
    }
}

// ===== NAVIGATION =====
function scrollToScripts() {
    document.getElementById('scripts').scrollIntoView({ behavior: 'smooth' });
}

function openChat() {
    document.getElementById('ai-assistant').scrollIntoView({ behavior: 'smooth' });
    setTimeout(() => {
        document.getElementById('chatInput').focus();
    }, 500);
}

// ===== UTILITY FUNCTIONS =====
function resetPremiumStatus() {
    // For testing purposes - removes premium status
    localStorage.removeItem('isPremium');
    alert('Premium status reset. Reload the page to see changes.');
}

// Add console helper
console.log('%c🚀 ScriptForge Loaded Successfully!', 'color: #00ff88; font-size: 16px; font-weight: bold;');
console.log('%cDeveloper Tools:', 'color: #00d4ff; font-size: 14px;');
console.log('- resetPremiumStatus() - Reset premium status for testing');
console.log('- CONFIG - View all configuration settings');
