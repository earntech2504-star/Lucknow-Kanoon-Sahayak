// ============================================================
// BAIL-GUIDE.JS - Bail Guide
// ============================================================

// Bail types and details
const bailGuide = {
    regular: {
        name: 'Regular Bail (BNSS 480)',
        description: 'Bail granted after arrest. Applies when a person is already in custody.',
        procedure: [
            'File bail application in the court',
            'Court hearing (both sides arguments)',
            'Court grants or rejects bail',
            'If granted, furnish surety and execute bond',
            'Release from jail'
        ],
        sections: ['BNSS 480', 'CrPC 437'],
        conditions: [
            'Not a serious offence (murder, rape, terrorism)',
            'No flight risk',
            'No tampering with evidence',
            'Good character/conduct'
        ],
        time: 'Usually 1-3 days'
    },
    anticipatory: {
        name: 'Anticipatory Bail (BNSS 482)',
        description: 'Bail before arrest. Applied when there is a fear of arrest.',
        procedure: [
            'File anticipatory bail application',
            'Court hearing (both sides arguments)',
            'Court grants or rejects anticipatory bail',
            'If granted, follow court conditions',
            'Surrender before court when summoned'
        ],
        sections: ['BNSS 482', 'CrPC 438'],
        conditions: [
            'Apprehension of arrest',
            'Bona fide case',
            'Not a heinous crime',
            'No previous criminal record'
        ],
        time: 'Usually 1-5 days'
    },
    default: {
        name: 'Default Bail (BNSS 173)',
        description: 'Bail when charge sheet not filed within time limit.',
        procedure: [
            'Check statutory time limit (90/60 days)',
            'Apply for default bail if charge sheet not filed',
            'Court grants default bail'
        ],
        sections: ['BNSS 173', 'CrPC 167'],
        conditions: [
            'Charge sheet not filed within time limit',
            'Application before cognizance',
            'No further extension by court'
        ],
        time: 'Immediate'
    }
};

// Get bail guide by type
function getBailGuide(type) {
    return bailGuide[type] || bailGuide.regular;
}

// Render bail guide
function renderBailGuide(type) {
    const container = document.getElementById('bail-guide-container');
    if (!container) return;
    const guide = getBailGuide(type);
    container.innerHTML = `
        <div class="glass-card p-3 rounded-xl">
            <h4 class="font-bold text-base text-orange-400">⛓️ ${guide.name}</h4>
            <div class="text-sm text-slate-300 mt-1">${guide.description}</div>
            <div class="mt-2">
                <div class="text-blue-400 font-semibold">📋 Procedure:</div>
                <ul class="list-disc pl-4 text-sm space-y-1">${guide.procedure.map(p => `<li>${p}</li>`).join('')}</ul>
            </div>
            <div class="mt-2">
                <div class="text-blue-400 font-semibold">⚖️ Applicable Sections:</div>
                <div class="text-sm">${guide.sections.join(', ')}</div>
            </div>
            <div class="mt-2">
                <div class="text-amber-400 font-semibold">✅ Conditions:</div>
                <ul class="list-disc pl-4 text-sm space-y-1">${guide.conditions.map(c => `<li>${c}</li>`).join('')}</ul>
            </div>
            <div class="mt-2 text-xs text-slate-400">⏳ Time: ${guide.time}</div>
        </div>
    `;
}

// Check bail eligibility
function checkBailEligibility(offence, criminalRecord) {
    const seriousOffences = ['murder', 'rape', 'terrorism', 'sedition', 'dowry death'];
    const isSerious = seriousOffences.some(o => offence.toLowerCase().includes(o));
    const hasRecord = criminalRecord && criminalRecord > 0;
    
    if (isSerious) {
        return { eligible: false, reason: 'Serious offence - Regular bail unlikely, may need special court' };
    } else if (hasRecord) {
        return { eligible: false, reason: 'Previous criminal record - Bail may be difficult' };
    } else {
        return { eligible: true, reason: 'Eligible for bail - Apply under BNSS 480/482' };
    }
}
