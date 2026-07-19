// ============================================================
// RTO-RTI.JS - RTO/RTI
// ============================================================

// Ask RTO/RTI AI
async function askRTOAI() {
    const input = document.getElementById('rto-rti-input');
    const container = document.getElementById('rto-rti-ans');
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
        const response = generateRTOResponse(query);
        container.innerHTML = response;
    }, 1000);
}

// Generate RTO response
function generateRTOResponse(query) {
    const lower = query.toLowerCase();
    let response = '';
    
    if (lower.includes('rto') || lower.includes('vehicle') || lower.includes('car') || lower.includes('bike')) {
        response = `
            <div class="glass-card p-3 rounded-xl">
                <h4 class="font-bold text-base text-orange-400">🚗 RTO Services</h4>
                <div class="text-sm text-slate-300 mt-2">
                    <p>📌 <b>Services:</b></p>
                    <ul class="list-disc pl-4 text-sm space-y-1">
                        <li>Vehicle Registration</li>
                        <li>Driving License</li>
                        <li>Transfer of Ownership</li>
                        <li>Fitness Certificate</li>
                        <li>Road Tax Payment</li>
                    </ul>
                    <p class="mt-2">📌 <b>Helpline:</b> 1073</p>
                    <p>📌 <b>Website:</b> <a href="https://parivahan.gov.in" target="_blank" class="text-blue-400">Visit →</a></p>
                    <div class="text-xs text-slate-500 mt-3">⚠️ This is for educational purposes only.</div>
                </div>
            </div>
        `;
    } else if (lower.includes('rti') || lower.includes('right to information') || lower.includes('information')) {
        response = `
            <div class="glass-card p-3 rounded-xl">
                <h4 class="font-bold text-base text-orange-400">📋 RTI Application</h4>
                <div class="text-sm text-slate-300 mt-2">
                    <p>📌 <b>What is RTI?</b> Right to Information Act, 2005.</p>
                    <p class="mt-2">📌 <b>How to apply:</b></p>
                    <ul class="list-disc pl-4 text-sm space-y-1">
                        <li>Write application to PIO</li>
                        <li>Pay ₹10 application fee</li>
                        <li>Mention specific information</li>
                        <li>Get reply in 30 days</li>
                    </ul>
                    <p class="mt-2">📌 <b>Appeal:</b> First Appeal - 30 days, Second Appeal - 45 days.</p>
                    <div class="text-xs text-slate-500 mt-3">⚠️ This is for educational purposes only.</div>
                </div>
            </div>
        `;
    } else {
        response = `
            <div class="glass-card p-3 rounded-xl">
                <h4 class="font-bold text-base text-orange-400">🚗 RTO / RTI</h4>
                <div class="text-sm text-slate-300 mt-2">
                    <p>📌 Please specify your query:</p>
                    <ul class="list-disc pl-4 text-sm space-y-1">
                        <li>RTO: Vehicle registration, Driving license, Transfer</li>
                        <li>RTI: Right to Information application</li>
                    </ul>
                    <div class="text-xs text-slate-500 mt-3">⚠️ This is for educational purposes only.</div>
                </div>
            </div>
        `;
    }
    return response;
}
