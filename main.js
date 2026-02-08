// HTML Extended - Main Library
// v1.1 - Added Hero and Theme Features

// 1. Hero Section Component
class HeroSection extends HTMLElement {
    connectedCallback() {
        const bg = this.getAttribute('bg') || '';
        const title = this.getAttribute('title') || '';
        const subtitle = this.getAttribute('subtitle') || '';

        this.innerHTML = `
            <style>
                .hero-container {
                    background-image: url('${bg}');
                    background-size: cover;
                    background-position: center;
                    padding: 100px 20px;
                    text-align: center;
                    color: white;
                    border-radius: 10px;
                    margin-bottom: 20px;
                    font-family: sans-serif;
                }
                .hero-title {
                    font-size: 3em;
                    font-weight: bold;
                    margin: 0 0 10px 0;
                    text-shadow: 2px 2px 4px rgba(0,0,0,0.5);
                }
                .hero-subtitle {
                    font-size: 1.2em;
                    margin: 0;
                    text-shadow: 1px 1px 2px rgba(0,0,0,0.5);
                    font-weight: normal;
                }
            </style>
            <div class="hero-container">
                <h1 class="hero-title">${title}</h1>
                <p class="hero-subtitle">${subtitle}</p>
            </div>
        `;
    }
}
customElements.define('hero-section', HeroSection);

// 2. Search Bar Component
class SearchBar extends HTMLElement {
    connectedCallback() {
        const targetId = this.getAttribute('target');
        this.innerHTML = `
            <style>
                .hx-search { padding: 10px; width: 100%; box-sizing: border-box; margin-bottom: 15px; border: 1px solid #ccc; border-radius: 5px; }
            </style>
            <input type="text" class="hx-search" placeholder="Search list...">
        `;
        
        this.querySelector('input').addEventListener('input', (e) => {
            const term = e.target.value.toLowerCase();
            const targetList = document.getElementById(targetId);
            if (!targetList) return;
            
            targetList.querySelectorAll('li').forEach(item => {
                item.style.display = item.textContent.toLowerCase().includes(term) ? '' : 'none';
            });
        });
    }
}
customElements.define('search-bar', SearchBar);

// 3. Toggle Box Component
class ToggleBox extends HTMLElement {
    connectedCallback() {
        const btnText = this.getAttribute('button-text') || 'Toggle';
        const content = this.innerHTML;
        this.innerHTML = `
            <style>
                .hx-toggle-btn { padding: 10px 15px; cursor: pointer; background-color: #007bff; color: white; border: none; border-radius: 5px; }
                .hx-content { display: none; margin-top: 10px; padding: 15px; border: 1px solid #ccc; border-radius: 5px; background: #f9f9f9; }
            </style>
            <button class="hx-toggle-btn">${btnText}</button>
            <div class="hx-content">${content}</div>
        `;

        this.querySelector('.hx-toggle-btn').addEventListener('click', () => {
            const contentDiv = this.querySelector('.hx-content');
            contentDiv.style.display = contentDiv.style.display === 'block' ? 'none' : 'block';
        });
    }
}
customElements.define('toggle-box', ToggleBox);

// 4. Data Fetcher Component
class DataFetcher extends HTMLElement {
    connectedCallback() {
        const src = this.getAttribute('src');
        this.innerHTML = '<p>Loading data...</p>';
        
        fetch(src)
            .then(response => response.json())
            .then(data => {
                this.innerHTML = `<pre style="background: #eee; padding: 10px; border-radius: 5px;">${JSON.stringify(data, null, 2)}</pre>`;
            })
            .catch(err => {
                this.innerHTML = `<p style="color:red;">Error loading data</p>`;
            });
    }
}
customElements.define('data-fetcher', DataFetcher);

// 5. Theme Switcher Component
class ThemeSwitcher extends HTMLElement {
    connectedCallback() {
        this.innerHTML = `
            <style>
                .hx-theme-btn { padding: 10px 15px; cursor: pointer; background-color: #333; color: white; border: none; border-radius: 5px; }
                body.dark-mode { background-color: #222; color: white; }
                body.dark-mode .hx-content { background: #444; color: white; }
            </style>
            <button class="hx-theme-btn">Toggle Dark Mode</button>
        `;
        
        this.querySelector('button').addEventListener('click', () => {
            document.body.classList.toggle('dark-mode');
        });
    }
}
customElements.define('theme-switcher', ThemeSwitcher);
