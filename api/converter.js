// ============================================================
// CONVERTER.JS - IPC→BNS Converter
// ============================================================

// IPC to BNS/BNSS/BSA Mapping
const conversionMap = {
    'ipc 420': 'BNS 318 (Cheating - 7 years)',
    'ipc 302': 'BNS 103 (Murder - Death/Life)',
    'ipc 379': 'BNS 303 (Theft - 3 years)',
    'ipc 498a': 'BNS 85 (Cruelty - 3 years)',
    'ipc 375': 'BNS 64 (Rape - 10 years)',
    'ipc 499': 'BNS 356 (Defamation - 2 years)',
    'ipc 405': 'BNS 352 (Breach of Trust - 7 years)',
    'crpc 154': 'BNSS 173 (FIR)',
    'crpc 437': 'BNSS 480 (Regular Bail)',
    'crpc 438': 'BNSS 482 (Anticipatory Bail)',
    'crpc 125': 'BNSS 144 (Maintenance)',
    'crpc 156': 'BNSS 175 (Magistrate Power)',
    'crpc 173': 'BNSS 193 (Charge Sheet)',
    'evidence 65b': 'BSA 63 (Electronic Evidence)'
};

// Convert section
function convertSectionAPI() {
    const input = document.getElementById('old-section');
    const output = document.getElementById('new-section');
    if (!input || !output) return;
    
    const query = input.value.trim().toLowerCase();
    if (!query) {
        output.innerHTML = '⚠️ कृपया Section डालें';
        return;
    }
    
    let result = '❌ कोई mapping नहीं मिली';
    for (const [key, value] of Object.entries(conversionMap)) {
        if (query.includes(key) || key.includes(query)) {
            result = '✅ ' + value;
            break;
        }
    }
    output.innerHTML = result;
}

// Check law applicability
function checkLawApplicability() {
    const date = document.getElementById('crime-date-calculator');
    const result = document.getElementById('law-calculator-result');
    if (!date || !result) return;
    
    const dateVal = date.value;
    if (!dateVal) {
        result.innerHTML = '⚠️ कृपया तारीख डालें।';
        result.classList.remove('hidden');
        return;
    }
    
    const d = new Date(dateVal);
    const cutoff = new Date('2024-07-01');
    if (d >= cutoff) {
        result.innerHTML = '✅ BNS/BNSS/BSA लागू होगा (1 July 2024 के बाद)';
        result.style.background = 'rgba(34,197,94,0.1)';
        result.style.color = '#86efac';
    } else {
        result.innerHTML = '📜 IPC/CrPC/Evidence Act लागू होगा (1 July 2024 से पहले)';
        result.style.background = 'rgba(251,191,36,0.1)';
        result.style.color = '#fcd34d';
    }
    result.classList.remove('hidden');
}

// Get conversion for specific section
function getConversion(section) {
    const key = section.toLowerCase();
    return conversionMap[key] || null;
}
