// ============================================================
// JUNIOR.JS - Junior/Mock Court
// ============================================================

// Ask junior AI
async function askJuniorAI(input) {
    const container = document.getElementById('junior-ans');
    if (!container) return;
    
    if (!input || input.trim().length < 3) {
        container.innerHTML = '⚠️ कृपया कुछ लिखें।';
        container.classList.remove('hidden');
        return;
    }
    
    container.innerHTML = '<div class="loading-spinner"></div><span>Analyzing...</span>';
    container.classList.remove('hidden');
    
    // Simulate AI response
    setTimeout(() => {
        const response = generateJuniorResponse(input);
        container.innerHTML = response;
    }, 1000);
}

// Generate junior response
function generateJuniorResponse(input) {
    const lower = input.toLowerCase();
    let response = '';
    
    if (lower.includes('fir') || lower.includes('police') || lower.includes('crime')) {
        response = `
            <div class="glass-card p-3 rounded-xl">
                <h4 class="font-bold text-base text-orange-400">⚖️ Junior Response</h4>
                <div class="text-sm text-slate-300 mt-2">
                    <p>You raised an issue related to FIR/police/crime.</p>
                    <p class="mt-1">📌 <b>Legal Position:</b> FIR is mandatory under BNSS 173 for cognizable offences.</p>
                    <p>📌 <b>Action:</b> Approach the police station. If police refuses, approach Magistrate.</p>
                    <p>📌 <b>Case Law:</b> Lalita Kumari v. UOI (2014) - FIR mandatory.</p>
                    <div class="text-xs text-slate-500 mt-3 border-t border-slate-700 pt-2">⚠️ This is for educational purposes only.</div>
                </div>
            </div>
        `;
    } else if (lower.includes('bail') || lower.includes('arrest') || lower.includes('jail')) {
        response = `
            <div class="glass-card p-3 rounded-xl">
                <h4 class="font-bold text-base text-orange-400">⚖️ Junior Response</h4>
                <div class="text-sm text-slate-300 mt-2">
                    <p>You raised an issue related to bail/arrest.</p>
                    <p class="mt-1">📌 <b>Legal Position:</b> BNSS 480 (Regular) and BNSS 482 (Anticipatory).</p>
                    <p>📌 <b>Action:</b> Apply for anticipatory bail before arrest, or regular bail after arrest.</p>
                    <p>📌 <b>Case Law:</b> Satender Kumar Antil v. CBI (2022) - "Bail is rule".</p>
                    <div class="text-xs text-slate-500 mt-3 border-t border-slate-700 pt-2">⚠️ This is for educational purposes only.</div>
                </div>
            </div>
        `;
    } else if (lower.includes('property') || lower.includes('land') || lower.includes('house')) {
        response = `
            <div class="glass-card p-3 rounded-xl">
                <h4 class="font-bold text-base text-orange-400">⚖️ Junior Response</h4>
                <div class="text-sm text-slate-300 mt-2">
                    <p>You raised an issue related to property.</p>
                    <p class="mt-1">📌 <b>Legal Position:</b> Property disputes are handled by Civil Courts.</p>
                    <p>📌 <b>Action:</b> File title suit in Civil Court. Also approach Revenue Court for SDM stay.</p>
                    <p>📌 <b>Documents:</b> Sale deed, mutation certificate, encumbrance certificate.</p>
                    <div class="text-xs text-slate-500 mt-3 border-t border-slate-700 pt-2">⚠️ This is for educational purposes only.</div>
                </div>
            </div>
        `;
    } else if (lower.includes('women') || lower.includes('wife') || lower.includes('domestic')) {
        response = `
            <div class="glass-card p-3 rounded-xl">
                <h4 class="font-bold text-base text-orange-400">⚖️ Junior Response</h4>
                <div class="text-sm text-slate-300 mt-2">
                    <p>You raised an issue related to women/family.</p>
                    <p class="mt-1">📌 <b>Legal Position:</b> Women have special protections under law.</p>
                    <p>📌 <b>Action:</b> Call 181 (Women Helpline). File complaint under DV Act 2005 and BNS 85.</p>
                    <p>📌 <b>Laws:</b> BNS 85 (Cruelty), BNSS 144 (Maintenance), DV Act 2005.</p>
                    <div class="text-xs text-slate-500 mt-3 border-t border-slate-700 pt-2">⚠️ This is for educational purposes only.</div>
                </div>
            </div>
        `;
    } else {
        response = `
            <div class="glass-card p-3 rounded-xl">
                <h4 class="font-bold text-base text-orange-400">⚖️ Junior Response</h4>
                <div class="text-sm text-slate-300 mt-2">
                    <p>Thank you for your query.</p>
                    <p class="mt-1">📌 Please provide more details about your legal issue.</p>
                    <p>📌 Topics we can help with: FIR, Bail, Property, Family, Cyber, Women Rights, Maintenance, etc.</p>
                    <p>📌 For specific advice, please consult a qualified lawyer.</p>
                    <div class="text-xs text-slate-500 mt-3 border-t border-slate-700 pt-2">⚠️ This is for educational purposes only.</div>
                </div>
            </div>
        `;
    }
    
    return response;
}
