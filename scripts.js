// ========================================
// SCRIPTIFY - MAIN JAVASCRIPT (NO AI)
// ========================================

// ===== INITIALIZATION =====
document.addEventListener('DOMContentLoaded', function() {
    loadScripts();
    updatePremiumUI();
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
        alert(`To purchase "${script.title}" for $${script.price}, please contact us:\n\nDiscord: Join our server\nEmail: Check contact section\n\nWe'll send you payment details and the script file!`);
    }
}

function downloadScript(script) {
    if (script.downloadUrl === '#' || !script.downloadUrl) {
        alert(`Script ready for download!\n\nTitle: ${script.title}\n\nPlease contact us via Discord or email to receive your download link.`);
    } else {
        window.open(script.downloadUrl, '_blank');
        alert(`Thank you for your purchase! Your download should start automatically.`);
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
    alert('To purchase Premium:\n\n1. Join our Discord server\n2. Contact an admin\n3. We\'ll send you payment details\n4. Get instant access to all scripts!\n\nPrice: $60 one-time payment');
    closePremiumModal();
}

function processPayPalPayment() {
    alert('To purchase Premium:\n\n1. Join our Discord server\n2. Contact an admin\n3. We\'ll send you PayPal payment details\n4. Get instant access to all scripts!\n\nPrice: $60 one-time payment');
    closePremiumModal();
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

function scrollToContact() {
    document.getElementById('contact').scrollIntoView({ behavior: 'smooth' });
}

// ===== UTILITY FUNCTIONS =====
function resetPremiumStatus() {
    localStorage.removeItem('isPremium');
    alert('Premium status reset. Reload the page to see changes.');
}

// Add console helper
console.log('%c🚀 Scriptify Loaded Successfully!', 'color: #00ff88; font-size: 16px; font-weight: bold;');
console.log('%cDeveloper Tools:', 'color: #00d4ff; font-size: 14px;');
console.log('- resetPremiumStatus() - Reset premium status for testing');
console.log('- CONFIG - View all configuration settings');
