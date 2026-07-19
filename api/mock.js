// ============================================================
// MOCK.JS - Mock Trial
// ============================================================

// Mock trial scenarios
const mockScenarios = [
    {
        id: 1,
        title: 'Cheating Case - BNS 318',
        scenario: 'A person sold a property to another person but the property was already sold to someone else. The buyer lost ₹20 lakhs.',
        law: 'BNS 318 - Cheating',
        possibleDefense: 'No fraudulent intent, property was sold in good faith',
        possibleCharges: 'BNS 318 - 7 years imprisonment'
    },
    {
        id: 2,
        title: 'Theft Case - BNS 303',
        scenario: 'A person was caught stealing a mobile phone worth ₹50,000 from a shop.',
        law: 'BNS 303 - Theft',
        possibleDefense: 'Mistaken identity, was at home at that time',
        possibleCharges: 'BNS 303 - 3 years imprisonment'
    },
    {
        id: 3,
        title: 'Domestic Violence Case',
        scenario: 'A woman complained that her husband physically and mentally harassed her for dowry.',
        law: 'BNS 85 + DV Act 2005',
        possibleDefense: 'False allegations, no evidence of cruelty',
        possibleCharges: 'BNS 85 - 3 years imprisonment + Fine'
    }
];

// Ask mock trial
async function askMockTrial() {
    const input = document.getElementById('mock-input');
    const container = document.getElementById('mock-output');
    if (!input || !container) return;
    
    const scenario = input.value.trim();
    if (!scenario) {
        container.innerHTML = '⚠️ कृपया case scenario लिखें।';
        container.classList.remove('hidden');
        return;
    }
    
    container.innerHTML = '<div class="loading-spinner"></div><span>Generating arguments...</span>';
    container.classList.remove('hidden');
    
    // Generate mock trial arguments
    let html = `<div class="glass-card p-3 rounded-xl">
        <h4 class="font-bold text-base text-orange-400">⚖️ Mock Trial Analysis</h4>
        <div class="text-sm text-slate-300 mt-2">
            <div><b>📌 Case Scenario:</b> ${scenario}</div>
            <hr class="border-slate-700 my-2">
    `;
    
    // Analyze scenario
    const lower = scenario.toLowerCase();
    let matchedScenario = null;
    let suggestion = '';
    
    if (lower.includes('cheating') || lower.includes('fraud') || lower.includes('property') && lower.includes('sell')) {
        matchedScenario = mockScenarios[0];
        suggestion = 'This appears to be a cheating case. The buyer can file FIR under BNS 318. Evidence of property documents and payment transactions will be crucial.';
    } else if (lower.includes('steal') || lower.includes('thief') || lower.includes('mobile') || lower.includes('shop')) {
        matchedScenario = mockScenarios[1];
        suggestion = 'This appears to be a theft case. FIR under BNS 303 should be filed. CCTV footage and witness statements will be important evidence.';
    } else if (lower.includes('domestic') || lower.includes('violence') || lower.includes('husband') || lower.includes('dowry') || lower.includes('wife')) {
        matchedScenario = mockScenarios[2];
        suggestion = 'This appears to be a domestic violence case. Complainant should call 181 and file complaint under DV Act 2005 and BNS 85.';
    } else {
        suggestion = 'This case needs detailed legal analysis. Consult a lawyer for proper legal advice. The relevant sections will depend on the specific facts of the case.';
    }
    
    if (matchedScenario) {
        html += `
            <div class="text-blue-400 font-semibold">📜 Applicable Law:</div>
            <div class="text-sm">${matchedScenario.law}</div>
            <div class="text-red-400 font-semibold mt-2">⚖️ Possible Charges:</div>
            <div class="text-sm">${matchedScenario.possibleCharges}</div>
            <div class="text-green-400 font-semibold mt-2">🛡️ Possible Defense:</div>
            <div class="text-sm">${matchedScenario.possibleDefense}</div>
        `;
    }
    
    html += `
        <div class="text-amber-400 font-semibold mt-2">💡 Suggestion:</div>
        <div class="text-sm">${suggestion}</div>
        <div class="text-xs text-slate-500 mt-3 border-t border-slate-700 pt-2">⚠️ Disclaimer: This is for educational purposes only.</div>
    `;
    
    html += `</div></div>`;
    container.innerHTML = html;
}

// Get mock scenario by ID
function getMockScenario(id) {
    return mockScenarios.find(s => s.id === id);
}

// Generate mock arguments
function generateMockArguments(scenario) {
    // Simplified mock argument generation
    const templates = {
        prosecution: 'The prosecution argues that the accused has committed a cognizable offence. The evidence clearly shows the accused\'s involvement. The accused should be held accountable for their actions.',
        defense: 'The defense argues that the prosecution has not established the case beyond reasonable doubt. The accused is innocent and should be acquitted.',
        judgment: 'The court after hearing both sides and examining the evidence finds the accused guilty/not guilty. The judgment is based on the principles of natural justice.'
    };
    return templates;
}
