// ============================================================
// DICTIONARY.JS - Legal Dictionary
// ============================================================

// Legal Dictionary Data
const legalDictionary = [
    { term: 'BNS', def: 'Bharatiya Nyaya Sanhita - New Criminal Code', tag: 'legislation' },
    { term: 'BNSS', def: 'Bharatiya Nagarik Suraksha Sanhita - New Criminal Procedure', tag: 'legislation' },
    { term: 'BSA', def: 'Bharatiya Sakshya Adhiniyam - New Evidence Act', tag: 'legislation' },
    { term: 'FIR', def: 'First Information Report - BNSS 173', tag: 'procedure' },
    { term: 'Bail', def: 'Release from custody - BNSS 480 & 482', tag: 'procedure' },
    { term: 'Anticipatory Bail', def: 'Bail before arrest - BNSS 482', tag: 'procedure' },
    { term: 'Cheating', def: 'Fraudulent deception - BNS 318', tag: 'criminal' },
    { term: 'Murder', def: 'Unlawful killing - BNS 103', tag: 'criminal' },
    { term: 'Rape', def: 'Sexual assault - BNS 64', tag: 'criminal' },
    { term: 'Theft', def: 'Dishonest taking - BNS 303', tag: 'property' },
    { term: 'Cruelty', def: 'Harassment by husband - BNS 85', tag: 'family' },
    { term: 'Maintenance', def: 'Financial support - BNSS 144', tag: 'family' },
    { term: 'Evidence', def: 'Proof in court - BSA 63', tag: 'procedure' },
    { term: 'Defamation', def: 'Harm to reputation - BNS 356', tag: 'criminal' },
    { term: 'Domestic Violence', def: 'Abuse within family - DV Act 2005', tag: 'family' },
    { term: 'Cyber Crime', def: 'Online fraud - IT Act 2000', tag: 'cyber' },
    { term: 'RTI', def: 'Right to Information - RTI Act 2005', tag: 'constitution' },
    { term: 'Article 14', def: 'Right to Equality - Constitution of India', tag: 'constitution' },
    { term: 'Article 19', def: 'Right to Freedom - Constitution of India', tag: 'constitution' },
    { term: 'Article 21', def: 'Right to Life - Constitution of India', tag: 'constitution' },
    { term: 'Dowry', def: 'Money/property demanded in marriage - Dowry Act', tag: 'family' },
    { term: 'POCSO', def: 'Protection of Children from Sexual Offences Act', tag: 'criminal' },
    { term: 'POSH', def: 'Prevention of Sexual Harassment at Workplace Act', tag: 'women' },
    { term: 'Stamp Duty', def: 'Tax on property registration', tag: 'property' },
    { term: 'GST', def: 'Goods and Services Tax', tag: 'legislation' }
];

// Search dictionary
function searchDictionary() {
    const query = document.getElementById('dict-search');
    const grid = document.getElementById('dict-grid');
    if (!query || !grid) return;
    
    const q = query.value.trim().toLowerCase();
    const results = q ? legalDictionary.filter(d => 
        d.term.toLowerCase().includes(q) || 
        d.def.toLowerCase().includes(q)
    ) : legalDictionary;
    
    grid.innerHTML = '';
    results.forEach(d => {
        const tagColors = {
            criminal: 'dict-tag-criminal',
            family: 'dict-tag-family',
            legislation: 'dict-tag-legislation',
            procedure: 'dict-tag-procedure',
            constitution: 'dict-tag-constitution',
            property: 'dict-tag-property',
            cyber: 'dict-tag-cyber',
            women: 'dict-tag-family'
        };
        const card = document.createElement('div');
        card.className = 'dict-card p-3 rounded-xl';
        card.style.background = 'rgba(255,255,255,0.04)';
        card.style.border = '1px solid rgba(255,255,255,0.06)';
        card.style.borderRadius = '12px';
        card.style.padding = '14px';
        card.style.transition = 'all .3s';
        card.innerHTML = `
            <div class="dict-term" style="font-weight:700;font-size:1.05rem;color:#f1f5f9;">${d.term}</div>
            <div class="dict-def" style="font-size:.9rem;color:#94a3b8;margin-top:4px;">${d.def}</div>
            <div style="margin-top:4px;">
                <span class="dict-tag ${tagColors[d.tag] || 'dict-tag-legislation'}" 
                      style="padding:2px 10px;border-radius:12px;font-size:.7rem;font-weight:600;
                             background:${d.tag === 'criminal' ? 'rgba(239,68,68,0.2)' : 
                                      d.tag === 'family' ? 'rgba(244,114,182,0.2)' : 
                                      d.tag === 'legislation' ? 'rgba(96,165,250,0.2)' : 
                                      d.tag === 'procedure' ? 'rgba(59,130,246,0.2)' : 
                                      d.tag === 'constitution' ? 'rgba(251,191,36,0.2)' : 
                                      d.tag === 'property' ? 'rgba(34,197,94,0.2)' : 
                                      d.tag === 'cyber' ? 'rgba(34,211,238,0.2)' : 'rgba(96,165,250,0.2)'};
                             color:${d.tag === 'criminal' ? '#fca5a5' : 
                                   d.tag === 'family' ? '#f472b6' : 
                                   d.tag === 'legislation' ? '#93c5fd' : 
                                   d.tag === 'procedure' ? '#93c5fd' : 
                                   d.tag === 'constitution' ? '#fcd34d' : 
                                   d.tag === 'property' ? '#86efac' : 
                                   d.tag === 'cyber' ? '#67e8f9' : '#93c5fd'}">
                    ${d.tag.toUpperCase()}
                </span>
            </div>
        `;
        grid.appendChild(card);
    });
}

// Show all dictionary entries
function showAllDictionary() {
    const query = document.getElementById('dict-search');
    if (query) query.value = '';
    searchDictionary();
}
