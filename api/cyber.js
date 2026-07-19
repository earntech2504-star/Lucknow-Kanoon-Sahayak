// ============================================================
// CYBER.JS - Cyber Cell
// ============================================================

// Ask cyber AI
async function askCyberAI() {
    const input = document.getElementById('cyber-input');
    const container = document.getElementById('cyber-ans');
    if (!input || !container) return;
    
    const query = input.value.trim();
    if (!query) {
        container.innerHTML = '⚠️ कृपया details दें।';
        container.classList.remove('hidden');
        return;
    }
    
    container.innerHTML = '<div class="loading-spinner"></div><span>Analyzing...</span>';
    container.classList.remove('hidden');
    
    setTimeout(() => {
        const response = generateCyberResponse(query);
        container.innerHTML = response;
    }, 1000);
}

// Generate cyber response
function generateCyberResponse(query) {
    const lower = query.toLowerCase();
    let response = '';
    
    if (lower.includes('fraud') || lower.includes('scam') || lower.includes('cheating')) {
        response = `
            <div class="glass-card p-3 rounded-xl">
                <h4 class="font-bold text-base text-orange-400">💻 Cyber Fraud</h4>
                <div class="text-sm text-slate-300 mt-2">
                    <p>📌 <b>What to do immediately:</b></p>
                    <ul class="list-disc pl-4 text-sm space-y-1">
                        <li>Call 1930 (Cyber Crime Helpline)</li>
                        <li>Report to cybercrime.gov.in</li>
                        <li>Inform your bank to hold transaction</li>
                        <li>Save screenshots and URLs</li>
                    </ul>
                    <p class="mt-2">📌 <b>Legal Section:</b> IT Act 66D + BNS 318 (Cheating).</p>
                    <p>📌 <b>Punishment:</b> Up to 7 years imprisonment.</p>
                    <div class="text-xs text-slate-500 mt-3">⚠️ This is for educational purposes only.</div>
                </div>
            </div>
        `;
    } else if (lower.includes('hacking') || lower.includes('account') || lower.includes('password')) {
        response = `
            <div class="glass-card p-3 rounded-xl">
                <h4 class="font-bold text-base text-orange-400">💻 Hacking / Account Security</h4>
                <div class="text-sm text-slate-300 mt-2">
                    <p>📌 <b>What to do:</b></p>
                    <ul class="list-disc pl-4 text-sm space-y-1">
                        <li>Change all passwords immediately</li>
                        <li>Enable two-factor authentication</li>
                        <li>Report to cyber cell - 1930</li>
                        <li>Check for unauthorized transactions</li>
                    </ul>
                    <p class="mt-2">📌 <b>Legal Section:</b> IT Act 66 - Computer hacking.</p>
                    <p>📌 <b>Punishment:</b> Up to 3 years + fine.</p>
                    <div class="text-xs text-slate-500 mt-3">⚠️ This is for educational purposes only.</div>
                </div>
            </div>
        `;
    } else {
        response = `
            <div class="glass-card p-3 rounded-xl">
                <h4 class="font-bold text-base text-orange-400">💻 Cyber Crime</h4>
                <div class="text-sm text-slate-300 mt-2">
                    <p>📌 Common cyber crimes:</p>
                    <ul class="list-disc pl-4 text-sm space-y-1">
                        <li>Online Fraud / Scam</li>
                        <li>Hacking / Account theft</li>
                        <li>Phishing / Fake websites</li>
                        <li>Cyber stalking</li>
                        <li>Identity theft</li>
                    </ul>
                    <p class="mt-2">📌 <b>Helpline:</b> 1930 (24x7)</p>
                    <p>📌 <b>Website:</b> cybercrime.gov.in</p>
                    <div class="text-xs text-slate-500 mt-3">⚠️ This is for educational purposes only.</div>
                </div>
            </div>
        `;
    }
    return response;
}
