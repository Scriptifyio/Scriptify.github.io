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
            price: 20,
            features: [
                'Pets',
                'Saved currency',
                'Gui',
                'Models',
                'Customizable UI'
            ],
            downloadUrl: 'https://drive.google.com/file/d/1G9Xhpu325t11XTMgVkHEEFS2mDGI0b48/view?usp=sharing',
            isPremium: false
        },
        {
            id: 2,
            title: 'SimpleK9System',
            category: 'systems',
            description: 'Professional K9system and save/load functionality.',
            price: 15,
            features: [
                'Commands',
                'Easy to use',
                'Reliable K9 Model',
                'Data persistence (saves)',
                'Simple Version'
            ],
            downloadUrl: 'https://drive.google.com/file/d/1KbunLxbOI6MsWHeY-eQz4FQ8Gk9sTNjB/view?usp=sharing', 
            isPremium: false
        },
        {
            id: 3,
            title: 'OverheadSystemAdvance',
            category: 'ui',
            description: 'Advance Overhead UI with AFK assistance, ranks, names, teams, country flag, and much more. You can adjust everything to your liking as well and is super easy to set up.',
            price: 17,
            features: [
                'AFK assistance',
                'Country flag support',
                'Different frames to fit your overheadUI',
                'Easy to set up',
                'Emblem assistance to fit your teams emblem'
            ],
            downloadUrl: 'https://drive.google.com/file/d/1v8XCtLm4XUZnJDYV1QZiHLN4E9xILxK_/view?usp=sharing', 
            isPremium: false
        },
        {
            id: 4,
            title: 'AITutorialLoadingScreen',
            category: 'ui',
            description: 'Loading screen with an AI explaining your game',
            price: 8,
            features: [
                'AI Loading Screen Instructed',
                'Customizable Background and AI bot image',
                'Easy to use',
                'Mobile Friendly',
                'Explain your game when players first join'
            ],
            downloadUrl: 'https://drive.google.com/file/d/1sCNsxXwr3AccDXi9x_p5PIHJ409QYzxV/view?usp=sharing', 
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
