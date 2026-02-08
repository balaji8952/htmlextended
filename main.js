// ==========================================
// FINAL COMPONENTS.JS WITH THEME SWITCHER
// ==========================================

// 1. DYNAMIC SEARCH BAR
class SearchBar extends HTMLElement {
    connectedCallback() {
        const placeholder = this.getAttribute('placeholder') || 'Search...';
        this.innerHTML = `<input type="text" placeholder="${placeholder}" style="padding:8px; width:200px; border:1px solid #ccc; border-radius:4px;">`;
        
        this.querySelector('input').addEventListener('input', (e) => {
            const query = e.target.value.toLowerCase();
            const list = document.getElementById(this.getAttribute('target'));
            if (!list) return;
            
            [...list.children].forEach(item => {
                const text = item.textContent.toLowerCase();
                item.style.display = text.includes(query) ? '' : 'none';
            });
        });
    }
}
customElements.define('search-bar', SearchBar);

// 2. TOGGLE SHOW/HIDE
class ToggleBox extends HTMLElement {
    connectedCallback() {
        const title = this.getAttribute('title');
        // Define colors here based on a custom property (for theme switcher)
        this.innerHTML = `
            <button style="padding:8px 12px; cursor:pointer; background:var(--primary-color, #007bff); color:white; border:none; border-radius:4px;">${title}</button>
            <div class="content" style="display:none; padding:10px; border:1px solid #eee; margin-top:5px; border-radius:4px; transition: all 0.3s ease;">
                ${this.innerHTML}
            </div>
        `;
        
        this.querySelector('button').addEventListener('click', (e) => {
            const content = this.querySelector('.content');
            if (content.style.display === 'none') {
                content.style.display = 'block';
                setTimeout(() => content.style.opacity = '1', 10);
            } else {
                content.style.opacity = '0';
                setTimeout(() => content.style.display = 'none', 300);
            }
        });
        this.querySelector('.content').style.opacity = '0';
    }
}
customElements.define('toggle-box', ToggleBox);

// 3. SCROLL BUTTON
class ScrollBtn extends HTMLElement {
    connectedCallback() {
        const targetId = this.getAttribute('target');
        const speed = this.getAttribute('speed') || 'smooth';
        this.innerHTML = `<button style="padding:8px 12px; cursor:pointer; border-radius:4px; background:var(--secondary-color, #f0f0f0);">${this.textContent}</button>`;
        
        this.querySelector('button').addEventListener('click', () => {
            document.getElementById(targetId)?.scrollIntoView({ behavior: speed });
        });
    }
}
customElements.define('scroll-btn', ScrollBtn);

// 4. DATA FETCHER
class DataFetcher extends HTMLElement {
    async connectedCallback() {
        const url = this.getAttribute('url');
        const loadingMsg = this.getAttribute('loading') || 'Loading...';
        
        this.innerHTML = `<p style="font-style:italic;">${loadingMsg}</p>`;
        
        try {
            const response = await fetch(url);
            const data = await response.json();
            this.innerHTML = `<pre style="background:#f4f4f4; padding:15px; border-radius:4px; overflow-x:auto;">${JSON.stringify(data, null, 2)}</pre>`;
        } catch (error) {
            this.innerHTML = `<p style="color:red; font-weight:bold;">Error: Failed to fetch data.</p>`;
        }
    }
}
customElements.define('data-fetcher', DataFetcher);

// 5. VALIDATED FORM
class ValidatedForm extends HTMLElement {
    connectedCallback() {
        const form = this.querySelector('form');
        
        form.addEventListener('submit', (e) => {
            if (!form.checkValidity()) {
                e.preventDefault();
                e.stopPropagation();
                
                form.querySelectorAll(':invalid').forEach(input => {
                    input.style.outline = '2px solid red';
                    input.style.backgroundColor = '#fff8f8';
                });
            } else {
                alert('Form is valid and ready!');
            }
        });
    }
}
customElements.define('validated-form', ValidatedForm);

// 6. THEME SWITCHER: <theme-switcher></theme-switcher>
class ThemeSwitcher extends HTMLElement {
    connectedCallback() {
        this.innerHTML = `<button style="padding:8px; cursor:pointer;">Toggle Theme</button>`;
        
        this.querySelector('button').addEventListener('click', () => {
            const body = document.body;
            if (body.style.backgroundColor === 'black') {
                body.style.backgroundColor = 'white';
                body.style.color = 'black';
                // Set CSS variables for other components
                document.documentElement.style.setProperty('--primary-color', '#007bff');
            } else {
                body.style.backgroundColor = 'black';
                body.style.color = 'white';
                document.documentElement.style.setProperty('--primary-color', '#555');
            }
        });
    }
}
customElements.define('theme-switcher', ThemeSwitcher);