// ========================================
// SCRIPTIFY CONFIGURATION
// ========================================

const CONFIG = {
    // ===== PRICING =====
    PREMIUM_PRICE: 60,
    
    // ===== YOUR 4 SCRIPTS - EDIT THIS! =====
    SCRIPTS: [
        {
            id: 1,
            title: 'CurrencyPetObbySystem',
            category: 'gameplay',
            description: 'Complete Currency, Pet and Obby System.',
            price: 15,
            features: [
                'Pets',
                'Saved currency',
                'Gui',
                'Models',
                'Customizable UI'
            ],
            downloadUrl: '#', // https://drive.google.com/file/d/1G9Xhpu325t11XTMgVkHEEFS2mDGI0b48/view?usp=sharing
            isPremium: false
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
            downloadUrl: '#', // REPLACE WITH YOUR DOWNLOAD LINK!
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
            downloadUrl: '#', // REPLACE WITH YOUR DOWNLOAD LINK!
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
            downloadUrl: '#', // REPLACE WITH YOUR DOWNLOAD LINK!
            isPremium: false
        }
    ],
    
    // ===== USER AUTHENTICATION =====
    isPremiumUser: function() {
        return localStorage.getItem('isPremium') === 'true';
    },
    
    setPremiumUser: function(isPremium) {
        localStorage.setItem('isPremium', isPremium.toString());
    }
};

console.log('%c✅ Scriptify Config Loaded', 'color: #00ff88; font-weight: bold;');
console.log('📝 Remember to update your 4 scripts in config.js!');
