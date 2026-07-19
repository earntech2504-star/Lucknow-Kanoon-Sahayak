// ============================================================
// FAMILY.JS - Family Law
// ============================================================

// Ask family AI
async function askFamilyAI() {
    const input = document.getElementById('family-input');
    const container = document.getElementById('family-ans');
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
        const response = generateFamilyResponse(query);
        container.innerHTML = response;
    }, 1000);
}

// Generate family law response
function generateFamilyResponse(query) {
    const lower = query.toLowerCase();
    let response = '';
    
    if (lower.includes('divorce') || lower.includes('तलाक')) {
        response = `
            <div class="glass-card p-3 rounded-xl">
                <h4 class="font-bold text-base text-orange-400">👨‍👩‍👧 Divorce</h4>
                <div class="text-sm text-slate-300 mt-2">
                    <p>📌 <b>Grounds for Divorce:</b> Cruelty, Adultery, Desertion, Conversion, etc.</p>
                    <p>📌 <b>Procedure:</b> File petition in Family Court u/s 13 of Hindu Marriage Act.</p>
                    <p>📌 <b>Time:</b> Usually 6-12 months.</p>
                    <p>📌 <b>Case Law:</b> Naveen Kohli v. Neelu Kohli (2006) - Irretrievable breakdown.</p>
                    <div class="text-xs text-slate-500 mt-3">⚠️ This is for educational purposes only.</div>
                </div>
            </div>
        `;
    } else if (lower.includes('maintenance') || lower.includes('गुजारा')) {
        response = `
            <div class="glass-card p-3 rounded-xl">
                <h4 class="font-bold text-base text-orange-400">🏠 Maintenance</h4>
                <div class="text-sm text-slate-300 mt-2">
                    <p>📌 <b>Under Section:</b> BNSS 144 / CrPC 125.</p>
                    <p>📌 <b>Who can claim:</b> Wife, Children, Parents.</p>
                    <p>📌 <b>Procedure:</b> File application in Family Court.</p>
                    <p>📌 <b>Amount:</b> Based on husband's income and needs.</p>
                    <p>📌 <b>Case Law:</b> Rajnesh v. Neha (2021) - Maintenance guidelines.</p>
                    <div class="text-xs text-slate-500 mt-3">⚠️ This is for educational purposes only.</div>
                </div>
            </div>
        `;
    } else if (lower.includes('custody') || lower.includes('child') || lower.includes('बच्चा')) {
        response = `
            <div class="glass-card p-3 rounded-xl">
                <h4 class="font-bold text-base text-orange-400">👶 Child Custody</h4>
                <div class="text-sm text-slate-300 mt-2">
                    <p>📌 <b>Under Law:</b> Guardians and Wards Act, 1890.</p>
                    <p>📌 <b>Who decides:</b> Family Court.</p>
                    <p>📌 <b>Factors:</b> Child's welfare, Age, Parent's capability.</p>
                    <p>📌 <b>Types:</b> Physical custody, Legal custody, Joint custody.</p>
                    <p>📌 <b>Case Law:</b> Gaurav Nagpal v. Sumedha Nagpal (2009).</p>
                    <div class="text-xs text-slate-500 mt-3">⚠️ This is for educational purposes only.</div>
                </div>
            </div>
        `;
    } else {
        response = `
            <div class="glass-card p-3 rounded-xl">
                <h4 class="font-bold text-base text-orange-400">👨‍👩‍👧 Family Law</h4>
                <div class="text-sm text-slate-300 mt-2">
                    <p>📌 Please specify your family law issue:</p>
                    <ul class="list-disc pl-4 text-sm space-y-1">
                        <li>Divorce</li>
                        <li>Maintenance</li>
                        <li>Child Custody</li>
                        <li>Domestic Violence</li>
                        <li>Inheritance</li>
                    </ul>
                    <div class="text-xs text-slate-500 mt-3">⚠️ This is for educational purposes only.</div>
                </div>
            </div>
        `;
    }
    return response;
}
