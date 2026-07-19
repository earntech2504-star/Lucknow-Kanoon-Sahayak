// ============================================================
// ZAMEEN.JS - Property/Zameen
// ============================================================

// Ask zameen AI
async function askZameenAI() {
    const input = document.getElementById('zameen-input');
    const container = document.getElementById('zameen-ans');
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
        const response = generateZameenResponse(query);
        container.innerHTML = response;
    }, 1000);
}

// Generate property response
function generateZameenResponse(query) {
    const lower = query.toLowerCase();
    let response = '';
    
    if (lower.includes('dispute') || lower.includes('विवाद') || lower.includes('case')) {
        response = `
            <div class="glass-card p-3 rounded-xl">
                <h4 class="font-bold text-base text-orange-400">🏠 Property Dispute</h4>
                <div class="text-sm text-slate-300 mt-2">
                    <p>📌 <b>Steps to take:</b></p>
                    <ul class="list-disc pl-4 text-sm space-y-1">
                        <li>Collect all property documents</li>
                        <li>Get SDM stay from Revenue Court</li>
                        <li>File title suit in Civil Court</li>
                        <li>Get mutation certificate</li>
                        <li>Check encumbrance certificate</li>
                    </ul>
                    <p class="mt-2">📌 <b>Relevant Law:</b> Transfer of Property Act, Registration Act.</p>
                    <p>📌 <b>Time:</b> Usually 2-3 years for civil suit.</p>
                    <div class="text-xs text-slate-500 mt-3">⚠️ This is for educational purposes only.</div>
                </div>
            </div>
        `;
    } else if (lower.includes('buy') || lower.includes('sell') || lower.includes('खरीद') || lower.includes('बेच')) {
        response = `
            <div class="glass-card p-3 rounded-xl">
                <h4 class="font-bold text-base text-orange-400">🏠 Property Buy/Sell</h4>
                <div class="text-sm text-slate-300 mt-2">
                    <p>📌 <b>Documents required:</b></p>
                    <ul class="list-disc pl-4 text-sm space-y-1">
                        <li>Sale deed / Agreement to sell</li>
                        <li>Mutation certificate</li>
                        <li>Encumbrance certificate</li>
                        <li>Property tax receipt</li>
                        <li>Identity proofs</li>
                    </ul>
                    <p class="mt-2">📌 <b>Stamp Duty:</b> 7% of property value (varies by state).</p>
                    <p>📌 <b>Registration:</b> Mandatory under Registration Act.</p>
                    <div class="text-xs text-slate-500 mt-3">⚠️ This is for educational purposes only.</div>
                </div>
            </div>
        `;
    } else {
        response = `
            <div class="glass-card p-3 rounded-xl">
                <h4 class="font-bold text-base text-orange-400">🏠 Property / Zameen</h4>
                <div class="text-sm text-slate-300 mt-2">
                    <p>📌 Please specify your property issue:</p>
                    <ul class="list-disc pl-4 text-sm space-y-1">
                        <li>Property Dispute</li>
                        <li>Buying Property</li>
                        <li>Selling Property</li>
                        <li>Property Registration</li>
                        <li>Land Mutation</li>
                    </ul>
                    <div class="text-xs text-slate-500 mt-3">⚠️ This is for educational purposes only.</div>
                </div>
            </div>
        `;
    }
    return response;
}
