// ========================================
// CONFIGURATION FILE
// ========================================
// IMPORTANT: Add your API keys and settings here

const CONFIG = {
    // ===== CLAUDE API CONFIGURATION =====
    // Get your API key from: https://console.anthropic.com/
    CLAUDE_API_KEY: 'YOUR_CLAUDE_API_KEY_HERE', // Replace with your actual API key
    CLAUDE_MODEL: 'claude-sonnet-4-20250514', // Using Claude Sonnet 4 (recommended for cost/performance balance)
    
    // ===== DISCORD WEBHOOK CONFIGURATION =====
    // For receiving premium script requests
    // Create webhook in Discord: Server Settings > Integrations > Webhooks > New Webhook
    DISCORD_WEBHOOK_URL: 'YOUR_DISCORD_WEBHOOK_URL_HERE', // Replace with your webhook URL
    
    // ===== PAYMENT CONFIGURATION =====
    // You'll need to set these up on Stripe/PayPal
    STRIPE_PUBLISHABLE_KEY: 'YOUR_STRIPE_PUBLISHABLE_KEY_HERE',
    PAYPAL_CLIENT_ID: 'YOUR_PAYPAL_CLIENT_ID_HERE',
    
    // ===== PRICING =====
    PREMIUM_PRICE: 60, // One-time premium purchase price in USD
    
    // ===== SCRIPT DATABASE =====
    // Add your 4 scripts here with details
    SCRIPTS: [
        {
            id: 1,
            title: 'Advanced Combat System',
            category: 'gameplay',
            description: 'Complete combat system with combos, special moves, health/damage system, and animations. Perfect for action games.',
            price: 15,
            features: [
                'Combo system with 10+ moves',
                'Health and damage calculation',
                'Hit detection and knockback',
                'Animation integration',
                'Customizable damage values'
            ],
            downloadUrl: '#', // Replace with actual download link (Gumroad, Google Drive, etc.)
            isPremium: false // Set to true if only for premium users
        },
        {
            id: 2,
            title: 'Inventory & Item System',
            category: 'systems',
            description: 'Professional inventory system with drag-and-drop UI, item stacking, equipment slots, and save/load functionality.',
            price: 20,
            features: [
                'Drag-and-drop interface',
                'Item stacking and sorting',
                'Equipment slots system',
                'Data persistence (saves)',
                'Item stats and tooltips'
            ],
            downloadUrl: '#',
            isPremium: false
        },
        {
            id: 3,
            title: 'Admin Command Panel',
            category: 'ui',
            description: 'Comprehensive admin panel with commands for moderation, player management, and game control. Includes permission levels.',
            price: 12,
            features: [
                '30+ admin commands',
                'Permission level system',
                'Player moderation tools',
                'Teleportation commands',
                'Game control features'
            ],
            downloadUrl: '#',
            isPremium: false
        },
        {
            id: 4,
            title: 'Particle Effects Library',
            category: 'effects',
            description: 'Collection of 20+ stunning particle effects including explosions, magic spells, environmental effects, and more.',
            price: 18,
            features: [
                '20+ unique effects',
                'Customizable parameters',
                'Optimized performance',
                'Easy integration',
                'Effect preview system'
            ],
            downloadUrl: '#',
            isPremium: false
        }
    ],
    
    // ===== USER AUTHENTICATION =====
    // This is a simple localStorage-based system
    // For production, you'd want a proper backend
    isPremiumUser: function() {
        return localStorage.getItem('isPremium') === 'true';
    },
    
    setPremiumUser: function(isPremium) {
        localStorage.setItem('isPremium', isPremium.toString());
    },
    
    // ===== AI SYSTEM PROMPTS =====
    SYSTEM_PROMPTS: {
        FREE_USER: `You are a helpful Roblox game development assistant for ScriptForge. 
        
You can help users with:
- Generating game ideas and concepts
- Explaining Roblox game mechanics
- Suggesting features for their games
- Answering questions about the available scripts

Available scripts to discuss:
${JSON.stringify(CONFIG.SCRIPTS.map(s => ({ title: s.title, description: s.description, price: s.price })), null, 2)}

IMPORTANT RULES:
- You CANNOT provide actual script code or show full scripts
- You can only describe what the scripts do
- If they want a custom script, tell them they need Premium ($60) to request custom scripts
- Be helpful, friendly, and encouraging
- Keep responses concise and actionable`,

        PREMIUM_USER: `You are a helpful Roblox game development assistant for ScriptForge Premium users.

You can help premium users with:
- Generating game ideas and concepts  
- Explaining Roblox game mechanics
- Suggesting features for their games
- Discussing available scripts in detail
- Taking custom script requests (notify via Discord)

Available scripts:
${JSON.stringify(CONFIG.SCRIPTS.map(s => ({ title: s.title, description: s.description })), null, 2)}

PREMIUM FEATURES:
- Users can request custom scripts - when they do, acknowledge it and tell them you've notified the developer
- Provide more detailed technical explanations
- Help with script customization ideas

Be helpful, professional, and make them feel valued as a premium member.`
    }
};

// ===== SETUP INSTRUCTIONS =====
console.log(`
╔════════════════════════════════════════════════════════════╗
║           SCRIPTFORGE CONFIGURATION SETUP                  ║
╚════════════════════════════════════════════════════════════╝

To get your website working, you need to:

1. CLAUDE API KEY (Required for AI chatbot)
   - Go to: https://console.anthropic.com/
   - Sign up and get API key
   - Add $20-50 in credits
   - Paste key in CONFIG.CLAUDE_API_KEY above

2. DISCORD WEBHOOK (Required for premium requests)
   - Open your Discord server
   - Go to Server Settings > Integrations > Webhooks
   - Click "New Webhook"
   - Copy webhook URL
   - Paste in CONFIG.DISCORD_WEBHOOK_URL above

3. PAYMENT SETUP (Required for sales)
   - Stripe: https://stripe.com/ (for credit cards)
   - PayPal: https://developer.paypal.com/ (for PayPal)
   - Get publishable keys and paste above

4. EDIT YOUR SCRIPTS
   - Update the SCRIPTS array with your actual 4 scripts
   - Add real download URLs (use Gumroad or Google Drive)
   - Set prices for each script

5. TEST LOCALLY
   - Open index.html in your browser
   - Test the chat (needs API key)
   - Check all buttons work

6. DEPLOY TO GITHUB PAGES
   - Push all files to GitHub repository
   - Enable GitHub Pages in repository settings

Need help? Check the README.md file for detailed instructions!
`);
