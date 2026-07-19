// ============================================================
// SAFETY.JS - Women Safety & Know Your Rights
// ============================================================

// Rights data
const rightsData = [
    { 
        title: '👮 Police Arrest', 
        rights: [
            'Reason batana mandatory',
            'Lawyer se milne ka haq',
            '24 hrs mein Magistrate ke samne',
            'Medical checkup ka haq'
        ], 
        steps: 'Chup rahein → Lawyer maangein → Family inform karein', 
        helpline: '15100' 
    },
    { 
        title: '🏠 Domestic Violence', 
        rights: [
            '181 par call karein',
            'Protection Order maang sakte hain',
            'Residence Order (ghar se na nikalein)',
            'Maintenance claim'
        ], 
        steps: 'Evidence save karein → DV Act application file karein', 
        helpline: '181' 
    },
    { 
        title: '💻 Cyber Crime', 
        rights: [
            '1930 par turant report',
            'Bank se transaction hold',
            'Screenshots/URLs save karein',
            'IT Act 66D + BNS 318'
        ], 
        steps: '1930 call → cybercrime.gov.in → Bank complaint', 
        helpline: '1930' 
    },
    { 
        title: '🏠 Property Dispute', 
        rights: [
            'Revenue Court mein SDM stay',
            'Civil Court title suit',
            'Mutation check karein',
            'Encumbrance certificate'
        ], 
        steps: 'Documents collect → SDM stay → Civil suit file', 
        helpline: '15100' 
    },
    { 
        title: '⚖️ Workplace Harassment', 
        rights: [
            'POSH Act complaint file karein',
            'Internal committee se contact karein',
            'Employer action mandatory',
            'Confidentiality maintained'
        ], 
        steps: 'Complaint → Internal Committee → Inquiry → Action', 
        helpline: '181' 
    }
];

// Load rights
function loadRights() {
    const container = document.getElementById('rights-container');
    if (!container) return;
    container.innerHTML = '';
    rightsData.forEach((r) => {
        container.innerHTML += `
            <div class="rights-card" onclick="this.classList.toggle('expanded')">
                <div class="font-bold text-lg">${r.title}</div>
                <div class="rights-details">
                    <ul class="list-disc pl-4 text-sm space-y-1">${r.rights.map(x => `<li>${x}</li>`).join('')}</ul>
                    <div class="mt-2 text-xs opacity-80">📌 Steps: ${r.steps}</div>
                    <div class="mt-1 text-green-400 font-bold">Helpline: ${r.helpline}</div>
                </div>
            </div>
        `;
    });
}

// Legal First Aid
function loadFirstAid() {
    const container = document.getElementById('firstaid-container');
    if (!container) return;
    container.innerHTML = `
        <div class="glass-card p-3 rounded-xl"><h4 class="font-bold text-green-400">✅ 0-24 Hours</h4>
            <ul class="text-sm list-disc pl-4 mt-1">
                <li>FIR copy lein</li>
                <li>Witness names note karein</li>
                <li>Medical report lein (agar injury ho)</li>
                <li>Advocate consult karein</li>
            </ul>
        </div>
        <div class="glass-card p-3 rounded-xl"><h4 class="font-bold text-blue-400">⏳ 24-72 Hours</h4>
            <ul class="text-sm list-disc pl-4 mt-1">
                <li>Bail application (BNSS 480/482)</li>
                <li>Statement record karayein</li>
                <li>Evidence submit karein</li>
                <li>Court date fix karein</li>
            </ul>
        </div>
        <div class="glass-card p-3 rounded-xl"><h4 class="font-bold text-purple-400">🏛️ Court Stage</h4>
            <ul class="text-sm list-disc pl-4 mt-1">
                <li>Charge sheet check karein</li>
                <li>Anticipatory bail (agar needed)</li>
                <li>Witness examination</li>
                <li>Final arguments</li>
            </ul>
        </div>
        <div class="glass-card p-3 rounded-xl"><h4 class="font-bold text-amber-400">📂 Evidence Preservation</h4>
            <ul class="text-sm list-disc pl-4 mt-1">
                <li>Photos/Videos timestamp ke saath</li>
                <li>WhatsApp/Email export karein</li>
                <li>Notarized affidavit file karein</li>
                <li>Cloud backup lein</li>
           
