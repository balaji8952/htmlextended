// HTML Extended - Firebase Library
// v1.6 - User-Customizable Firebase Config

// --- UNIVERSAL CSS UTILITY ---
function applyUniversalStyles(component) {
    const wrapper = component.querySelector('.hx-wrapper');
    if (!wrapper) return;

    if (component.hasAttribute('align')) {
        const alignment = component.getAttribute('align');
        wrapper.style.display = 'flex';
        wrapper.style.justifyContent = alignment === 'center' ? 'center' : 
                                       alignment === 'right' ? 'flex-end' : 'flex-start';
        wrapper.style.alignItems = 'center';
        wrapper.style.width = '100%';
    }
    
    if (component.hasAttribute('color')) {
        wrapper.style.color = component.getAttribute('color');
    }
}

// 1. Firebase App Config Component (NEW)
// This tag holds the config and initializes Firebase
class FirebaseApp extends HTMLElement {
    connectedCallback() {
        this.style.display = 'none'; // Keep config hidden
        const config = {
            apiKey: this.getAttribute('api-key'),
            authDomain: this.getAttribute('auth-domain'),
            projectId: this.getAttribute('project-id'),
            storageBucket: this.getAttribute('storage-bucket'),
            messagingSenderId: this.getAttribute('sender-id'),
            appId: this.getAttribute('app-id')
        };
        
        // Store config globally for other tags to use
        window.hxFirebaseConfig = config;
        console.log("Firebase Extended Initialized");
    }
}
customElements.define('firebase-app', FirebaseApp);

// 2. Updated Auth Component
class FireAuth extends HTMLElement {
    connectedCallback() {
        this.innerHTML = `
            <div class="hx-wrapper">
                <style>
                    .hx-auth-container { text-align: center; padding: 20px; border: 1px solid #ddd; border-radius: 8px; }
                    .hx-auth-btn { padding: 10px 20px; cursor: pointer; background: #DB4437; color: white; border: none; border-radius: 5px; font-weight: bold; }
                </style>
                <div class="hx-auth-container">
                    <button class="hx-auth-btn">Sign in with Google</button>
                    <p class="auth-status">Not signed in</p>
                </div>
            </div>
        `;
        applyUniversalStyles(this);
    }
}
customElements.define('fire-auth', FireAuth);

// 3. Updated Database Component
class FireDatabase extends HTMLElement {
    connectedCallback() {
        const path = this.getAttribute('path') || 'root';
        this.innerHTML = `
            <div class="hx-wrapper">
                <style>
                    .hx-db-container { padding: 15px; border: 1px solid #eee; border-radius: 5px; background: #f9f9f9; width: 100%;}
                </style>
                <div class="hx-db-container">
                    <strong>DB Path:</strong> <code>${path}</code>
                    <p>Loading...</p>
                </div>
            </div>
        `;
        applyUniversalStyles(this);
    }
}
customElements.define('fire-db', FireDatabase);

// 4. Hero Section Component
class HeroSection extends HTMLElement {
    connectedCallback() {
        const bg = this.getAttribute('bg') || '';
        const title = this.getAttribute('title') || '';
        const subtitle = this.getAttribute('subtitle') || '';

        this.innerHTML = `
            <style>
                .hx-hero {
                    background-image: url('${bg}'); background-size: cover; background-position: center;
                    padding: 100px 20px; text-align: center; border-radius: 10px;
                    margin-bottom: 20px; font-family: sans-serif;
                }
            </style>
            <div class="hx-wrapper hx-hero">
                <div style="color: white;">
                    <h1 style="margin:0 0 10px 0;">${title}</h1>
                    <p style="margin:0;">${subtitle}</p>
                </div>
            </div>
        `;
        applyUniversalStyles(this);
    }
}
customElements.define('hero-section', HeroSection);
