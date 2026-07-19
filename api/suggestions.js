// ============================================================
// SUGGESTIONS.JS - Suggestions
// ============================================================

// Load suggestions
function loadSuggestions() {
    const list = document.getElementById('suggestions-list');
    if (!list) return;
    const saved = JSON.parse(localStorage.getItem('suggestions') || '[]');
    list.innerHTML = '';
    saved.slice(-5).reverse().forEach(s => {
        const div = document.createElement('div');
        div.className = 'text-xs text-slate-300 p-1 border-b border-slate-700';
        div.textContent = '💡 ' + s;
        list.appendChild(div);
    });
}

// Submit suggestion
function submitSuggestion() {
    const input = document.getElementById('suggestion-input');
    if (!input) return;
    const value = input.value.trim();
    if (!value) {
        alert('कुछ लिखें।');
        return;
    }
    const suggestions = JSON.parse(localStorage.getItem('suggestions') || '[]');
    suggestions.push(value);
    localStorage.setItem('suggestions', JSON.stringify(suggestions));
    input.value = '';
    loadSuggestions();
    alert('✅ Suggestion submitted!');
}

// Get all suggestions
function getAllSuggestions() {
    return JSON.parse(localStorage.getItem('suggestions') || '[]');
}
